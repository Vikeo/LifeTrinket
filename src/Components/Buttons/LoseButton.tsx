import { twc } from 'react-twc';
import { Skull } from '../../Icons/generated';
import { Rotation } from '../../Types/Player';
import { RotationDivProps } from './CommanderDamage';

const LoseButton = twc.div<RotationDivProps>((props) => [
  'absolute flex-grow border-none outline-none cursor-pointer bg-interface-loseButton-background rounded-lg select-none z-[1] webkit-user-select-none',

  props.$rotation === Rotation.SideFlipped
    ? `right-auto top-[15%] left-[27%]`
    : props.$rotation === Rotation.Side
    ? `right-auto top-[15%] left-[27%]`
    : 'right-[15%] top-1/4',
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
      : rotation;

  return (
    <LoseButton
      $rotation={rotation}
      onClick={onClick}
      aria-label={`Lose Game`}
      style={{ rotate: `${calcRotation}deg` }}
    >
      <Skull size="5vmin" color="black" opacity={0.5} />
    </LoseButton>
  );
};
