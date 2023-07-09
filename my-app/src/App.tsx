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
  const savedGameSettings = localStorage.getItem('initialGameSettings');

  const [initialGameSettings, setInitialGameSettings] =
    useState<InitialSettings | null>(
      savedGameSettings ? JSON.parse(savedGameSettings) : null
    );

  const [players, setPlayers] = useState<Player[]>(
    savedPlayers ? JSON.parse(savedPlayers) : []
  );

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
    localStorage.setItem(
      'initialGameSettings',
      JSON.stringify(initialGameSettings)
    );
  }, [initialGameSettings, players]);

  const handlePlayerChange = (updatedPlayer: Player) => {
    const updatedPlayers = players.map((player) =>
      player.key === updatedPlayer.key ? updatedPlayer : player
    );
    setPlayers(updatedPlayers);
  };

  if (players.length > 0 && initialGameSettings) {
    return (
      <Play
        players={players}
        onPlayerChange={handlePlayerChange}
        gridAreas={initialGameSettings?.gridAreas}
      />
    );
  }

  return (
    <StartMenu
      initialGameSettings={initialGameSettings}
      setInitialGameSettings={setInitialGameSettings}
      setPlayers={setPlayers}
    />
  );
};

export default App;
