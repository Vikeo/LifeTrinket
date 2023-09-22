import { createContext } from 'react';
import { InitialSettings } from '../Data/getInitialPlayers';

export type GlobalSettingsContextType = {
  fullscreen: {
    isFullscreen: boolean;
    enableFullscreen: () => void;
    disableFullscreen: () => void;
  };
  wakeLock: {
    isSupported: boolean;
    release: () => void;
    active: boolean;
    request: () => void;
    type: 'screen' | undefined;
    toggleWakeLock: () => void;
  };
  goToStart: () => void;
  showPlay: boolean;
  setShowPlay: (showPlay: boolean) => void;
  initialGameSettings: InitialSettings | null;
  setInitialGameSettings: (initialGameSettings: InitialSettings) => void;
};

export const GlobalSettingsContext =
  createContext<GlobalSettingsContextType | null>(null);
