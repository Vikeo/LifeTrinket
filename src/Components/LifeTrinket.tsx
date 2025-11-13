import { useEffect, useState } from 'react';
import { twc } from 'react-twc';
import { useGlobalSettings } from '../Hooks/useGlobalSettings';
import { importGameState } from '../Utils/gameStateSharing';
import { Play } from './Views/Play';
import StartMenu from './Views/StartMenu/StartMenu';

const StartWrapper = twc.div`max-w-fit max-h-fit`;

const PlayWrapper = twc.div`relative z-0 max-w-fit max-h-fit portrait:rotate-90`;

const EmergencyResetButton = () => {
  const { goToStart } = useGlobalSettings();

  const EmergencyResetButton = twc.button`w-[100dvmax] h-[100dvmin] absolute top-0 z-[-1] bg-background-default`;
  const Paragraph = twc.p`text-[4vmax] text-text-secondary`;

  return (
    <EmergencyResetButton onClick={goToStart}>
      <Paragraph>If you can see this, something is wrong.</Paragraph>
      <Paragraph>Press screen to go to start.</Paragraph>
      <br />
      <Paragraph>If the issue persists, please inform me.</Paragraph>
    </EmergencyResetButton>
  );
};

export const LifeTrinket = () => {
  const { showPlay, initialGameSettings } = useGlobalSettings();

  // Check for query parameter immediately on every render
  const urlParams = new URLSearchParams(window.location.search);
  const gameStateParam = urlParams.get('gameStateToLoad');

  const [showImportDialog, setShowImportDialog] = useState(!!gameStateParam);
  const [importSuccess, setImportSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    // Update dialog visibility if query parameter changes
    if (gameStateParam && !showImportDialog) {
      setShowImportDialog(true);
    }
  }, [gameStateParam, showImportDialog]);

  const handleImportConfirm = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const gameStateParam = urlParams.get('gameStateToLoad');

    if (gameStateParam) {
      // Import game state to localStorage
      const success = importGameState(gameStateParam);

      if (success) {
        // Remove query parameter and reload the page
        // This ensures providers pick up the new localStorage values
        window.location.href =
          window.location.origin + window.location.pathname;
      } else {
        // Show error and remove query parameter
        setImportSuccess(false);
        window.history.replaceState({}, '', window.location.pathname);
        setShowImportDialog(false);
      }
    }
  };

  const handleImportCancel = () => {
    // Remove the query parameter from URL
    const newUrl = window.location.pathname;
    window.history.replaceState({}, '', newUrl);
    setShowImportDialog(false);
  };

  // If import dialog is shown, only render the dialog and nothing else
  if (showImportDialog) {
    return (
      <div className="fixed inset-0 bg-background-backdrop backdrop-blur-sm z-[9999] flex items-center justify-center">
        <div className="bg-background-default rounded-2xl p-8 max-w-md mx-4">
          <h2 className="text-2xl text-text-primary font-bold mb-4 text-center">
            Load Shared Game?
          </h2>
          <p className="text-text-secondary mb-6 text-center">
            A shared game state has been detected. Would you like to load it?
            This will replace your current game state.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleImportCancel}
              className="px-4 py-2 bg-secondary-main text-text-primary rounded-md font-semibold hover:bg-secondary-dark transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleImportConfirm}
              className="px-4 py-2 bg-primary-main text-text-primary rounded-md font-semibold hover:bg-primary-dark transition-colors"
            >
              Load Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {importSuccess === false && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-md z-[9999]">
          Failed to load game state. The link may be corrupted.
        </div>
      )}

      {showPlay && initialGameSettings ? (
        <PlayWrapper>
          <Play />
          <EmergencyResetButton />
        </PlayWrapper>
      ) : (
        <StartWrapper>
          <StartMenu />
        </StartWrapper>
      )}
    </>
  );
};
