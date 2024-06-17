import { useGlobalSettings } from '../../Hooks/useGlobalSettings';
import { PreStartMode } from '../../Types/Settings';
import { FingerGame } from './Games/FingerGame';

import { RandomKingRandomizer } from './Games/RandomKing/RandomKingSelectWrapper';
import { Trivia } from './Games/Trivia';

export const PreStart = () => {
  const { settings, randomizingPlayer, goToStart } = useGlobalSettings();

  if (settings.preStartMode === PreStartMode.RandomKing) {
    if (!randomizingPlayer) {
      return null;
    }

    return <RandomKingRandomizer />;
  }

  if (settings.preStartMode === PreStartMode.FingerGame) {
    return <FingerGame />;
  }

  if (settings.preStartMode === PreStartMode.Trivia) {
    return <Trivia />;
  }

  goToStart();
  return null;
};
