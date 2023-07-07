import styled from 'styled-components';
import Counters from '../Counters/Counters';
import { Player } from '../../Types/Player';

const MainWrapper = styled.div`
  width: 100vmax;
  height: 100vmin;
  overflow: hidden;
`;

const CountersWrapper = styled.div`
  display: flex;
`;

type PlayProps = {
  players: Player[];
  onPlayerChange: (updatedPlayer: Player) => void;
};

const Play = ({ players, onPlayerChange }: PlayProps) => {
  return (
    <MainWrapper>
      <CountersWrapper>
        <Counters players={players} onPlayerChange={onPlayerChange} />
      </CountersWrapper>
    </MainWrapper>
  );
};

export default Play;
