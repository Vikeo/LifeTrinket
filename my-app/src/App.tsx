import { useEffect, useState } from 'react';
import './App.css';
import { Player } from './Types/Player';
import { initialPlayers } from './Data/getInitialPlayers';
import Play from './Components/Views/Play';

const App = () => {
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

  return <Play players={players} onPlayerChange={handlePlayerChange} />;
};

export default App;
