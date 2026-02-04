import { useMemo } from 'react';
import { LifeTrinket } from './Components/LifeTrinket';
import { GlobalSettingsProvider } from './Providers/GlobalSettingsProvider';
import { PlayersProvider } from './Providers/PlayersProvider';
import { getSharedStateFromUrl, clearSharedStateFromUrl } from './Utils/shareState';

const App = () => {
  // Check for shared state in URL during initialization
  // This runs once and doesn't trigger re-renders
  const sharedState = useMemo(() => {
    const shared = getSharedStateFromUrl();

    if (shared) {
      console.log('Shared game state detected, loading...');
      // Clear the hash from URL for cleaner address bar
      clearSharedStateFromUrl();
      return shared;
    }

    return null;
  }, []);

  return (
    <GlobalSettingsProvider sharedState={sharedState}>
      <PlayersProvider sharedState={sharedState}>
        <LifeTrinket />
      </PlayersProvider>
    </GlobalSettingsProvider>
  );
};

export default App;
