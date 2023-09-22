import { useContext } from 'react';
import { PlayersContext } from '../Contexts/PlayersContext';

export const usePlayers = () => {
  const context = useContext(PlayersContext);

  if (!context) {
    throw new Error('usePlayers hook had an issue with the context');
  }

  return { ...context };
};
