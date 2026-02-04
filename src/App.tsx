import { useState, useEffect } from 'react';
import { LifeTrinket } from './Components/LifeTrinket';
import { GlobalSettingsProvider } from './Providers/GlobalSettingsProvider';
import { PlayersProvider } from './Providers/PlayersProvider';
import { getSharedStateFromUrl, clearSharedStateFromUrl } from './Utils/shareState';
import type { SharedGameState } from './Types/SharedState';

const App = () => {
  const [sharedState, setSharedState] = useState<SharedGameState | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Check for shared state in URL during initialization
  useEffect(() => {
    const loadSharedState = async () => {
      // Check if there's a share link in the URL
      const hash = window.location.hash;
      const hasShareLink = hash.startsWith('#s=') || hash.startsWith('#game=');

      try {
        const shared = await getSharedStateFromUrl();

        if (shared) {
          console.log('Shared game state detected, loading...');
          // Clear the hash from URL for cleaner address bar
          clearSharedStateFromUrl();
          setSharedState(shared);
        } else if (hasShareLink) {
          // Link was present but failed to load (expired or invalid)
          setLoadError('This share link has expired or is invalid. Links expire after 30 minutes.');
          clearSharedStateFromUrl();
        }
      } catch (error) {
        console.error('Failed to load shared game state:', error);
        if (hasShareLink) {
          setLoadError('Failed to load shared game. Please try again or request a new link.');
          clearSharedStateFromUrl();
        }
      } finally {
        setLoading(false);
      }
    };

    loadSharedState();
  }, []);

  // Show loading state while checking for shared game
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-default">
        <div className="flex flex-col items-center gap-4">
          <svg
            className="animate-spin h-12 w-12 text-primary-main"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-text-primary">Loading shared game...</p>
        </div>
      </div>
    );
  }

  // Show error state if shared link failed to load
  if (loadError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-default p-4">
        <div className="flex flex-col items-center gap-4 max-w-md">
          <svg
            className="w-16 h-16 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-center">
            <h2 className="text-xl font-bold text-text-primary mb-2">
              Link Expired
            </h2>
            <p className="text-text-secondary mb-4">{loadError}</p>
            <button
              onClick={() => {
                setLoadError(null);
                window.location.hash = '';
              }}
              className="px-6 py-2 bg-primary-main text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Go to Start Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <GlobalSettingsProvider sharedState={sharedState}>
      <PlayersProvider sharedState={sharedState}>
        <LifeTrinket />
      </PlayersProvider>
    </GlobalSettingsProvider>
  );
};

export default App;
