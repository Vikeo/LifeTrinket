import { Player } from '../../Types/Player';
import SettingsButton from '../Buttons/SettingsButton';
import LifeCounter from '../LifeCounter/LifeCounter';
import SideLifeCounter from '../LifeCounter/SideLifeCounter';
import * as S from './Counters.style';

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
                  resetCurrentGame={resetCurrentGame}
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
                resetCurrentGame={resetCurrentGame}
              />
            </S.GridItemContainer>
          );
        })}
      </S.CountersGrid>
      {/* <S.SettingsButtonContainer>
        <SettingsButton onClick={() => {}} rotation={0} />
      </S.SettingsButtonContainer> */}
    </S.CountersWrapper>
  );
};

export default Counters;
