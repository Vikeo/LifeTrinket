import styled from 'styled-components';
import Counters from '../Counters/Counters';
import { Player } from '../../Types/Player';

const MainWrapper = styled.div`
  width: 100vmax;
  height: 100vmin;
  overflow: hidden;
`;

type PlayProps = {
  players: Player[];
  onPlayerChange: (updatedPlayer: Player) => void;
  gridAreas: string;
};

const Play = ({ players, onPlayerChange, gridAreas }: PlayProps) => {
  return (
    <MainWrapper>
      <Counters
        players={players}
        onPlayerChange={onPlayerChange}
        gridAreas={gridAreas}
      />
    </MainWrapper>
  );
};

export default Play;
