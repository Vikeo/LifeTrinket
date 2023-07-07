import { Player } from '../../Types/Player';
import LifeCounter from '../LifeCounter/LifeCounter';
import * as S from './Counters.style';

type CountersProps = {
  players: Player[];
  onPlayerChange: (updatedPlayer: Player) => void;
};

const Counters = ({ players, onPlayerChange }: CountersProps) => {
  return (
    <S.CountersWrapper>
      <S.CountersGrid>
        {players.map((player) => {
          if (player.settings.flipped) {
            return (
              <S.GridItemContainerFlipped key={player.key}>
                <LifeCounter
                  backgroundColor={player.color}
                  player={player}
                  opponents={players.filter(
                    (opponent) => opponent.key !== player.key
                  )}
                  onPlayerChange={onPlayerChange}
                />
              </S.GridItemContainerFlipped>
            );
          }
          return (
            <S.GridItemContainer key={player.key}>
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
