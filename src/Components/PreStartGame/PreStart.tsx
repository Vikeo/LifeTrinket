import { useGlobalSettings } from '../../Hooks/useGlobalSettings';
import { PreStartMode } from '../../Types/Settings';
import { GridLayout } from '../Views/Play';
import { FingerGame } from './Games/FingerGame';
import { RandomKingPlayers } from './Games/RandomKing/RandomKingPlayers';
import { RandomKingSelectWrapper } from './Games/RandomKing/RandomKingSelectWrapper';

export const PreStart = ({ gridLayout }: { gridLayout: GridLayout }) => {
  const { settings, randomizingPlayer, goToStart } = useGlobalSettings();

  if (settings.preStartMode === PreStartMode.RandomKing) {
    if (!randomizingPlayer) {
      return null;
    }

    return (
      <>
        <RandomKingSelectWrapper />
        <RandomKingPlayers gridLayout={gridLayout} />
      </>
    );
  }

  if (settings.preStartMode === PreStartMode.FingerGame) {
    return <FingerGame />;
  }

  goToStart();
  return null;
};
