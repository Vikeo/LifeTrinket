import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useWakeLock } from 'react-screen-wake-lock';
import {
  GlobalSettingsContext,
  GlobalSettingsContextType,
} from '../Contexts/GlobalSettingsContext';
import { useAnalytics } from '../Hooks/useAnalytics';
import {
  GameFormat,
  InitialGameSettings,
  InitialGameSettingsSchema,
  Orientation,
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

  const [showPlay, setShowPlay] = useState<boolean>(
    savedShowPlay ? savedShowPlay === 'true' : false
  );

  const [initialGameSettings, setInitialSettings] =
    useState<InitialGameSettings | null>(
      savedGameSettings ? JSON.parse(savedGameSettings) : null
    );

  const setInitialGameSettings = (initialGameSettings: InitialGameSettings) => {
    const defaultSettings: InitialGameSettings = {
      numberOfPlayers: 4,
      startingLifeTotal: 40,
      useCommanderDamage: true,
      orientation: Orientation.Landscape,
      gameFormat: GameFormat.Commander,
    };
    setInitialSettings({ ...defaultSettings, ...initialGameSettings });
  };

  const [settings, setSettings] = useState<Settings>(
    savedSettings
      ? JSON.parse(savedSettings)
      : { goFullscreenOnStart: true, keepAwake: true, showStartingPlayer: true }
  );

  const removeLocalStorage = async () => {
    localStorage.removeItem('initialGameSettings');
    localStorage.removeItem('players');
    localStorage.removeItem('playing');
    localStorage.removeItem('showPlay');
    setShowPlay(false);
  };

  useEffect(() => {
    console.log('initialGameSettings', JSON.parse(savedGameSettings as string));

    if (savedGameSettings && JSON.parse(savedGameSettings).gridAreas) {
      console.log('lmao1');

      removeLocalStorage();
      return;
    }

    //parse existing game settings with zod schema
    const parsedInitialGameSettings =
      InitialGameSettingsSchema.safeParse(initialGameSettings);
    console.log('lmao2');

    if (!parsedInitialGameSettings.success) {
      console.log('lmao3');
      removeLocalStorage();
      return;
    }

    console.log('llam');

    localStorage.setItem(
      'initialGameSettings',
      JSON.stringify(initialGameSettings)
    );
  }, [initialGameSettings]);

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
      initialGameSettings,
      setInitialGameSettings,
      settings,
      setSettings,
      isPWA: window?.matchMedia('(display-mode: standalone)').matches,
    };
  }, [
    active,
    analytics,
    initialGameSettings,
    isFullscreen,
    isSupported,
    release,
    request,
    settings,
    showPlay,
    type,
  ]);

  return (
    <GlobalSettingsContext.Provider value={ctxValue}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};
