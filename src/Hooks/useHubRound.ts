import { useEffect, useState } from 'react';
import { getTrackDatabase } from '../Utils/tracking/trackDb';
import { parseHubNode } from '../Utils/tracking/eventHub';
import type { HubNode } from '../Types/Tracking';

/**
 * The tournament's current round, read from `/hubs/$sessionId`.
 *
 * EventTrinket writes the node each time the organizer pairs a round. This
 * hook only reads it, the same way `useRoundEnd` reads the round clock, and
 * it fails the same way: every problem ends as null and silence. Tracking
 * must never get in the way of the life counter.
 *
 * Null covers: no session id, tracking not configured, no node yet, a node
 * that does not parse or has expired, and a denied read.
 */
export function useHubRound(sessionId: string | null | undefined): HubNode | null {
  const [hub, setHub] = useState<HubNode | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setHub(null);
      return;
    }

    let cancelled = false;
    let off: (() => void) | null = null;

    void (async () => {
      try {
        const db = await getTrackDatabase();
        if (!db || cancelled) {
          return;
        }

        const { ref, onValue } = await import('firebase/database');
        if (cancelled) {
          return;
        }

        off = onValue(
          ref(db, `hubs/${sessionId}`),
          (snap) => {
            if (!cancelled) {
              setHub(parseHubNode(snap.val(), Date.now()));
            }
          },
          (error) => {
            console.warn('Event hub is unavailable:', error);
            if (!cancelled) {
              setHub(null);
            }
          }
        );
      } catch (error) {
        console.warn('Event hub is unavailable:', error);
      }
    })();

    return () => {
      cancelled = true;
      // Wrapped for the reason `useRoundEnd` gives: a throw in a cleanup
      // reaches React's unmount, which tracking may never do to the counter.
      try {
        off?.();
      } catch (error) {
        console.warn('Event hub cleanup failed:', error);
      }
    };
  }, [sessionId]);

  return hub;
}
