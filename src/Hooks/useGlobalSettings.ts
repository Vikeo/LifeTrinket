import { useContext } from 'react';
import { GlobalSettingsContext } from '../Contexts/GlobalSettingsContext';

export const useGlobalSettings = () => {
  const context = useContext(GlobalSettingsContext);

  if (!context) {
    throw new Error('useGlobalSettings hook had an issue with the context');
  }

  return { ...context };
};
