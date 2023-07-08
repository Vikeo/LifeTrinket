import { useEffect, useState } from 'react';
import './App.css';
import { Player } from './Types/Player';
import { createInitialPlayers } from './Data/getInitialPlayers';
import Play from './Components/Views/Play';
import { GridTemplateAreas } from './Data/getGridTemplateAreas';

export const initialPlayerOptions = {
  numberOfPlayers: 4,
  startingLifeTotal: 40,
  useCommanderDamage: true,
  gridAreas: GridTemplateAreas.FourPlayers,
};

const App = () => {
  const savedPlayers = localStorage.getItem('players');

  const [players, setPlayers] = useState<Player[]>(
    savedPlayers
      ? JSON.parse(savedPlayers)
      : createInitialPlayers(initialPlayerOptions)
  );

  const [gridAreas, setGridAreas] = useState(initialPlayerOptions.gridAreas);

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

  const handlePlayerChange = (updatedPlayer: Player) => {
    const updatedPlayers = players.map((player) =>
      player.key === updatedPlayer.key ? updatedPlayer : player
    );
    setPlayers(updatedPlayers);
  };

  if (players) {
    return (
      <Play
        players={players}
        onPlayerChange={handlePlayerChange}
        gridAreas={gridAreas}
      />
    );
  }

  return (
    <Play
      players={players}
      onPlayerChange={handlePlayerChange}
      gridAreas={gridAreas}
    />
  );
};

export default App;
