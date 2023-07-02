import './App.css';
import Counters from './Components/Counters/Counters';
import styled from 'styled-components';
import { Player } from './Types/Player';

const MainWrapper = styled.div`
  width: 100dvw;
  height: 100dvh;
  overflow: hidden;
`;

const players: Player[] = [
  {
    key: 1,
    color: "grey",
    settings: {
      useCommanderDamage: true,
      usePartner: true,
      useEnergy: true,
      useExperience: true,
      usePoison: true,
      flipped: true,
    }
  },
  {
    key: 2,
    color: "mintcream",
    settings: {
      useCommanderDamage: true,
      usePartner: false,
      useEnergy: true,
      useExperience: true,
      usePoison: true,
      flipped: true,
    }
  },
  {
    key: 3,
    color: "gold",
    settings: {
      useCommanderDamage: true,
      usePartner: false,
      useEnergy: true,
      useExperience: true,
      usePoison: true,
      flipped: false,
    }
  },
  {
    key: 4,
    color: "aquamarine",
    settings: {
      useCommanderDamage: true,
      usePartner: true,
      useEnergy: true,
      useExperience: true,
      usePoison: true,
      flipped: false,
    }
  },
];

function App() {
  const handleFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <MainWrapper>
      <button onClick={handleFullscreen}>Toggle Fullscreen</button>
      <Counters players={players} />
    </MainWrapper>
  );
}

export default App;
