import React, { useState } from 'react';
import './App.css';
import Counters from './Components/Counters/Counters';
import styled from 'styled-components';
import { Player } from './Types/Player';

const MainWrapper = styled.div`
  width: 100vmax;
  height: 100vmin;
  overflow: hidden;
`;

const CountersWrapper = styled.div`
  display: flex;
`;

const initialPlayers: Player[] = [
  {
    lifeTotal: 40,
    key: 1,
    color: '#9c9a9a',
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
  const [players, setPlayers] = useState<Player[]>(initialPlayers);

  const handlePlayerChange = (updatedPlayer: Player) => {
    const updatedPlayers = players.map((p) =>
      p.key === updatedPlayer.key ? updatedPlayer : p
    );
    setPlayers(updatedPlayers);
  };

  return (
    <MainWrapper>
      <CountersWrapper>
        <Counters players={players} onPlayerChange={handlePlayerChange} />
      </CountersWrapper>
    </MainWrapper>
  );
}

export default App;
