import { useEffect, useRef } from 'react';
import { twc } from 'react-twc';
import { useGlobalSettings } from '../../Hooks/useGlobalSettings';
import { usePlayers } from '../../Hooks/usePlayers';
import { Player as PlayerType } from '../../Types/Player';
import LifeCounter from '../LifeCounter/LifeCounter';

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

  const prevRandomIndexRef = useRef<number>(-1);

  const {
    settings,
    stopPlayerRandomization,
    setStopPlayerRandomization,
    playing,
  } = useGlobalSettings();

  const { setPlayers } = usePlayers();

  useEffect(() => {
    if (
      players.length > 1 &&
      settings.showStartingPlayer &&
      settings.useRandomStartingPlayerInterval &&
      !stopPlayerRandomization &&
      !playing
    ) {
      randomIntervalRef.current = setInterval(() => {
        let randomIndex: number;

        do {
          randomIndex = Math.floor(Math.random() * players.length);
        } while (randomIndex === prevRandomIndexRef.current);

        prevRandomIndexRef.current = randomIndex;
        setPlayers(
          players.map((p) =>
            p.index === prevRandomIndexRef.current
              ? {
                  ...p,
                  isStartingPlayer: true,
                }
              : {
                  ...p,
                  isStartingPlayer: false,
                }
          )
        );
      }, 100);
    }

    if (!settings.useRandomStartingPlayerInterval) {
      const randomPlayerIndex = Math.floor(Math.random() * players.length);
      setPlayers(
        players.map((p) =>
          p.index === randomPlayerIndex
            ? {
                ...p,
                isStartingPlayer: true,
              }
            : {
                ...p,
                isStartingPlayer: false,
              }
        )
      );
    }
    return () => {
      if (randomIntervalRef.current) {
        clearInterval(randomIntervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    players.length,
    playing,
    setPlayers,
    settings.useRandomStartingPlayerInterval,
    stopPlayerRandomization,
  ]);

  const gradientColors = players.map((player) => player.color).join(', ');

  return (
    <PlayersWrapper>
      {players.length > 1 &&
        settings.showStartingPlayer &&
        settings.useRandomStartingPlayerInterval &&
        !stopPlayerRandomization &&
        !playing && (
          <div
            className="absolute flex justify-center items-center h-screen w-screen portrait:h-[100vw] portrait:w-[100vh] z-50 cursor-pointer text-5xl"
            onClick={() => {
              if (randomIntervalRef.current) {
                clearInterval(randomIntervalRef.current);
                randomIntervalRef.current = null;
              }
              setStopPlayerRandomization(true);
            }}
          >
            <div className="absolute flex top-[30%] justify-center items-center px-8 py-4">
              <div
                className="absolute size-full blur-[3px] rounded-2xl opacity-90 saturate-150"
                style={{
                  backgroundImage: `linear-gradient(60deg, ${gradientColors})`,
                }}
              />
              <p className="relative z-10 text-[5vmax]">
                PRESS TO SELECT PLAYER
              </p>
            </div>
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
                player={player}
                opponents={players.filter(
                  (opponent) => opponent.index !== player.index
                )}
              />
            </div>
          );
        })}
      </div>
    </PlayersWrapper>
  );
};
