import { ReactNode, useEffect } from 'react';
import { Player } from '../Types/Player';
import { useMemo, useState } from 'react';
import { PlayersContextType, PlayersContext } from '../Contexts/PlayersContext';

export const PlayersProvider = ({ children }: { children: ReactNode }) => {
  const savedPlayers = localStorage.getItem('players');

  const [players, setPlayers] = useState<Player[]>(
    savedPlayers ? JSON.parse(savedPlayers) : []
  );

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

  const updatePlayer = (updatedPlayer: Player) => {
    const updatedPlayers = players.map((player) =>
      player.index === updatedPlayer.index ? updatedPlayer : player
    );

    setPlayers(updatedPlayers);
  };

  const ctxValue = useMemo((): PlayersContextType => {
    return {
      players,
      setPlayers,
      updatePlayer,
    };
  }, [players]);

  return (
    <PlayersContext.Provider value={ctxValue}>
      {children}
    </PlayersContext.Provider>
  );
};
