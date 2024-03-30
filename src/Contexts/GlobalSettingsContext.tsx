import { createContext } from 'react';
import { InitialGameSettings, Settings } from '../Types/Settings';

type Version = {
  installedVersion: string;
  isLatest: boolean;
  checkForNewVersion: (source: 'settings' | 'start_menu') => Promise<void>;
  remoteVersion?: string;
};

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
  initialGameSettings: InitialGameSettings | null;
  setInitialGameSettings: (initialGameSettings: InitialGameSettings) => void;
  settings: Settings;
  setSettings: (settings: Settings) => void;
  playing: boolean;
  setPlaying: (playing: boolean) => void;
  randomizingPlayer: boolean;
  setRandomizingPlayer: (stopRandom: boolean) => void;
  isPWA: boolean;
  preStartCompleted: boolean;
  setPreStartCompleted: (completed: boolean) => void;

  version: Version;
};

export const GlobalSettingsContext =
  createContext<GlobalSettingsContextType | null>(null);
