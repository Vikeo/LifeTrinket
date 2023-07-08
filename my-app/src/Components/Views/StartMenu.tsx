import { useState } from 'react';
import styled from 'styled-components';
import { GridTemplateAreas } from '../../Data/getGridTemplateAreas';
import { InitialSettings } from '../../Data/getInitialPlayers';
import { Player } from '../../Types/Player';

const MainWrapper = styled.div`
  width: 100vmax;
  height: 100vmin;
  overflow: hidden;
`;

type StartProps = {
  setInitialPlayerOptions: (options: InitialSettings) => void;
  setPlayers: (updatedPlayer: Player[]) => void;
};

const Start = ({ setInitialPlayerOptions, setPlayers }: StartProps) => {
  const [playerOptions, setPlayerOptions] = useState<InitialSettings>({
    numberOfPlayers: 4,
    startingLifeTotal: 40,
    useCommanderDamage: true,
    gridAreas: GridTemplateAreas.FourPlayers,
  });
  const handleFourPlayersSet = () => {
    setInitialPlayerOptions(playerOptions);
  };

  return (
    <MainWrapper>
      <button onClick={handleFourPlayersSet}>4 Players</button>
    </MainWrapper>
  );
};

export default Start;
