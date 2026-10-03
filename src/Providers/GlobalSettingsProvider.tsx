import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
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
  lifeHistorySchema,
  settingsSchema,
} from '../Types/Settings';
import { LifeHistoryEvent } from '../Types/Player';
import { gte as semverGreaterThanOrEqual } from 'semver';
import type { SharedGameState } from '../Types/SharedState';
import type { TrackLink } from '../Types/Tracking';
import { clearStoredTrackLink, storeTrackLink } from '../Utils/tracking/trackLink';
import { clearKeys, keysToClearOnGoToStart } from '../Utils/storageScope';

export const GlobalSettingsProvider = ({
  children,
  sharedState,
  trackLink,
}: {
  children: ReactNode;
  sharedState?: SharedGameState | null;
  trackLink?: TrackLink | null;
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
    // Shared state and a track link both auto-start the game
    if (sharedState || trackLink) {
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
    // Shared state and a track link both open the play view
    if (sharedState || trackLink) {
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

  // Nothing here resets the score for a new tracked game. `main.tsx` clears
  // every game-scoped key before React renders (see Utils/storageScope), so
  // the lazy state above already reads an empty score, an empty transcript
  // and a stopped timer -- one path for all of them, rather than one field
  // remembered here and the rest forgotten.

  const savedLifeHistory = localStorage.getItem('lifeHistory');
  const [lifeHistory, setLifeHistory] = useState<LifeHistoryEvent[]>(() => {
    // Prioritize shared state
    if (sharedState?.lifeHistory) {
      return sharedState.lifeHistory;
    }
    if (!savedLifeHistory) return [];
    const parsed = lifeHistorySchema.safeParse(JSON.parse(savedLifeHistory));
    if (!parsed.success) {
      console.error('invalid life history, using empty array');
      return [];
    }
    return parsed.data;
  });
  const addLifeHistoryEvent = useCallback((event: LifeHistoryEvent) => {
    setLifeHistory((prevHistory) => {
      const updatedHistory = [...prevHistory, event];
      localStorage.setItem('lifeHistory', JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  }, []);
  const clearLifeHistory = useCallback(() => {
    setLifeHistory([]);
    localStorage.removeItem('lifeHistory');
  }, []);

  // Held in state, not read from the link on every render, so that ending
  // the tracked game stops the publishing without a reload.
  const [trackedGameId, setTrackedGameId] = useState<string | null>(
    trackLink?.id ?? null
  );
  // The round clock this game follows, from the same link and held the same
  // way. Absent from every link minted before the round-end feature, and
  // absent from every link for a tournament whose organizer never starts a
  // clock, which is why it is read as an optional field and never required.
  const [trackedRoundId, setTrackedRoundId] = useState<string | null>(
    trackLink?.r ?? null
  );
  const clearTrackedGame = useCallback(() => {
    clearStoredTrackLink();
    setTrackedGameId(null);
    // The link is gone, so the round it named is gone with it. Leaving the
    // subscription up would keep a tournament's clock on the screen of a
    // kitchen-table game started afterwards.
    setTrackedRoundId(null);
  }, []);
  const resumeTrackedGame = useCallback((link: TrackLink) => {
    storeTrackLink(link);
    setTrackedGameId(link.id);
    setTrackedRoundId(link.r ?? null);
  }, []);

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
        has_life_history:
          !!sharedState.lifeHistory && sharedState.lifeHistory.length > 0,
        life_history_events: sharedState.lifeHistory?.length || 0,
      });

      // Persist shared life history to localStorage
      if (sharedState.lifeHistory && sharedState.lifeHistory.length > 0) {
        localStorage.setItem(
          'lifeHistory',
          JSON.stringify(sharedState.lifeHistory)
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount - sharedState and analytics are stable

  const ctxValue = useMemo((): GlobalSettingsContextType => {
    const removeLocalStorage = async () => {
      // The list lives in Utils/storageScope, next to the game-scoped keys it
      // is derived from, so this path and a new game cannot drift apart.
      clearKeys(keysToClearOnGoToStart());
      clearTrackedGame();

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
      lifeHistory,
      addLifeHistoryEvent,
      clearLifeHistory,
      trackedGameId,
      trackedRoundId,
      clearTrackedGame,
      resumeTrackedGame,
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
    lifeHistory,
    addLifeHistoryEvent,
    clearLifeHistory,
    trackedGameId,
    trackedRoundId,
    clearTrackedGame,
    resumeTrackedGame,
  ]);

  return (
    <GlobalSettingsContext.Provider value={ctxValue}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};
