import { TRACK_HASH_PREFIX } from './trackLink';

/**
 * Makes a game that EventTrinket opens run on the newest LifeTrinket.
 *
 * The service worker serves its stored copy of the app at once, and checks
 * for a new version in the background. `skipWaiting` and `clientsClaim` let
 * a new version take over at once, but the page that is already running
 * keeps the old code until the next load. So the first open after a release
 * ran the old version. For a tracked game that matters: the tournament
 * features change with LifeTrinket and EventTrinket together.
 *
 * So a load with a track link asks for the newest version first, and
 * reloads once if one takes over. Every other load keeps the old behavior.
 */

/** Set in sessionStorage before the one reload, so there is never a second. */
export const UPDATE_RELOAD_KEY = 'updatedBeforeTrack';

/**
 * How long a load waits for a new version. Past this, the game opens on the
 * version it has: a slow network must never keep a player from the counter.
 */
export const UPDATE_WAIT_MS = 3000;

export function shouldCheckForUpdate({
  hash,
  serviceWorker,
  reloaded,
}: {
  hash: string;
  serviceWorker: boolean;
  /** The value under `UPDATE_RELOAD_KEY`, or null. */
  reloaded: string | null;
}): boolean {
  return serviceWorker && hash.startsWith(TRACK_HASH_PREFIX) && reloaded === null;
}

/**
 * Resolves true when a new version took over this page. The caller reloads.
 *
 * Every failure resolves false: no registration (a first visit), no network,
 * no new version, or no answer in time. Nothing here may reject, because the
 * life counter renders after it.
 */
async function newVersionTookOver(): Promise<boolean> {
  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) {
      return false;
    }

    const tookOver = new Promise<boolean>((resolve) => {
      navigator.serviceWorker.addEventListener('controllerchange', () => resolve(true), {
        once: true,
      });
      setTimeout(() => resolve(false), UPDATE_WAIT_MS);
    });

    await registration.update();

    // No new worker on its way means there is nothing to wait for. This is
    // the common case, and it costs one request for sw.js.
    if (!registration.installing && !registration.waiting) {
      return false;
    }

    return await tookOver;
  } catch (error) {
    console.warn('Update check before a tracked game failed:', error);
    return false;
  }
}

/**
 * Resolves true when the page is reloading onto a new version, and the
 * caller must not render. Resolves false when the caller renders as normal.
 */
export async function updateBeforeTrackedGame(): Promise<boolean> {
  let reloaded: string | null = null;
  try {
    reloaded = sessionStorage.getItem(UPDATE_RELOAD_KEY);
    // Cleared at once, so the next tracked game in this tab checks again.
    sessionStorage.removeItem(UPDATE_RELOAD_KEY);
  } catch {
    // No sessionStorage. Then no check either, because the reload guard
    // depends on it.
    return false;
  }

  if (
    !shouldCheckForUpdate({
      hash: window.location.hash,
      serviceWorker: 'serviceWorker' in navigator,
      reloaded,
    })
  ) {
    return false;
  }

  if (!(await newVersionTookOver())) {
    return false;
  }

  sessionStorage.setItem(UPDATE_RELOAD_KEY, '1');
  // The address keeps its `#track=` link, so the new version opens the same
  // game.
  window.location.reload();
  return true;
}
