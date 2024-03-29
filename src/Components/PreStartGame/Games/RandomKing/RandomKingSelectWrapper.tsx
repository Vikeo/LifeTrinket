import { useEffect, useRef } from 'react';
import { useGlobalSettings } from '../../../../Hooks/useGlobalSettings';
import { usePlayers } from '../../../../Hooks/usePlayers';

export const RandomKingSelectWrapper = () => {
  const { setRandomizingPlayer } = useGlobalSettings();

  const randomIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const prevRandomIndexRef = useRef<number>(-1);

  const { settings, randomizingPlayer, setPreStartCompleted } =
    useGlobalSettings();

  const { players, setPlayers } = usePlayers();

  useEffect(() => {
    if (
      players.length > 1 &&
      settings.showStartingPlayer &&
      randomizingPlayer
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

    return () => {
      if (randomIntervalRef.current) {
        clearInterval(randomIntervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players.length, setPlayers, randomizingPlayer]);

  const gradientColors = players.map((player) => player.color).join(', ');

  return (
    <div
      className="absolute flex justify-center items-center h-screen w-screen portrait:h-[100vw] portrait:w-[100vh] z-40 cursor-pointer text-5xl"
      onClick={() => {
        if (randomIntervalRef.current) {
          clearInterval(randomIntervalRef.current);
          randomIntervalRef.current = null;
        }
        setRandomizingPlayer(false);
        setPreStartCompleted(true);
      }}
    >
      <div className="absolute flex top-[30%] justify-center items-center px-8 py-4">
        <div
          className="absolute size-full blur-[3px] rounded-2xl opacity-90 saturate-150"
          style={{
            backgroundImage: `linear-gradient(60deg, ${gradientColors})`,
          }}
        />
        <p className="relative z-10 text-[5vmax]">PRESS TO SELECT PLAYER</p>
      </div>
    </div>
  );
};
