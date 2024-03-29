import { usePlayers } from '../../../../Hooks/usePlayers';
import { Player } from '../../../../Types/Player';
import { GridLayout } from '../../../Views/Play';
import { RoulettePlayerCard } from './RoulettePlayerCard';

const getGridArea = (player: Player) => {
  switch (player.index) {
    case 0:
      return 'grid-in-player0';
    case 1:
      return 'grid-in-player1';
    case 2:
      return 'grid-in-player2';
    case 3:
      return 'grid-in-player3';
    case 4:
      return 'grid-in-player4';
    case 5:
      return 'grid-in-player5';
    default:
      throw new Error('Invalid player index');
  }
};

export const RandomKingPlayers = ({
  gridLayout,
}: {
  gridLayout: GridLayout;
}) => {
  const { players } = usePlayers();

  return (
    <div className="w-full h-full bg-black">
      <div className={`grid w-full h-full gap-1 box-border ${gridLayout} `}>
        {players.map((player) => {
          const gridArea = getGridArea(player);
          return (
            <div
              key={player.index}
              className={`flex justify-center items-center align-middle ${gridArea}`}
            >
              <RoulettePlayerCard player={player} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
