import React from 'react';
import * as S from './PlayerMenu.style';
import { Player } from '../../Types/Player';
import Settings from './Settings';

type PlayerMenuProps = {
  player: Player;
  onPlayerChange: (updatedPlayer: Player) => void;
  setShowPlayerMenu: (showPlayerMenu: boolean) => void;
};

const PlayerMenu = ({
  player,
  onPlayerChange,
  setShowPlayerMenu,
}: PlayerMenuProps) => {
  const handleOnClick = () => {
    setShowPlayerMenu(false);
  };
  return (
    <S.PlayerMenuWrapper>
      <button onClick={handleOnClick}>Close</button>
      <Settings player={player} onChange={onPlayerChange} />
    </S.PlayerMenuWrapper>
  );
};

export default PlayerMenu;
