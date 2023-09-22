import { ReactNode, useEffect, useMemo, useState } from 'react';
import {
  GlobalSettingsContext,
  GlobalSettingsContextType,
} from '../Contexts/GlobalSettingsContext';

export const GlobalSettingsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
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

  const ctxValue = useMemo((): GlobalSettingsContextType => {
    return { isFullscreen, enableFullscreen, disableFullscreen };
  }, [isFullscreen]);

  return (
    <GlobalSettingsContext.Provider value={ctxValue}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};
