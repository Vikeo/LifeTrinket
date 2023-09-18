import { Player } from '../../Types/Player';
import Settings from './Settings';
import styled from 'styled-components';
import { css } from 'styled-components';
import { Rotation } from '../../Types/Player';
import { Button } from '@mui/material';
import { WakeLock } from '../../Types/WakeLock';

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
  onPlayerChange: (updatedPlayer: Player) => void;
  setShowPlayerMenu: (showPlayerMenu: boolean) => void;
  resetCurrentGame: () => void;
  wakeLock: WakeLock;
};

const PlayerMenu = ({
  player,
  opponents,
  onPlayerChange,
  setShowPlayerMenu,
  resetCurrentGame,
  wakeLock,
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
        onChange={onPlayerChange}
        opponents={opponents}
        resetCurrentGame={resetCurrentGame}
        wakeLock={wakeLock}
      />
    </PlayerMenuWrapper>
  );
};

export default PlayerMenu;
