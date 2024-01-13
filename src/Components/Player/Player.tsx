import LifeCounter from '../LifeCounter/LifeCounter';
import { Player as PlayerType } from '../../Types/Player';
import { twc } from 'react-twc';

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

const PlayerWrapper = twc.div`w-full h-full bg-black`;

export const Player = (players: PlayerType[], gridClasses: string) => {
  return (
    <PlayerWrapper>
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
    </PlayerWrapper>
  );
};
