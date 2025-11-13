import { ReactNode, useEffect } from 'react';
import { Player } from '../Types/Player';
import { useMemo, useState } from 'react';
import { PlayersContextType, PlayersContext } from '../Contexts/PlayersContext';
import { InitialGameSettings } from '../Types/Settings';

export const PlayersProvider = ({ children }: { children: ReactNode }) => {
  const savedPlayers = localStorage.getItem('players');

  const savedStartingPlayerIndex = localStorage.getItem('startingPlayerIndex');

  const [startingPlayerIndex, setStartingPlayerIndex] = useState<number>(
    savedStartingPlayerIndex ? parseInt(savedStartingPlayerIndex) : -1
  );

  const setStartingPlayerIndexAndLocalStorage = (index: number) => {
    setStartingPlayerIndex(index);
    localStorage.setItem('startingPlayerIndex', String(index));
  };

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

    const resetCurrentGame = () => {
      const savedGameSettings = localStorage.getItem('initialGameSettings');

      const initialGameSettings: InitialGameSettings = savedGameSettings
        ? JSON.parse(savedGameSettings)
        : null;

      if (!initialGameSettings) {
        return;
      }

      const newStartingPlayerIndex = Math.floor(Math.random() * players.length);

      players.forEach((player: Player) => {
        player.commanderDamage.map((damage) => {
          damage.damageTotal = 0;
          damage.partnerDamageTotal = 0;
        });

        player.extraCounters.map((counter) => {
          counter.value = 0;
        });

        player.lifeTotal = initialGameSettings.startingLifeTotal;
        player.hasLost = false;

        player.isStartingPlayer = newStartingPlayerIndex === player.index;

        updatePlayer(player);
      });
      localStorage.setItem('playing', 'false');
    };

    const swapPlayerLives = (playerIndex1: number, playerIndex2: number) => {
      const player1 = players.find((p) => p.index === playerIndex1);
      const player2 = players.find((p) => p.index === playerIndex2);

      if (!player1 || !player2) {
        return;
      }

      const temp = player1.lifeTotal;
      const updatedPlayer1 = { ...player1, lifeTotal: player2.lifeTotal };
      const updatedPlayer2 = { ...player2, lifeTotal: temp };

      const updatedPlayers = players.map((player) => {
        if (player.index === playerIndex1) return updatedPlayer1;
        if (player.index === playerIndex2) return updatedPlayer2;
        return player;
      });

      setPlayers(updatedPlayers);
    };

    return {
      players,
      setPlayers,
      updatePlayer,
      updateLifeTotal,
      resetCurrentGame,
      startingPlayerIndex,
      setStartingPlayerIndex: setStartingPlayerIndexAndLocalStorage,
      swapPlayerLives,
    };
  }, [players, startingPlayerIndex]);

  return (
    <PlayersContext.Provider value={ctxValue}>
      {children}
    </PlayersContext.Provider>
  );
};
