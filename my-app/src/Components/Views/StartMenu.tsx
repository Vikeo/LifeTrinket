import styled from 'styled-components';
import { Player } from '../../Types/Player';

const MainWrapper = styled.div`
  width: 100vmax;
  height: 100vmin;
  overflow: hidden;
`;

type StartProps = {
  players: Player[];
  setPlayers: (updatedPlayer: Player[]) => void;
};

const Start = ({ players, setPlayers }: StartProps) => {
  return <MainWrapper></MainWrapper>;
};

export default Start;
