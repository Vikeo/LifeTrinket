import { twc } from 'react-twc';
import { Skull } from '../../Icons/generated';
import { Rotation } from '../../Types/Player';
import { RotationDivProps } from './CommanderDamage';

const LoseButton = twc.div<RotationDivProps>((props) => [
  'absolute flex-grow border-none outline-none cursor-pointer bg-interface-loseButton-background rounded-lg select-none z-[1] webkit-user-select-none py-2 px-4 ',

  props.$rotation === Rotation.SideFlipped || props.$rotation === Rotation.Side
    ? `left-[19%]`
    : 'top-[21%]',
]);

type LoseButtonProps = {
  onClick: () => void;
  rotation: Rotation;
};

export const LoseGameButton = ({ rotation, onClick }: LoseButtonProps) => {
  const calcRotation =
    rotation === Rotation.SideFlipped
      ? rotation
      : rotation === Rotation.Side
      ? rotation - 180
      : rotation === Rotation.Flipped
      ? rotation - 180
      : rotation;

  return (
    <LoseButton
      $rotation={rotation}
      onClick={onClick}
      aria-label={`Lose Game`}
      style={{ rotate: `${calcRotation}deg` }}
    >
      <Skull size="8vmin" color="black" opacity={0.5} />
    </LoseButton>
  );
};
