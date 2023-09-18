import styled from 'styled-components';
import Counters from '../Counters/Counters';
import { Player } from '../../Types/Player';
import { WakeLock } from '../../Types/WakeLock';

const MainWrapper = styled.div`
  width: 100vmax;
  height: 100vmin;
  width: 100dvmax;
  height: 100dvmin;
  overflow: hidden;
`;

type PlayProps = {
  players: Player[];
  onPlayerChange: (updatedPlayer: Player) => void;
  gridAreas: string;
  goToStart: () => void;
  wakeLock: WakeLock;
};

const Play = ({
  players,
  onPlayerChange,
  gridAreas,
  goToStart,
  wakeLock,
}: PlayProps) => {
  return (
    <MainWrapper>
      <Counters
        players={players}
        onPlayerChange={onPlayerChange}
        gridAreas={gridAreas}
        goToStart={goToStart}
        wakeLock={wakeLock}
      />
    </MainWrapper>
  );
};

export default Play;
