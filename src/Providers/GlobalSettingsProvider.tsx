import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useWakeLock } from 'react-screen-wake-lock';
import {
  GlobalSettingsContext,
  GlobalSettingsContextType,
  SavedGame,
} from '../Contexts/GlobalSettingsContext';
import { useAnalytics } from '../Hooks/useAnalytics';
import {
  InitialGameSettings,
  Settings,
  defaultInitialGameSettings,
  defaultSettings,
  initialGameSettingsSchema,
  settingsSchema,
} from '../Types/Settings';
import { gte as semverGreaterThanOrEqual } from 'semver';

export const GlobalSettingsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const analytics = useAnalytics();

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
  const [playing, setPlaying] = useState<boolean>(
    savedPlaying ? savedPlaying === 'true' : false
  );
  const setPlayingAndLocalStorage = (playing: boolean) => {
    setPlaying(playing);
    localStorage.setItem('playing', String(playing));
  };

  const savedPreStartComplete = localStorage.getItem('preStartComplete');
  const [preStartCompleted, setPreStartCompleted] = useState<boolean>(
    savedPreStartComplete ? savedPreStartComplete === 'true' : false
  );

  const savedShowPlay = localStorage.getItem('showPlay');
  const [showPlay, setShowPlay] = useState<boolean>(
    savedShowPlay ? savedShowPlay === 'true' : false
  );
  const setShowPlayAndLocalStorage = (showPlay: boolean) => {
    setShowPlay(showPlay);
    localStorage.setItem('showPlay', String(showPlay));
  };

  const savedSettings = localStorage.getItem('settings');
  const [randomizingPlayer, setRandomizingPlayer] = useState<boolean>(
    savedSettings
      ? Boolean(JSON.parse(savedSettings).preStartMode === 'random-king')
      : true
  );
  const [settings, setSettings] = useState<Settings>(
    savedSettings ? JSON.parse(savedSettings) : defaultSettings
  );

  const setSettingsAndLocalStorage = (settings: Settings) => {
    setSettings(settings);
    localStorage.setItem('settings', JSON.stringify(settings));
  };

  const savedGameSettings = localStorage.getItem('initialGameSettings');

  const [initialGameSettings, setInitialGameSettings] =
    useState<InitialGameSettings>(
      savedGameSettings
        ? JSON.parse(savedGameSettings)
        : defaultInitialGameSettings
    );

  const setInitialGameSettingsAndLocalStorage = (
    initialGameSettings: InitialGameSettings
  ) => {
    setInitialGameSettings(initialGameSettings);
    localStorage.setItem(
      'initialGameSettings',
      JSON.stringify(initialGameSettings)
    );
  };

  const removeLocalStorage = async () => {
    localStorage.removeItem('initialGameSettings');
    localStorage.removeItem('players');
    localStorage.removeItem('playing');
    localStorage.removeItem('showPlay');
    localStorage.removeItem('preStartComplete');

    setPlaying(false);
    setShowPlay(false);
    setPreStartCompleted(false);
    setSettings({ ...settings, useMonarch: false });
  };

  // Set settings if they are not valid
  useEffect(() => {
    // If there are no saved settings, set default settings
    if (!savedSettings) {
      setSettingsAndLocalStorage(defaultSettings);
      return;
    }

    const parsedSettings = settingsSchema.safeParse(JSON.parse(savedSettings));

    // If saved settings are not valid, remove them
    if (!parsedSettings.success) {
      console.error('invalid settings, resetting to default settings');
      setSettingsAndLocalStorage(defaultSettings);
      return;
    }
    localStorage.setItem('settings', JSON.stringify(parsedSettings.data));
  }, [settings, savedSettings]);

  // Set initial game settings if they are not valid
  useEffect(() => {
    if (!savedGameSettings) {
      setInitialGameSettingsAndLocalStorage(defaultInitialGameSettings);
      return;
    }

    //parse existing game settings with zod schema
    const parsedInitialGameSettings =
      initialGameSettingsSchema.safeParse(initialGameSettings);

    if (!parsedInitialGameSettings.success) {
      console.error('invalid game settings, resetting to default settings');
      setInitialGameSettingsAndLocalStorage(defaultInitialGameSettings);
      return;
    }

    localStorage.setItem(
      'initialGameSettings',
      JSON.stringify(parsedInitialGameSettings.data)
    );
  }, [initialGameSettings, savedGameSettings]);

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

  const ctxValue = useMemo((): GlobalSettingsContextType => {
    const goToStart = async () => {
      const currentPlayers = localStorage.getItem('players');

      if (currentPlayers) {
        analytics.trackEvent('go_to_start', {
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
        const result = await fetch(
          'https://api.github.com/repos/Vikeo/LifeTrinket/releases/latest',
          {
            headers: {
              Authorization: `Bearer ${
                import.meta.env.VITE_REPO_READ_ACCESS_TOKEN
              }`,
              Accept: 'application/vnd.github+json',
              'X-GitHub-Api-Version': '2022-11-28',
            },
          }
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
      setInitialGameSettings,
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
    preStartCompleted,
    savedGame,
    remoteVersion,
    isLatestVersion,
    analytics,
    removeLocalStorage,
  ]);

  return (
    <GlobalSettingsContext.Provider value={ctxValue}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};
