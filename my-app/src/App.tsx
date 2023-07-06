import React, { useEffect, useState } from 'react';
import './App.css';
import Counters from './Components/Counters/Counters';
import styled from 'styled-components';
import { Player } from './Types/Player';
import { initialPlayers } from './Data/initialPlayers';

const MainWrapper = styled.div`
  width: 100vmax;
  height: 100vmin;
  overflow: hidden;
`;

const CountersWrapper = styled.div`
  display: flex;
`;

function App() {
  const savedPlayers = localStorage.getItem('players');

  const [players, setPlayers] = useState<Player[]>(
    savedPlayers ? JSON.parse(savedPlayers) : initialPlayers
  );

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

  const handlePlayerChange = (updatedPlayer: Player) => {
    const updatedPlayers = players.map((player) =>
      player.key === updatedPlayer.key ? updatedPlayer : player
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
