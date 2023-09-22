import { createGlobalStyle } from 'styled-components';
import { ThemeProvider } from '@mui/material';
import { LifeTrinket } from './Components/LifeTrinket';
import { theme } from './Data/theme';
import { GlobalSettingsProvider } from './Providers/GlobalSettingsProvider';
import { PlayersProvider } from './Providers/PlayersProvider';

const GlobalStyles = createGlobalStyle`
  html,
  body {
    background-color: ${theme.palette.background.default};
  }
  #root {
    touch-action: manipulation;
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <PlayersProvider>
        <GlobalSettingsProvider>
          <LifeTrinket />
        </GlobalSettingsProvider>
      </PlayersProvider>
    </ThemeProvider>
  );
};

export default App;
