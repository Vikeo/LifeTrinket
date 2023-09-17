import { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Play from './Components/Views/Play';
import StartMenu from './Components/Views/StartMenu/StartMenu';
import { InitialSettings } from './Data/getInitialPlayers';
import { Player } from './Types/Player';

import { ThemeProvider } from '@mui/material';
import { theme } from './Data/theme';
import { useAnalytics } from './Hooks/useAnalytics';
import { useWakeLock } from 'react-screen-wake-lock';

const GlobalStyles = createGlobalStyle`
  html,
  body {
    background-color: ${theme.palette.background.default};
  }
  #root {
    touch-action: manipulation;
  }
`;

const StartWrapper = styled.div`
  max-width: fit-content;
  max-height: fit-content;
`;

const PlayWrapper = styled.div`
  max-width: fit-content;
  max-height: fit-content;
  @media (orientation: portrait) {
    rotate: 90deg;
  }
`;

const removeLocalStorage = async () => {
  localStorage.removeItem('initialGameSettings');
  localStorage.removeItem('players');
  localStorage.removeItem('playing');
};

const App = () => {
  const analytics = useAnalytics();
  const savedPlayers = localStorage.getItem('players');
  const savedGameSettings = localStorage.getItem('initialGameSettings');
  const { isSupported, release, released, request, type } = useWakeLock();

  const isActive = released === undefined ? false : !released;

  const wakeLock = {
    isSupported,
    release,
    active: isActive,
    request,
    type,
  };

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

  const resetCurrentGame = async () => {
    const currentPlayers = localStorage.getItem('players');
    if (currentPlayers) {
      analytics.trackEvent('go_to_start', {
        playersBeforeReset: currentPlayers,
      });
    }
    await removeLocalStorage();

    setPlayers([]);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      {players.length > 0 && initialGameSettings ? (
        <PlayWrapper>
          <Play
            players={players}
            onPlayerChange={handlePlayerChange}
            gridAreas={initialGameSettings?.gridAreas}
            resetCurrentGame={resetCurrentGame}
            wakeLock={wakeLock}
          />
        </PlayWrapper>
      ) : (
        <StartWrapper>
          <StartMenu
            initialGameSettings={initialGameSettings}
            setInitialGameSettings={setInitialGameSettings}
            setPlayers={setPlayers}
            wakeLock={wakeLock}
          />
        </StartWrapper>
      )}
    </ThemeProvider>
  );
};

export default App;
