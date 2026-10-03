import { describe, expect, it } from 'vitest';
import { UPDATE_RELOAD_KEY, shouldCheckForUpdate } from './updateBeforeTrack';

const TRACK_HASH = '#track=abc';

describe('shouldCheckForUpdate', () => {
  it('checks when a track link opens the app', () => {
    expect(shouldCheckForUpdate({ hash: TRACK_HASH, serviceWorker: true, reloaded: null })).toBe(true);
  });

  // A normal open keeps today's behavior: update in the background, and use
  // the new version on the next open.
  it('does not check without a track link', () => {
    expect(shouldCheckForUpdate({ hash: '', serviceWorker: true, reloaded: null })).toBe(false);
    expect(shouldCheckForUpdate({ hash: '#share=abc', serviceWorker: true, reloaded: null })).toBe(false);
  });

  it('does not check without service worker support', () => {
    expect(shouldCheckForUpdate({ hash: TRACK_HASH, serviceWorker: false, reloaded: null })).toBe(false);
  });

  // One reload only. A new version that fails to take over must not reload
  // the page forever.
  it('does not check again right after its own reload', () => {
    expect(shouldCheckForUpdate({ hash: TRACK_HASH, serviceWorker: true, reloaded: '1' })).toBe(false);
  });

  it('names the flag it keeps in sessionStorage', () => {
    expect(UPDATE_RELOAD_KEY).toBe('updatedBeforeTrack');
  });
});
