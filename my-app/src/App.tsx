import './App.css';
import Counters from './Components/Counters/Counters';
import styled from 'styled-components';
import { Player } from './Types/Player';
import { useState } from 'react';

const MainWrapper = styled.div`
  width: 100dvw;
  height: 100dvh;
  overflow: hidden;
  min-width: 254px;
`;

const FullScreenButtonContainer = styled.div`
  height: 80px;
  width: 80vw;
  margin: auto;
  position: relative;
`

const FullscreenButton = styled.button`
  display: none;
  @media (orientation: portrait) {
    display: block;
    height: 100%;
    width: 100%;
  }
`;

const TitleText = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
  user-select: none;
  display: none;
  padding: 5rem 1rem 2rem 1rem;

  @media (orientation: portrait) {
    display: block;
  }
`;


const CountersWrapper = styled.div`
  display: flex;
  @media (orientation: portrait) {
    display: none;
  }
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
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreen = () => {
    const element = document.documentElement;

    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      element.requestFullscreen();
    }

    setIsFullscreen(!isFullscreen);
  };

  return (
    <MainWrapper>

      <TitleText>
        You need to be in landscape mode to use this app.
        <hr/>
        Pressing the fullscreen button is also very recommended.
      </TitleText>
            <FullScreenButtonContainer>
                    <FullscreenButton onClick={handleFullscreen}>Toggle Fullscreen
      </FullscreenButton>
      </FullScreenButtonContainer>

      <CountersWrapper>
        <Counters players={players} />
      </CountersWrapper>
    </MainWrapper>
  );
}

export default App;
