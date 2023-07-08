import { useEffect, useState } from 'react';
import './App.css';
import { Player } from './Types/Player';
import Play from './Components/Views/Play';
import StartMenu from './Components/Views/StartMenu';
import { InitialSettings } from './Data/getInitialPlayers';
import { GridTemplateAreas } from './Data/getGridTemplateAreas';

export const initialPlayerOptions = {
  numberOfPlayers: 4,
  startingLifeTotal: 40,
  useCommanderDamage: true,
  gridAreas: GridTemplateAreas.FourPlayers,
};

const App = () => {
  const savedPlayers = localStorage.getItem('players');

  const [initialPlayerOptions, setInitialPlayerOptions] =
    useState<InitialSettings | null>(null);

  const [players, setPlayers] = useState<Player[]>(
    savedPlayers ? JSON.parse(savedPlayers) : []
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

  if (players && initialPlayerOptions) {
    return (
      <Play
        players={players}
        onPlayerChange={handlePlayerChange}
        gridAreas={initialPlayerOptions?.gridAreas}
      />
    );
  }

  return (
    <StartMenu
      setInitialPlayerOptions={setInitialPlayerOptions}
      setPlayers={setPlayers}
    />
  );
};

export default App;
