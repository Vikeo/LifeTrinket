import { createContext } from 'react';

export type GlobalSettingsContextType = {
  isFullscreen: boolean;
  enableFullscreen: () => void;
  disableFullscreen: () => void;
};

export const GlobalSettingsContext =
  createContext<GlobalSettingsContextType | null>(null);
