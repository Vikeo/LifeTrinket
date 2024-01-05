import { ThemeProvider } from '@mui/material';
import { LifeTrinket } from './Components/LifeTrinket';
import { theme } from './Data/theme';
import { GlobalSettingsProvider } from './Providers/GlobalSettingsProvider';
import { PlayersProvider } from './Providers/PlayersProvider';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <PlayersProvider>
        <GlobalSettingsProvider>
          <LifeTrinket />
        </GlobalSettingsProvider>
      </PlayersProvider>
    </ThemeProvider>
  );
};

export default App;
