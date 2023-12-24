import { Player } from '../../Types/Player';
import LifeCounter from '../../Components/LifeCounter/LifeCounter';
import { useGlobalSettings } from '../../Hooks/useGlobalSettings';

export const FourPlayers = ({ players }: { players: Player[] }) => {
  const { initialGameSettings } = useGlobalSettings();
  let gridClasses: string;

  switch (initialGameSettings?.orientation) {
    case 'portrait':
      gridClasses = 'grid-areas-fourPlayerPortrait';
      break;
    case 'side':
    case 'landscape':
    default:
      gridClasses = 'grid-areas-fourPlayer';
      break;
  }

  return (
    <div className="w-full h-full bg-black">
      <div className={`grid w-full h-full gap-1 box-border ${gridClasses} `}>
        {players.map((player) => {
          const gridArea = getGridArea(player);

          return (
            <div
              key={player.index}
              className={`flex justify-center items-center align-middle ${gridArea}`}
            >
              <LifeCounter
                player={player}
                opponents={players.filter(
                  (opponent) => opponent.index !== player.index
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const getGridArea = (player: Player) => {
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
