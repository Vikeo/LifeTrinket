import { useEffect, useRef } from 'react';
import { useGlobalSettings } from '../../../../Hooks/useGlobalSettings';
import { Player, Rotation } from '../../../../Types/Player';
import { Paragraph } from '../../../Misc/TextComponents';
import { DynamicText } from '../../../Misc/TextComponents';

export const RoulettePlayerCard = ({ player }: { player: Player }) => {
  const startPlayingTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const { settings, randomizingPlayer, playing, setPlaying } =
    useGlobalSettings();

  useEffect(() => {
    if (
      player.isStartingPlayer &&
      ((!playing && randomizingPlayer) || !playing)
    ) {
      startPlayingTimerRef.current = setTimeout(() => {
        setPlaying(true);
      }, 10_000);
    }

    return () => clearTimeout(startPlayingTimerRef.current);
  }, [
    player.isStartingPlayer,
    playing,
    setPlaying,
    settings.preStartMode,
    randomizingPlayer,
  ]);

  const calcTextRotation =
    player.settings.rotation === Rotation.SideFlipped ||
    player.settings.rotation === Rotation.Side
      ? player.settings.rotation - 180
      : player.settings.rotation;

  return (
    <div className="relative flex flex-grow flex-col items-center w-full h-full overflow-hidden bg-black">
      <div
        className="flex absolute w-full h-full justify-center items-center pointer-events-none select-none webkit-user-select-none z-10"
        style={{ backgroundColor: player.color }}
      >
        {player.isStartingPlayer && (
          <DynamicText
            style={{
              rotate: `${calcTextRotation}deg`,
            }}
          >
            <div className="flex flex-col justify-center items-center">
              <Paragraph>👑</Paragraph>
            </div>
          </DynamicText>
        )}
      </div>
    </div>
  );
};
