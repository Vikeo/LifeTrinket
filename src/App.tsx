import { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Play from './Components/Views/Play';
import StartMenu from './Components/Views/StartMenu/StartMenu';
import { InitialSettings } from './Data/getInitialPlayers';
import { Player } from './Types/Player';

import { ThemeProvider } from '@mui/material';
import { theme } from './Data/theme';
import { useAnalytics } from './Data/useAnalytics';

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
  const analytics = useAnalytics();
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
    const currentPlayers = localStorage.getItem('players');
    if (currentPlayers) {
      analytics.trackEvent('go_to_start', {
        playersBeforeReset: currentPlayers,
      });
    }

    setPlayers([]);
    localStorage.removeItem('players');
    localStorage.removeItem('playing');
    localStorage.removeItem('initialGameSettings');
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      {players.length > 0 && initialGameSettings ? (
        <RootWrapper>
          <Play
            players={players}
            onPlayerChange={handlePlayerChange}
            gridAreas={initialGameSettings?.gridAreas}
            resetCurrentGame={resetCurrentGame}
          />
        </RootWrapper>
      ) : (
        <RootWrapper2>
          <StartMenu
            initialGameSettings={initialGameSettings}
            setInitialGameSettings={setInitialGameSettings}
            setPlayers={setPlayers}
          />
        </RootWrapper2>
      )}
    </ThemeProvider>
  );
};

export default App;
