import { useEffect, useState } from 'react';

type FullscreenHookReturnType = {
  isFullscreen: boolean;
  enableFullscreen: () => void;
  disableFullscreen: () => void;
};

export const useFullscreen = (): FullscreenHookReturnType => {
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

  return { isFullscreen, enableFullscreen, disableFullscreen };
};
