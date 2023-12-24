import styled from 'styled-components';
import { usePlayers } from '../../Hooks/usePlayers';
import { TwoPlayers } from '../Layouts/TwoPlayers';
import { FourPlayers } from '../Layouts/FourPlayers';

const MainWrapper = styled.div`
  width: 100vmax;
  height: 100vmin;
  width: 100dvmax;
  height: 100dvmin;
  overflow: hidden;
`;

const Play2 = () => {
  const { players } = usePlayers();

  let Layout: JSX.Element;
  switch (players.length) {
    case 1:
      Layout = <FourPlayers players={players} />;
      break;
    case 2:
      Layout = <TwoPlayers players={players} />;
      break;
    case 3:
      Layout = <FourPlayers players={players} />;
      break;
    default:
    case 4:
      Layout = <FourPlayers players={players} />;
      break;
    case 5:
      Layout = <FourPlayers players={players} />;
      break;
    case 6:
      Layout = <FourPlayers players={players} />;
      break;
  }

  return <MainWrapper>{Layout}</MainWrapper>;
};

export default Play2;
