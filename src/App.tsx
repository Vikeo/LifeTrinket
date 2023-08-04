import { useEffect, useState } from 'react';
import './App.css';
import { Player } from './Types/Player';
import Play from './Components/Views/Play';
import StartMenu from './Components/Views/StartMenu/StartMenu';
import { InitialSettings } from './Data/getInitialPlayers';
import styled, { createGlobalStyle } from 'styled-components/macro';
import { ThemeProvider } from '@mui/material';
import { theme } from './Data/theme';

const GlobalStyles = createGlobalStyle`
  html,
  body {
    background-color: ${theme.palette.background.default};
  }
  #root {
    touch-action: manipulation;
  }
`;

const RootWrapper2 = styled.div`
  max-width: fit-content;
  max-height: fit-content;
`;

const RootWrapper = styled.div`
  max-width: fit-content;
  max-height: fit-content;
  @media (orientation: portrait) {
    rotate: 90deg;
  }
`;

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
      player.index === updatedPlayer.index ? updatedPlayer : player
    );
    setPlayers(updatedPlayers);
  };

  const resetCurrentGame = () => {
    // loop over all players and reset them
    players.forEach((player) => {
      player.commanderDamage.forEach((commanderDamage) => {
        commanderDamage.damageTotal = 0;
        commanderDamage.partnerDamageTotal = 0;
      });
      player.lifeTotal = 40;
      player.extraCounters.forEach((counter) => {
        counter.value = 0;
      });

      handlePlayerChange(player);
    });

    setPlayers([...players]); // ensure to trigger a re-render
  };

  const newGame = () => {
    localStorage.removeItem('players');
    localStorage.removeItem('initialGameSettings');

    window.location.reload();
  };

  if (players.length > 0 && initialGameSettings) {
    // If the user has a key, we need to restart since key is deprecated
    // FIXME: Remove this after a few months
    if (players[0].key) {
      newGame();
    }
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RootWrapper>
          <Play
            players={players}
            onPlayerChange={handlePlayerChange}
            gridAreas={initialGameSettings?.gridAreas}
            resetCurrentGame={resetCurrentGame}
          />
        </RootWrapper>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RootWrapper2>
        <StartMenu
          initialGameSettings={initialGameSettings}
          setInitialGameSettings={setInitialGameSettings}
          setPlayers={setPlayers}
        />
      </RootWrapper2>
    </ThemeProvider>
  );
};

export default App;
