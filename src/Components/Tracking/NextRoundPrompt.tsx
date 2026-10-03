import { useState } from 'react';
import { useGlobalSettings } from '../../Hooks/useGlobalSettings';
import { useHubRound } from '../../Hooks/useHubRound';
import { eventHubUrl, planNextRoundPrompt } from '../../Utils/tracking/eventHub';

/**
 * Asks the players to go back to the event when the organizer pairs the
 * next round. It shows only during a tracked game whose link names an event.
 * After a reset, the start menu has its own "BACK TO EVENT" button.
 *
 * "Not now" holds for that round only, and only in this tab. The "Back to
 * event" button in the player menu stays either way.
 */
export const NextRoundPrompt = () => {
  const { trackedGameId, trackedRoundId } = useGlobalSettings();
  const hub = useHubRound(trackedRoundId);
  const [dismissedRound, setDismissedRound] = useState<number | null>(null);

  const prompt = planNextRoundPrompt({ hub, gameId: trackedGameId, dismissedRound });

  if (!prompt || !trackedRoundId) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="next-round-title"
      className="absolute inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-sm pointer-events-auto"
    >
      <div className="flex flex-col items-center gap-4 px-8 max-w-xs text-center">
        <span id="next-round-title" className="text-white text-3xl font-bold drop-shadow-lg">
          Round {prompt.round} is paired
        </span>
        <span className="text-white/80 text-sm leading-relaxed">
          Go back to the event to find your next table.
        </span>
        <a
          href={eventHubUrl(trackedRoundId)}
          className="w-full rounded-md bg-primary-main px-4 py-2 font-bold text-text-primary shadow-[1px_2px_4px_0px_rgba(0,0,0,0.3)] hover:bg-primary-dark"
        >
          Go to event
        </a>
        <button
          onClick={() => setDismissedRound(prompt.round)}
          className="text-white/70 text-sm underline underline-offset-4"
        >
          Not now
        </button>
      </div>
    </div>
  );
};
