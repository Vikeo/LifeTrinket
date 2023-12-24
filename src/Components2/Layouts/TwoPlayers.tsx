import { Player } from '../../Types/Player';
import LifeCounter from '../../Components/LifeCounter/LifeCounter';
import { useGlobalSettings } from '../../Hooks/useGlobalSettings';
import { getGridArea } from './FourPlayers';

export const TwoPlayers = ({ players }: { players: Player[] }) => {
  const { initialGameSettings } = useGlobalSettings();
  let gridClasses: string;

  switch (initialGameSettings?.orientation) {
    case 'portrait':
      gridClasses = 'grid-areas-twoPlayersOppositePortrait';
      break;
    default:
    case 'side':
      gridClasses = 'grid-areas-twoPlayersSameSideLandscape';
      break;
    case 'landscape':
      gridClasses = 'grid-areas-twoPlayersOppositeLandscape';
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
