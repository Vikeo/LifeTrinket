import { Player } from '../../Types/Player';
import LifeCounter from '../LifeCounter/LifeCounter';
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
