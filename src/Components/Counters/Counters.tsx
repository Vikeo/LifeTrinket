import styled from 'styled-components';
import { usePlayers } from '../../Hooks/usePlayers';
import LifeCounter from '../LifeCounter/LifeCounter';

export const CountersWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
`;

export const CountersGrid = styled.div<{ $gridTemplateAreas: string }>`
  display: grid;
  gap: 4px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
  grid-template-areas: ${({ $gridTemplateAreas }) => $gridTemplateAreas};
`;

export const GridItemContainer = styled.div<{
  $gridArea: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: ${(props) => props.$gridArea};
`;

type CountersProps = {
  gridAreas: string;
};

const Counters = ({ gridAreas }: CountersProps) => {
  const { players } = usePlayers();
  return (
    <CountersWrapper>
      <CountersGrid $gridTemplateAreas={gridAreas}>
        {players.map((player) => {
          return (
            <GridItemContainer
              key={player.index}
              $gridArea={`player${player.index}`}
            >
              <LifeCounter
                player={player}
                opponents={players.filter(
                  (opponent) => opponent.index !== player.index
                )}
              />
            </GridItemContainer>
          );
        })}
      </CountersGrid>
    </CountersWrapper>
  );
};

export default Counters;
