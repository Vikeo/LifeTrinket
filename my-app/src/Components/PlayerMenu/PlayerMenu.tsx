import React from 'react';
import * as S from './PlayerMenu.style';
import { Player } from '../../Types/Player';
import Settings from './Settings';

type PlayerMenuProps = {
  player: Player;
  onPlayerChange: (updatedPlayer: Player) => void;
};

const PlayerMenu = ({ player, onPlayerChange }: PlayerMenuProps) => {
  return (
    <S.PlayerMenuWrapper>
      <Settings player={player} onChange={onPlayerChange} />
    </S.PlayerMenuWrapper>
  );
};

export default PlayerMenu;
