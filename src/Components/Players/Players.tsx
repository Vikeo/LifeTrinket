import { twc } from 'react-twc';
import { useGlobalSettings } from '../../Hooks/useGlobalSettings';
import { usePlayers } from '../../Hooks/usePlayers';
import { Player as PlayerType } from '../../Types/Player';
import { PreStartMode } from '../../Types/Settings';
import LifeCounter from '../LifeCounter/LifeCounter';
import { RoulettePlayerCard } from '../PreStartGame/Games/RandomKing/RoulettePlayerCard';
import { GridLayout } from '../Views/Play';

const getGridArea = (player: PlayerType) => {
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

const PlayersWrapper = twc.div`w-full h-full bg-black`;

export const Players = ({ gridLayout }: { gridLayout: GridLayout }) => {
  const { players } = usePlayers();

  const { playing, settings, preStartCompleted } = useGlobalSettings();

  return (
    <PlayersWrapper>
      <div className={`grid w-full h-full gap-1 box-border ${gridLayout} `}>
        {players.map((player) => {
          const gridArea = getGridArea(player);
          return (
            <div
              key={player.index}
              className={`relative flex justify-center items-center align-middle ${gridArea}`}
            >
              <LifeCounter
                player={player}
                opponents={players.filter(
                  (opponent) => opponent.index !== player.index
                )}
              />

              {settings.preStartMode === PreStartMode.RandomKing &&
                !preStartCompleted &&
                !playing &&
                settings.showStartingPlayer && (
                  <div className="absolute size-full z-20">
                    <RoulettePlayerCard player={player} />
                  </div>
                )}
            </div>
          );
        })}
      </div>
    </PlayersWrapper>
  );
};
