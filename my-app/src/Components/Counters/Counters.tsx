import { Player } from '../../Types/Player';
import LifeCounter from '../LifeCounter/LifeCounter';
import SideLifeCounter from '../LifeCounter/SideLifeCounter';
import * as S from './Counters.style';

type CountersProps = {
  players: Player[];
  onPlayerChange: (updatedPlayer: Player) => void;
  gridAreas: string;
};

const Counters = ({ players, onPlayerChange, gridAreas }: CountersProps) => {
  return (
    <S.CountersWrapper>
      <S.CountersGrid gridTemplateAreas={gridAreas}>
        {players.map((player) => {
          if (
            player.settings.rotation === 90 ||
            player.settings.rotation === 270
          ) {
            return (
              <S.GridItemContainer
                key={player.key}
                gridArea={`player${player.key}`}
              >
                <SideLifeCounter
                  backgroundColor={player.color}
                  player={player}
                  opponents={players.filter(
                    (opponent) => opponent.key !== player.key
                  )}
                  onPlayerChange={onPlayerChange}
                />
              </S.GridItemContainer>
            );
          }
          return (
            <S.GridItemContainer
              key={player.key}
              gridArea={`player${player.key}`}
            >
              <LifeCounter
                backgroundColor={player.color}
                player={player}
                opponents={players.filter(
                  (opponent) => opponent.key !== player.key
                )}
                onPlayerChange={onPlayerChange}
              />
            </S.GridItemContainer>
          );
        })}
      </S.CountersGrid>
    </S.CountersWrapper>
  );
};

export default Counters;