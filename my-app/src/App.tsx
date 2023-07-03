import React, { useState } from 'react';
import './App.css';
import Counters from './Components/Counters/Counters';
import styled from 'styled-components';
import { Player } from './Types/Player';

const MainWrapper = styled.div`
  width: 100dvw;
  height: 100dvh;
  overflow: hidden;
  min-width: 254px;
`;

const FullScreenButtonContainer = styled.div`
  display: none;

  @media (orientation: portrait) {
    display: block;
    height: 80px;
    width: 80vw;
    margin: auto;
    position: relative;
  }
`;

const FullscreenButton = styled.button`
  display: none;
  @media (orientation: portrait) {
    display: block;
    height: 100%;
    width: 100%;
  }
`;

const TitleText = styled.h1`
  display: none;
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
  user-select: none;
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

const initialPlayers: Player[] = [
  {
    lifeTotal: 40,
    key: 1,
    color: '#808080',
    settings: {
      useCommanderDamage: true,
      usePartner: false,
      useEnergy: false,
      useExperience: false,
      usePoison: false,
      flipped: true,
    },
  },
  {
    lifeTotal: 40,
    key: 2,
    color: '#F5FFF9',
    settings: {
      useCommanderDamage: true,
      usePartner: false,
      useEnergy: false,
      useExperience: false,
      usePoison: false,
      flipped: true,
    },
  },
  {
    lifeTotal: 40,
    key: 3,
    color: '#FFD601',
    settings: {
      useCommanderDamage: true,
      usePartner: false,
      useEnergy: false,
      useExperience: false,
      usePoison: false,
      flipped: false,
    },
  },
  {
    lifeTotal: 40,
    key: 4,
    color: '#7FFFD3',
    settings: {
      useCommanderDamage: true,
      usePartner: false,
      useEnergy: false,
      useExperience: false,
      usePoison: false,
      flipped: false,
    },
  },
];

function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [players, setPlayers] = useState<Player[]>(initialPlayers);

  const handleFullscreen = () => {
    const element = document.documentElement;

    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      element.requestFullscreen();
    }

    setIsFullscreen(!isFullscreen);
  };

  const handlePlayerChange = (updatedPlayer: Player) => {
    const updatedPlayers = players.map((p) =>
      p.key === updatedPlayer.key ? updatedPlayer : p
    );
    setPlayers(updatedPlayers);
  };

  return (
    <MainWrapper>
      <TitleText>
        You need to be in landscape mode to use this app.
        <hr />
        Pressing the fullscreen button is also very recommended.
      </TitleText>
      <FullScreenButtonContainer>
        <FullscreenButton onClick={handleFullscreen}>
          Toggle Fullscreen
        </FullscreenButton>
      </FullScreenButtonContainer>

      <CountersWrapper>
        <Counters players={players} onPlayerChange={handlePlayerChange} />
      </CountersWrapper>
    </MainWrapper>
  );
}

export default App;
