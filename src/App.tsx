import { useEffect, useMemo } from 'react';
import { LifeTrinket } from './Components/LifeTrinket';
import { GlobalSettingsProvider } from './Providers/GlobalSettingsProvider';
import { PlayersProvider } from './Providers/PlayersProvider';
import {
  getSharedStateFromUrl,
  clearSharedStateFromUrl,
} from './Utils/shareState';
import {
  clearStoredTrackLink,
  clearTrackLinkFromUrl,
  storeTrackLink,
  type TrackEntry,
} from './Utils/tracking/trackLink';
import { planEventHub, storeEventHub } from './Utils/tracking/eventHub';

const App = ({
  /**
   * A track link starts a game that publishes life totals to EventTrinket.
   * `isNew` separates the two ways a link arrives. A link for a game that is
   * not already being tracked builds a fresh table. A link restored from
   * localStorage, or a re-scan of the game in progress, only resumes the
   * publishing, so a reopened tab keeps the life totals it had.
   *
   * It arrives as a prop because `main.tsx` has to know the answer before
   * React renders: that is where the previous game's keys are cleared, and
   * clearing has to happen before any provider seeds its state from them.
   * Reading it there also keeps it out of a render pass, which StrictMode
   * runs twice -- see `readTrackEntry`'s doc comment.
   */
  trackEntry,
}: {
  trackEntry: TrackEntry | null;
}) => {
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

  useEffect(() => {
    // A link keeps a game tracked across a reload. No link means there is
    // nothing to keep, and anything left under that key is a value that no
    // longer validates.
    if (trackEntry) {
      storeTrackLink(trackEntry.link);
      // The way back to the event. It outlives the tracked game, which
      // "Reset game" clears. A link with no event leaves an earlier event
      // where it is.
      const hub = planEventHub(trackEntry.link, Date.now());
      if (hub) {
        storeEventHub(hub);
      }
    } else {
      clearStoredTrackLink();
    }
    // Clears any `#track=` hash, a bad one included, and leaves other hashes
    // alone. A link that never decodes must not stick to the URL.
    clearTrackLinkFromUrl();
  }, [trackEntry]);

  return (
    <GlobalSettingsProvider
      sharedState={sharedState}
      trackLink={trackEntry?.link ?? null}
    >
      <PlayersProvider
        sharedState={sharedState}
        newTrackLink={trackEntry?.isNew ? trackEntry.link : null}
      >
        <LifeTrinket />
      </PlayersProvider>
    </GlobalSettingsProvider>
  );
};

export default App;
