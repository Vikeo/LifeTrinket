import * as S from './PlayerMenu.style';
import { Player } from '../../Types/Player';
import Settings from './Settings';

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
    <S.PlayerMenuWrapper rotation={player.settings.rotation}>
      <S.CloseButton rotation={0} onClick={handleOnClick}>
        Close (X)
      </S.CloseButton>
      <Settings
        player={player}
        onChange={onPlayerChange}
        opponents={opponents}
        resetCurrentGame={resetCurrentGame}
      />
    </S.PlayerMenuWrapper>
  );
};

export default PlayerMenu;
