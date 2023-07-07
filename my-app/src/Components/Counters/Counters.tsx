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
          const rotation = player.settings.rotation;

          return (
            <S.GridItemContainer key={player.key} rotation={rotation}>
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
