import * as S from './PlayerMenu.style';
import { Player } from '../../Types/Player';
import Settings from './Settings';

type PlayerMenuProps = {
  player: Player;
  opponents: Player[];
  onPlayerChange: (updatedPlayer: Player) => void;
  setShowPlayerMenu: (showPlayerMenu: boolean) => void;
};

const PlayerMenu = ({
  player,
  opponents,
  onPlayerChange,
  setShowPlayerMenu,
}: PlayerMenuProps) => {
  const handleOnClick = () => {
    setShowPlayerMenu(false);
  };

  return (
    <S.PlayerMenuWrapper rotation={player.settings.rotation}>
      <S.Button rotation={0} onClick={handleOnClick}>
        Close (X)
      </S.Button>
      <Settings
        player={player}
        onChange={onPlayerChange}
        opponents={opponents}
      />
    </S.PlayerMenuWrapper>
  );
};

export default PlayerMenu;
