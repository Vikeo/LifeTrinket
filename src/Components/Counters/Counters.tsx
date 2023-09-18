import { Player } from '../../Types/Player';
import { WakeLock } from '../../Types/WakeLock';
import LifeCounter from '../LifeCounter/LifeCounter';
import styled from 'styled-components';

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

export const SettingsButtonContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
`;

type CountersProps = {
  players: Player[];
  onPlayerChange: (updatedPlayer: Player) => void;
  gridAreas: string;
  goToStart: () => void;
  wakeLock: WakeLock;
};

const Counters = ({
  players,
  onPlayerChange,
  gridAreas,
  goToStart,
  wakeLock,
}: CountersProps) => {
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
                backgroundColor={player.color}
                player={player}
                opponents={players.filter(
                  (opponent) => opponent.index !== player.index
                )}
                onPlayerChange={onPlayerChange}
                goToStart={goToStart}
                wakeLock={wakeLock}
              />
            </GridItemContainer>
          );
        })}
      </CountersGrid>
    </CountersWrapper>
  );
};

export default Counters;
