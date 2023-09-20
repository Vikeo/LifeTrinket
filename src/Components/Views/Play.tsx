import styled from 'styled-components';
import { usePlayers } from '../../Hooks/usePlayers';
import { WakeLock } from '../../Types/WakeLock';
import Counters from '../Counters/Counters';

const MainWrapper = styled.div`
  width: 100vmax;
  height: 100vmin;
  width: 100dvmax;
  height: 100dvmin;
  overflow: hidden;
`;

type PlayProps = {
  gridAreas: string;
  goToStart: () => void;
  wakeLock: WakeLock;
};

const Play = ({ gridAreas, goToStart, wakeLock }: PlayProps) => {
  const { players, updatePlayer } = usePlayers();
  return (
    <MainWrapper>
      <Counters
        players={players}
        onPlayerChange={updatePlayer}
        gridAreas={gridAreas}
        goToStart={goToStart}
        wakeLock={wakeLock}
      />
    </MainWrapper>
  );
};

export default Play;
