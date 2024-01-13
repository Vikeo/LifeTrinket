import { twc } from 'react-twc';
import { Player, Rotation } from '../../Types/Player';
import { CommanderDamage, RotationDivProps } from '../Buttons/CommanderDamage';

const CommanderDamageGrid = twc.div<RotationDivProps>((props) => [
  'flex flex-grow',
  props.$rotation === Rotation.SideFlipped || props.$rotation === Rotation.Side
    ? 'flex-col h-full w-auto'
    : 'flex-row w-full',
]);

type CommanderDamageBarProps = {
  opponents: Player[];
  player: Player;
  handleLifeChange: (updatedLifeTotal: number) => void;
};

const CommanderDamageBar = ({
  opponents,
  player,
  handleLifeChange,
}: CommanderDamageBarProps) => {
  return (
    <CommanderDamageGrid
      $rotation={player.settings.rotation}
      key={player.index}
    >
      {opponents.map((opponent) => {
        if (!opponent.settings.useCommanderDamage) {
          return null;
        }
        return (
          <CommanderDamage
            player={player}
            opponent={opponent}
            key={opponent.index}
            handleLifeChange={handleLifeChange}
          />
        );
      })}
    </CommanderDamageGrid>
  );
};

export default CommanderDamageBar;
