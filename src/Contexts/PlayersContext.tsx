import { createContext } from 'react';
import { Player } from '../Types/Player';

export type PlayersContextType = {
  players: Player[] | [];
  setPlayers: (players: Player[]) => void;
  updatePlayer: (updatedPlayer: Player) => void;
};

export const PlayersContext = createContext<PlayersContextType | null>(null);
