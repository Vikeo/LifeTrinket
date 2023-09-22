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

  const ctxValue = useMemo((): PlayersContextType => {
    const updatePlayer = (updatedPlayer: Player) => {
      const updatedPlayers = players.map((player) =>
        player.index === updatedPlayer.index ? updatedPlayer : player
      );

      setPlayers(updatedPlayers);
    };

    const updateLifeTotal = (
      player: Player,
      updatedLifeTotal: number
    ): number => {
      const difference = updatedLifeTotal - player.lifeTotal;
      const updatedPlayer = {
        ...player,
        lifeTotal: updatedLifeTotal,
        hasLost: false,
      };
      updatePlayer(updatedPlayer);

      return difference;
    };

    return {
      players,
      setPlayers,
      updatePlayer,
      updateLifeTotal,
    };
  }, [players]);

  return (
    <PlayersContext.Provider value={ctxValue}>
      {children}
    </PlayersContext.Provider>
  );
};
