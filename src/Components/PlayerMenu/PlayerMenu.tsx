import { Button } from '@mui/material';
import styled, { css } from 'styled-components';
import { Player, Rotation } from '../../Types/Player';
import Settings from './Settings';

const PlayerMenuWrapper = styled.div<{
  $rotation: Rotation;
}>`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(20, 20, 20, 0.9);
  align-items: center;
  justify-content: center;
  z-index: 2;
  ${(props) => {
    if (
      props.$rotation === Rotation.SideFlipped ||
      props.$rotation === Rotation.Side
    ) {
      return;
    }
    return css`
      rotate: ${props.$rotation}deg;
    `;
  }};
`;

const CloseButton = styled.div<{
  $rotation: Rotation;
}>`
  position: absolute;
  top: 15%;
  right: 5%;
  z-index: 9999;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;

  ${(props) => {
    if (props.$rotation === Rotation.Side) {
      return css`
        rotate: ${props.$rotation - 180}deg;
        top: 5%;
        right: auto;
        left: 5%;
      `;
    } else if (props.$rotation === Rotation.SideFlipped) {
      return css`
        rotate: ${props.$rotation - 180}deg;
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
  setShowPlayerMenu: (showPlayerMenu: boolean) => void;
};

const PlayerMenu = ({
  player,
  opponents,
  setShowPlayerMenu,
}: PlayerMenuProps) => {
  const handleOnClick = () => {
    setShowPlayerMenu(false);
  };

  return (
    <PlayerMenuWrapper $rotation={player.settings.rotation}>
      <CloseButton $rotation={player.settings.rotation}>
        <Button
          style={{
            padding: '0 8px',
            minWidth: '0',
          }}
          variant="outlined"
          onClick={handleOnClick}
        >
          X
        </Button>
      </CloseButton>
      <Settings
        player={player}
        opponents={opponents}
        setShowPlayerMenu={setShowPlayerMenu}
      />
    </PlayerMenuWrapper>
  );
};

export default PlayerMenu;
