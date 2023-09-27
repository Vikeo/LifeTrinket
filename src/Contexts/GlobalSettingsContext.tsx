import { createContext } from 'react';
import { InitialPlaySettings } from '../Data/getInitialPlayers';

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
  initialGameSettings: InitialPlaySettings | null;
  setInitialGameSettings: (initialGameSettings: InitialPlaySettings) => void;
  showStartingPlayer: boolean;
  setShowStartingPlayer: (showStartingPlayer: boolean) => void;
};

export const GlobalSettingsContext =
  createContext<GlobalSettingsContextType | null>(null);
