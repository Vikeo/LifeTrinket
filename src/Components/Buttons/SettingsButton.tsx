import { twc } from 'react-twc';
import { Cog } from '../../Icons/generated';
import { Rotation } from '../../Types/Player';
import { RotationButtonProps } from './CommanderDamage';

const SettingsButtonTwc = twc.button<RotationButtonProps>((props) => [
  'absolute flex-grow border-none outline-none cursor-pointer bg-transparent z-[1] select-none  webkit-user-select-none',
  props.$rotation === Rotation.Side || props.$rotation === Rotation.SideFlipped
    ? `right-auto top-[1vmax] left-[27%]`
    : 'top-1/4 right-[1vmax]',
]);

type SettingsButtonProps = {
  onClick: () => void;
  rotation: Rotation;
};

const SettingsButton = ({ onClick, rotation }: SettingsButtonProps) => {
  return (
    <SettingsButtonTwc
      onClick={onClick}
      $rotation={rotation}
      aria-label={`Settings`}
    >
      <Cog size="5vmin" color="black" opacity="0.3" />
    </SettingsButtonTwc>
  );
};

export default SettingsButton;
