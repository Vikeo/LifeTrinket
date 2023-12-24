import { Player, Rotation } from '../../Types/Player';
import styled from 'styled-components';
import { css } from 'styled-components';
import { CommanderDamage } from '../Buttons/CommanderDamage';

const CommanderDamageGrid = styled.div<{ $rotation: number }>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;

  ${(props) => {
    if (
      props.$rotation === Rotation.SideFlipped ||
      props.$rotation === Rotation.Side
    ) {
      return css`
        flex-direction: column;
        height: 100%;
        width: auto;
      `;
    }
  }}
`;

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
