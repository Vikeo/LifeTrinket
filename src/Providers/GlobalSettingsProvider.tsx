import { ReactNode, useEffect, useMemo, useState } from 'react';
import {
  GlobalSettingsContext,
  GlobalSettingsContextType,
} from '../Contexts/GlobalSettingsContext';
import { useWakeLock } from 'react-screen-wake-lock';
import { useAnalytics } from '../Hooks/useAnalytics';
import { InitialPlaySettings } from '../Data/getInitialPlayers';

export const GlobalSettingsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const analytics = useAnalytics();

  const savedShowPlay = localStorage.getItem('showPlay');
  const savedGameSettings = localStorage.getItem('initialGameSettings');

  const [showPlay, setShowPlay] = useState<boolean>(
    savedShowPlay ? savedShowPlay === 'true' : false
  );
  const [showStartingPlayer, setShowStartingPlayer] = useState(true);

  const [initialGameSettings, setInitialGameSettings] =
    useState<InitialPlaySettings | null>(
      savedGameSettings ? JSON.parse(savedGameSettings) : null
    );

  useEffect(() => {
    localStorage.setItem(
      'initialGameSettings',
      JSON.stringify(initialGameSettings)
    );
  }, [initialGameSettings]);

  const [isFullscreen, setIsFullscreen] = useState(false);

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

  useEffect(() => {
    const fullscreenChangeHandler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', fullscreenChangeHandler);

    return () => {
      document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
    };
  }, []);

  const { isSupported, release, released, request, type } = useWakeLock();

  const active = released === undefined ? false : !released;

  const removeLocalStorage = async () => {
    localStorage.removeItem('initialGameSettings');
    localStorage.removeItem('players');
    localStorage.removeItem('playing');
    localStorage.removeItem('showPlay');
    setShowPlay(localStorage.getItem('showPlay') === 'true' ?? false);
  };

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
        release();
        return;
      }

      request();
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
      showStartingPlayer,
      setShowStartingPlayer,
    };
  }, [
    active,
    analytics,
    initialGameSettings,
    isFullscreen,
    isSupported,
    release,
    request,
    showPlay,
    showStartingPlayer,
    type,
  ]);

  return (
    <GlobalSettingsContext.Provider value={ctxValue}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};
