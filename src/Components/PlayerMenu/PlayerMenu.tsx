import { Player } from '../../Types/Player';
import Settings from './Settings';
import styled, { css } from 'styled-components/macro';
import { Rotation } from '../../Types/Player';

const PlayerMenuWrapper = styled.div<{
  rotation: Rotation;
}>`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(20, 20, 20, 0.9);
  z-index: 2;
  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return;
    }
    return css`
      rotate: ${props.rotation}deg;
    `;
  }};
`;

const CloseButton = styled.button<{
  rotation: Rotation;
}>`
  position: absolute;
  top: 5%;
  right: 5%;
  cursor: pointer;
  user-select: none;
  color: black;
  ${(props) => {
    if (props.rotation === Rotation.Side) {
      return css`
        rotate: ${props.rotation - 180}deg;
        top: 5%;
        right: auto;
        left: 5%;
      `;
    } else if (props.rotation === Rotation.SideFlipped) {
      return css`
        rotate: ${props.rotation - 180}deg;
        top: auto;
        left: auto;
        bottom: 5%;
        right: 5%;
      `;
    }
  }}
`;

type PlayerMenuProps = {
  player: Player;
  opponents: Player[];
  onPlayerChange: (updatedPlayer: Player) => void;
  setShowPlayerMenu: (showPlayerMenu: boolean) => void;
  resetCurrentGame: () => void;
};

const PlayerMenu = ({
  player,
  opponents,
  onPlayerChange,
  setShowPlayerMenu,
  resetCurrentGame,
}: PlayerMenuProps) => {
  const handleOnClick = () => {
    setShowPlayerMenu(false);
  };

  return (
    <PlayerMenuWrapper rotation={player.settings.rotation}>
      <CloseButton rotation={player.settings.rotation} onClick={handleOnClick}>
        X
      </CloseButton>
      <Settings
        player={player}
        onChange={onPlayerChange}
        opponents={opponents}
        resetCurrentGame={resetCurrentGame}
      />
    </PlayerMenuWrapper>
  );
};

export default PlayerMenu;
