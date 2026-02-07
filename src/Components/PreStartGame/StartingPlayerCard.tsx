import { useGlobalSettings } from '../../Hooks/useGlobalSettings';
import { Player, Rotation } from '../../Types/Player';
import { PreStartMode } from '../../Types/Settings';
import { DynamicText, Paragraph } from '../Misc/TextComponents';

export const StartingPlayerCard = ({ player }: { player: Player }) => {
  const { settings, setPlaying, randomizingPlayer } = useGlobalSettings();

  const calcTextRotation =
    player.settings.rotation === Rotation.SideFlipped ||
    player.settings.rotation === Rotation.Side
      ? player.settings.rotation - 180
      : player.settings.rotation;

  const calcRotation =
    player.settings.rotation === Rotation.SideFlipped ||
    player.settings.rotation === Rotation.Side
      ? player.settings.rotation - 90
      : player.settings.rotation;

  return (
    <div
      className="z-20 flex absolute w-full h-full justify-center items-center select-none cursor-pointer webkit-user-select-none backdrop-blur-xl"
      style={{
        rotate: `${calcRotation}deg`,
      }}
      onClick={() => {
        setPlaying(true);
      }}
    >
      <DynamicText
        style={{
          rotate: `${calcTextRotation}deg`,
        }}
      >
        <div className="flex flex-col justify-center items-center text-text-primary font-semibold">
          <Paragraph>👑</Paragraph>
          {(!randomizingPlayer ||
            (settings.preStartMode !== PreStartMode.None &&
              settings.preStartMode !== PreStartMode.FingerGame)) && (
            <>
              <Paragraph>You start!</Paragraph>
              <Paragraph className="text-xl">(Press to hide)</Paragraph>
            </>
          )}
        </div>
      </DynamicText>
    </div>
  );
};
