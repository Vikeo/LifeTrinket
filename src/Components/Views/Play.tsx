import styled from 'styled-components';
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
};

const Play = ({ gridAreas }: PlayProps) => {
  return (
    <MainWrapper>
      <Counters gridAreas={gridAreas} />
    </MainWrapper>
  );
};

export default Play;
