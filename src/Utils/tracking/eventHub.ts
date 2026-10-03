import { z } from 'zod';
import { TRACK_ID_LENGTH, type TrackLink } from '../../Types/Tracking';

/**
 * EventTrinket's public address, for the way back to the event.
 *
 * Set `VITE_EVENTTRINKET_URL` in `.env.local` to point at an EventTrinket dev
 * server. `.env.production` carries the same value as this fallback, and a
 * test asserts that the two agree.
 */
export const EVENTTRINKET_URL =
  import.meta.env.VITE_EVENTTRINKET_URL ?? 'https://eventtrinket.com/';

/** Where the event this device last played in waits for the way back. */
export const EVENT_HUB_KEY = 'eventHub';

/**
 * How long the way back stays. An event that is over by then has nothing to
 * go back to, and EventTrinket's database drops its hub after about as long.
 */
export const EVENT_HUB_MAX_AGE_MS = 12 * 60 * 60 * 1000;

const eventHubSchema = z.object({
  r: z.string().length(TRACK_ID_LENGTH),
  exp: z.number(),
});

export type EventHub = z.infer<typeof eventHubSchema>;

/**
 * The event a track link belongs to, or null for a link that names none.
 *
 * The link's `r` is the tournament session, and the hub lives at that same
 * id, so the link needs no field of its own for the way back.
 */
export function planEventHub(link: TrackLink, now: number): EventHub | null {
  return link.r ? { r: link.r, exp: now + EVENT_HUB_MAX_AGE_MS } : null;
}

const noStorage = { getItem: () => null, setItem: () => {} };

/**
 * The event to go back to, or null. Reads only, so a render can call it.
 *
 * The value lives under its own key, apart from `trackedGame`, because
 * "Reset game" clears the tracked game. The player wants the way back most
 * at exactly that moment.
 */
export function readEventHub(
  storage: Pick<Storage, 'getItem'> = typeof localStorage === 'undefined'
    ? noStorage
    : localStorage,
  now: number = Date.now()
): EventHub | null {
  const saved = storage.getItem(EVENT_HUB_KEY);
  if (!saved) {
    return null;
  }
  try {
    const parsed = eventHubSchema.safeParse(JSON.parse(saved));
    return parsed.success && parsed.data.exp >= now ? parsed.data : null;
  } catch {
    return null;
  }
}

export function storeEventHub(
  hub: EventHub,
  storage: Pick<Storage, 'setItem'> = typeof localStorage === 'undefined'
    ? noStorage
    : localStorage
): void {
  storage.setItem(EVENT_HUB_KEY, JSON.stringify(hub));
}

/** The hub page in EventTrinket that lists the round's pairings. */
export function eventHubUrl(sessionId: string, base: string = EVENTTRINKET_URL): string {
  return `${base.replace(/\/+$/, '')}/hub/${sessionId}`;
}
