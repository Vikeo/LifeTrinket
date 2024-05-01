import { LifeTrinket } from './Components/LifeTrinket';
import { GlobalSettingsProvider } from './Providers/GlobalSettingsProvider';
import { PlayersProvider } from './Providers/PlayersProvider';

const App = () => {
  return (
    <PlayersProvider>
      <GlobalSettingsProvider>
        <LifeTrinket />
      </GlobalSettingsProvider>
    </PlayersProvider>
  );
};

export default App;
