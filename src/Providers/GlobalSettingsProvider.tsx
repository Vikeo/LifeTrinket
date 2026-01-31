import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useWakeLock } from 'react-screen-wake-lock';
import {
  GameScore,
  GlobalSettingsContext,
  GlobalSettingsContextType,
  SavedGame,
} from '../Contexts/GlobalSettingsContext';
import { useAnalytics } from '../Hooks/useAnalytics';
import { useMetrics } from '../Hooks/useMetrics';
import {
  InitialGameSettings,
  Settings,
  defaultInitialGameSettings,
  defaultSettings,
  initialGameSettingsSchema,
  settingsSchema,
} from '../Types/Settings';
import { gte as semverGreaterThanOrEqual } from 'semver';
import type { SharedGameState } from '../Types/SharedState';

export const GlobalSettingsProvider = ({
  children,
  sharedState,
}: {
  children: ReactNode;
  sharedState?: SharedGameState | null;
}) => {
  const analytics = useAnalytics();
  const metrics = useMetrics();

  const localSavedGame = localStorage.getItem('savedGame');
  const [savedGame, setCurrentGame] = useState<SavedGame>(
    localSavedGame ? JSON.parse(localSavedGame) : null
  );
  const setCurrentGameAndLocalStorage = (savedGame: SavedGame) => {
    if (!savedGame) {
      setCurrentGame(savedGame);
      localStorage.removeItem('savedGame');
      return;
    }
    setCurrentGame(savedGame);
    localStorage.setItem('savedGame', JSON.stringify(savedGame));
  };

  const savedPlaying = localStorage.getItem('playing');
  const [playing, setPlaying] = useState<boolean>(() => {
    // If shared state exists, auto-start the game
    if (sharedState) {
      return true;
    }
    return savedPlaying ? savedPlaying === 'true' : false;
  });
  const setPlayingAndLocalStorage = (playing: boolean) => {
    setPlaying(playing);
    localStorage.setItem('playing', String(playing));
  };

  const savedPreStartComplete = localStorage.getItem('preStartComplete');
  const [preStartCompleted, setPreStartCompleted] = useState<boolean>(
    savedPreStartComplete ? savedPreStartComplete === 'true' : false
  );

  const savedShowPlay = localStorage.getItem('showPlay');
  const [showPlay, setShowPlay] = useState<boolean>(() => {
    // If shared state exists, show the play view
    if (sharedState) {
      return true;
    }
    return savedShowPlay ? savedShowPlay === 'true' : false;
  });
  const setShowPlayAndLocalStorage = (showPlay: boolean) => {
    setShowPlay(showPlay);
    localStorage.setItem('showPlay', String(showPlay));
  };

  const savedSettings = localStorage.getItem('settings');
  const [randomizingPlayer, setRandomizingPlayer] = useState<boolean>(() => {
    if (!savedSettings) return true;
    const parsed = JSON.parse(savedSettings);
    return Boolean(parsed.preStartMode === 'random-king');
  });
  const [settings, setSettings] = useState<Settings>(() => {
    if (!savedSettings) return defaultSettings;
    const parsed = settingsSchema.safeParse(JSON.parse(savedSettings));
    if (!parsed.success) {
      console.error('invalid settings, using default settings');
      return defaultSettings;
    }
    return parsed.data;
  });

  const setSettingsAndLocalStorage = (settings: Settings) => {
    setSettings(settings);
    localStorage.setItem('settings', JSON.stringify(settings));
  };

  const savedGameSettings = localStorage.getItem('initialGameSettings');

  const [initialGameSettings, setInitialGameSettings] =
    useState<InitialGameSettings>(() => {
      // Prioritize shared state
      if (sharedState?.initialGameSettings) {
        return sharedState.initialGameSettings;
      }
      if (!savedGameSettings) return defaultInitialGameSettings;
      const parsed = initialGameSettingsSchema.safeParse(
        JSON.parse(savedGameSettings)
      );
      if (!parsed.success) {
        console.error('invalid game settings, using default settings');
        return defaultInitialGameSettings;
      }
      return parsed.data;
    });

  const setInitialGameSettingsAndLocalStorage = (
    initialGameSettings: InitialGameSettings
  ) => {
    setInitialGameSettings(initialGameSettings);
    localStorage.setItem(
      'initialGameSettings',
      JSON.stringify(initialGameSettings)
    );
  };

  const savedGameScore = localStorage.getItem('gameScore');
  const [gameScore, setGameScore] = useState<GameScore>(() => {
    // Prioritize shared state
    if (sharedState?.gameScore) {
      return sharedState.gameScore;
    }
    return savedGameScore ? JSON.parse(savedGameScore) : {};
  });
  const setGameScoreAndLocalStorage = (score: GameScore) => {
    setGameScore(score);
    localStorage.setItem('gameScore', JSON.stringify(score));
  };
  const resetGameScore = () => {
    setGameScore({});
    localStorage.removeItem('gameScore');
  };

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // This is called when fullscreen is entered or exited, by any means
    const fullscreenChangeHandler = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', fullscreenChangeHandler);

    return () => {
      document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
    };
  }, []);

  const [isLatestVersion, setIsLatestVersion] = useState(false);
  const [remoteVersion, setRemoteVersion] = useState<string | undefined>(
    undefined
  );

  const { isSupported, release, released, request, type } = useWakeLock();

  const active = settings.keepAwake;

  if (active && released === undefined) {
    request();
  }

  // Track when a game is loaded from shared state
  useEffect(() => {
    if (sharedState) {
      analytics.trackEvent('game_loaded_from_share', {
        shared_version: sharedState.version,
        player_count: sharedState.players.length,
        has_game_score: !!sharedState.gameScore,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount - sharedState and analytics are stable

  const ctxValue = useMemo((): GlobalSettingsContextType => {
    const removeLocalStorage = async () => {
      localStorage.removeItem('initialGameSettings');
      localStorage.removeItem('players');
      localStorage.removeItem('playing');
      localStorage.removeItem('showPlay');
      localStorage.removeItem('preStartComplete');
      localStorage.removeItem('gameScore');

      setPlaying(false);
      setShowPlay(false);
      setPreStartCompleted(false);
      setSettings({ ...settings, useMonarch: false });
      setGameScore({});
    };

    const goToStart = async () => {
      const currentPlayers = localStorage.getItem('players');

      if (currentPlayers) {
        analytics.trackEvent('go_to_start', {
          playersBeforeReset: currentPlayers,
        });
        metrics.trackEvent('go_to_start', {
          playersBeforeReset: currentPlayers,
        });
      }

      await removeLocalStorage();
    };

    const toggleWakeLock = async () => {
      if (active) {
        setSettings({ ...settings, keepAwake: false });
        release();
        return;
      }

      setSettings({ ...settings, keepAwake: true });
      request();
    };

    const enableFullscreen = () => {
      if (document?.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().then(() => {
          setIsFullscreen(true);
        });
      }
    };

    const disableFullscreen = () => {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    };

    const setPreStartCompletedAndLocalStorage = (preStartComplete: boolean) => {
      setPreStartCompleted(preStartComplete);
      localStorage.setItem('playing', String(playing));
    };

    async function checkForNewVersion(source: 'settings' | 'start_menu') {
      try {
        const token = import.meta.env.VITE_REPO_READ_ACCESS_TOKEN;
        const headers: HeadersInit = {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        };

        // Only add authorization if token is available
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const result = await fetch(
          'https://api.github.com/repos/Vikeo/LifeTrinket/releases/latest',
          { headers }
        );
        const data = await result.json();

        if (!data.name) {
          setRemoteVersion(undefined);
          setIsLatestVersion(false);
          return;
        }

        setRemoteVersion(data.name);

        const isLatest = semverGreaterThanOrEqual(
          import.meta.env.VITE_APP_VERSION,
          data.name
        );

        if (isLatest) {
          setIsLatestVersion(true);
          return;
        }

        analytics.trackEvent(`${source}_has_new_version`, {
          remoteVersion: data.name,
          installedVersion: import.meta.env.VITE_APP_VERSION,
        });

        metrics.trackEvent(`${source}_has_new_version`, {
          remoteVersion: data.name,
          installedVersion: import.meta.env.VITE_APP_VERSION,
        });

        setIsLatestVersion(false);
      } catch (error) {
        console.error('error getting latest version string', error);
      }
    }

    return {
      fullscreen: { isFullscreen, enableFullscreen, disableFullscreen },
      wakeLock: {
        isSupported,
        release,
        active,
        request,
        type,
        toggleWakeLock,
      },
      goToStart,
      showPlay,
      setShowPlay: setShowPlayAndLocalStorage,
      playing,
      setPlaying: setPlayingAndLocalStorage,
      initialGameSettings,
      setInitialGameSettings: setInitialGameSettingsAndLocalStorage,
      settings,
      setSettings: setSettingsAndLocalStorage,
      randomizingPlayer,
      setRandomizingPlayer,
      isPWA: window?.matchMedia('(display-mode: standalone)').matches,
      preStartCompleted,
      setPreStartCompleted: setPreStartCompletedAndLocalStorage,
      savedGame,
      saveCurrentGame: setCurrentGameAndLocalStorage,
      version: {
        installedVersion: import.meta.env.VITE_APP_VERSION,
        remoteVersion,
        isLatest: isLatestVersion,
        checkForNewVersion,
      },
      gameScore,
      setGameScore: setGameScoreAndLocalStorage,
      resetGameScore,
    };
  }, [
    isFullscreen,
    isSupported,
    release,
    active,
    request,
    type,
    showPlay,
    playing,
    initialGameSettings,
    settings,
    randomizingPlayer,
    setRandomizingPlayer,
    preStartCompleted,
    savedGame,
    remoteVersion,
    isLatestVersion,
    analytics,
    metrics,
    gameScore,
  ]);

  return (
    <GlobalSettingsContext.Provider value={ctxValue}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};
