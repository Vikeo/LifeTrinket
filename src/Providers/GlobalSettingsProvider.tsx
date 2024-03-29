import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useWakeLock } from 'react-screen-wake-lock';
import {
  GlobalSettingsContext,
  GlobalSettingsContextType,
} from '../Contexts/GlobalSettingsContext';
import { useAnalytics } from '../Hooks/useAnalytics';
import {
  InitialGameSettings,
  InitialGameSettingsSchema,
  Settings,
} from '../Types/Settings';

export const GlobalSettingsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const analytics = useAnalytics();

  const savedShowPlay = localStorage.getItem('showPlay');
  const savedGameSettings = localStorage.getItem('initialGameSettings');
  const savedSettings = localStorage.getItem('settings');
  const savedPlaying = localStorage.getItem('playing');

  const [playing, setPlaying] = useState<boolean>(
    savedPlaying ? savedPlaying === 'true' : false
  );
  const setPlayingAndLocalStorage = (playing: boolean) => {
    setPlaying(playing);
    localStorage.setItem('playing', String(playing));
  };

  const [showPlay, setShowPlay] = useState<boolean>(
    savedShowPlay ? savedShowPlay === 'true' : false
  );

  const [stopPlayerRandomization, setStopPlayerRandomization] =
    useState<boolean>(false);

  const [initialGameSettings, setInitialGameSettings] =
    useState<InitialGameSettings | null>(
      savedGameSettings ? JSON.parse(savedGameSettings) : null
    );

  const [settings, setSettings] = useState<Settings>(
    savedSettings
      ? JSON.parse(savedSettings)
      : {
          goFullscreenOnStart: true,
          keepAwake: true,
          showStartingPlayer: true,
          showPlayerMenuCog: true,
          useRandomStartingPlayerInterval: false,
        }
  );

  const removeLocalStorage = async () => {
    localStorage.removeItem('initialGameSettings');
    localStorage.removeItem('players');
    localStorage.removeItem('playing');
    localStorage.removeItem('showPlay');

    setPlaying(false);
    setShowPlay(false);
  };

  useEffect(() => {
    if (savedGameSettings && JSON.parse(savedGameSettings).gridAreas) {
      removeLocalStorage();
      window.location.reload();
      return;
    }

    //parse existing game settings with zod schema
    const parsedInitialGameSettings =
      InitialGameSettingsSchema.safeParse(initialGameSettings);

    if (!parsedInitialGameSettings.success) {
      removeLocalStorage();
      window.location.reload();
      return;
    }

    localStorage.setItem(
      'initialGameSettings',
      JSON.stringify(initialGameSettings)
    );
  }, [initialGameSettings, savedGameSettings]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

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
      setShowPlay,
      playing,
      setPlaying: setPlayingAndLocalStorage,
      initialGameSettings,
      setInitialGameSettings,
      settings,
      setSettings,
      stopPlayerRandomization,
      setStopPlayerRandomization,
      isPWA: window?.matchMedia('(display-mode: standalone)').matches,
    };
  }, [
    active,
    analytics,
    initialGameSettings,
    isFullscreen,
    isSupported,
    playing,
    release,
    request,
    settings,
    showPlay,
    stopPlayerRandomization,
    type,
  ]);

  return (
    <GlobalSettingsContext.Provider value={ctxValue}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};
