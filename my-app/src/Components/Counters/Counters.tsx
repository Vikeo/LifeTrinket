import { Player } from '../../Types/Player';
import LifeCounter from '../LifeCounter/LifeCounter';
import SideLifeCounter from '../LifeCounter/SideLifeCounter';
import styled from 'styled-components';

export const CountersWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
`;

export const CountersGrid = styled.div<{ gridTemplateAreas: string }>`
  display: grid;
  gap: 4px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
  grid-template-areas: ${({ gridTemplateAreas }) => gridTemplateAreas};
`;

export const GridItemContainer = styled.div<{
  gridArea: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: ${(props) => props.gridArea};
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
  resetCurrentGame: () => void;
};

const Counters = ({
  players,
  onPlayerChange,
  gridAreas,
  resetCurrentGame,
}: CountersProps) => {
  return (
    <CountersWrapper>
      <CountersGrid gridTemplateAreas={gridAreas}>
        {players.map((player) => {
          if (
            player.settings.rotation === 90 ||
            player.settings.rotation === 270
          ) {
            return (
              <GridItemContainer
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
                  resetCurrentGame={resetCurrentGame}
                />
              </GridItemContainer>
            );
          }
          return (
            <GridItemContainer
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
                resetCurrentGame={resetCurrentGame}
              />
            </GridItemContainer>
          );
        })}
      </CountersGrid>
      {/* <S.SettingsButtonContainer>
        <SettingsButton onClick={() => {}} rotation={0} />
      </S.SettingsButtonContainer> */}
    </CountersWrapper>
  );
};

export default Counters;
