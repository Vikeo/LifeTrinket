import LifeCounter from '../LifeCounter/LifeCounter';
import { Player as PlayerType } from '../../Types/Player';
import { twc } from 'react-twc';
import { useEffect, useRef, useState } from 'react';
import { useGlobalSettings } from '../../Hooks/useGlobalSettings';

const getGridArea = (player: PlayerType) => {
  switch (player.index) {
    case 0:
      return 'grid-in-player0';
    case 1:
      return 'grid-in-player1';
    case 2:
      return 'grid-in-player2';
    case 3:
      return 'grid-in-player3';
    case 4:
      return 'grid-in-player4';
    case 5:
      return 'grid-in-player5';
    default:
      throw new Error('Invalid player index');
  }
};

const PlayersWrapper = twc.div`w-full h-full bg-black`;

export const Players = (players: PlayerType[], gridClasses: string) => {
  const randomIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [randomPlayerIndex, setRandomPlayerIndex] = useState<number>(
    Math.floor(Math.random() * players.length)
  );
  const [stopRandom, setStopRandom] = useState<boolean>(false);
  const { settings } = useGlobalSettings();

  useEffect(() => {
    if (settings.useRandomStartingPlayerInterval) {
      randomIntervalRef.current = setInterval(() => {
        let randomIndex: number;

        do {
          randomIndex = Math.floor(Math.random() * players.length);
        } while (randomIndex === randomPlayerIndex);

        setRandomPlayerIndex(randomIndex);
      }, 100);
    }
    return () => {
      if (randomIntervalRef.current) {
        clearInterval(randomIntervalRef.current);
      }
    };
  }, [
    players.length,
    randomPlayerIndex,
    settings.useRandomStartingPlayerInterval,
  ]);

  return (
    <PlayersWrapper>
      {settings.useRandomStartingPlayerInterval && (
        <div
          data-stopRandom={stopRandom}
          className="absolute flex justify-center items-center bg-black bg-opacity-50 size-full z-50 cursor-pointer text-5xl data-[stopRandom=true]:hidden"
          onClick={() => {
            if (randomIntervalRef.current) {
              clearInterval(randomIntervalRef.current);
              randomIntervalRef.current = null;
              setStopRandom(true);
            }
          }}
        >
          CHOOSE A PLAYER
        </div>
      )}
      <div className={`grid w-full h-full gap-1 box-border ${gridClasses} `}>
        {players.map((player) => {
          const gridArea = getGridArea(player);

          return (
            <div
              key={player.index}
              className={`flex justify-center items-center align-middle ${gridArea}`}
            >
              <LifeCounter
                stopRandom={stopRandom}
                player={player}
                opponents={players.filter(
                  (opponent) => opponent.index !== player.index
                )}
                isStartingPlayer={randomPlayerIndex === player.index}
              />
            </div>
          );
        })}
      </div>
    </PlayersWrapper>
  );
};
