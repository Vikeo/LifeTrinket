import { createContext } from 'react';
import { InitialGameSettings, Settings } from '../Types/Settings';
import { Player } from '../Types/Player';

type Version = {
  installedVersion: string;
  isLatest: boolean;
  checkForNewVersion: (source: 'settings' | 'start_menu') => Promise<void>;
  remoteVersion?: string;
};

export type SavedGame = {
  initialGameSettings: InitialGameSettings;
  players: Player[];
} | null;

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
  initialGameSettings: InitialGameSettings;
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
  savedGame: SavedGame;
  saveCurrentGame: (currentGame: SavedGame) => void;
  swapMode: boolean;
  setSwapMode: (swapMode: boolean) => void;
  selectedPlayersForSwap: number[];
  selectPlayerForSwap: (playerIndex: number) => void;
};

export const GlobalSettingsContext =
  createContext<GlobalSettingsContextType | null>(null);
