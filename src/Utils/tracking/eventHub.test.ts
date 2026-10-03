import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  EVENTTRINKET_URL,
  EVENT_HUB_KEY,
  EVENT_HUB_MAX_AGE_MS,
  eventHubUrl,
  parseHubNode,
  planEventHub,
  planNextRoundPrompt,
  readEventHub,
  storeEventHub,
} from './eventHub';
import { GAME_SCOPED_KEYS, keysToClearOnGoToStart } from '../storageScope';
import type { TrackLink } from '../../Types/Tracking';

const SESSION = 'SSSSSSSSSSTTTTTTTTTT';
const NOW = 1_800_000_000_000;

const link: TrackLink = {
  v: 1,
  id: 'AAAAAAAAAABBBBBBBBBB',
  seats: ['Anna', 'Bo'],
  r: SESSION,
};

const memoryStorage = (entries: Record<string, string> = {}) => {
  const store = { ...entries };
  return {
    store,
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
  };
};

describe('planEventHub', () => {
  it('remembers the event a track link names', () => {
    expect(planEventHub(link, NOW)).toEqual({
      r: SESSION,
      exp: NOW + EVENT_HUB_MAX_AGE_MS,
    });
  });

  it('remembers nothing for a link with no event', () => {
    expect(planEventHub({ ...link, r: undefined }, NOW)).toBeNull();
  });
});

describe('readEventHub', () => {
  it('reads back what was stored', () => {
    const storage = memoryStorage();
    storeEventHub({ r: SESSION, exp: NOW + 1000 }, storage);

    expect(readEventHub(storage, NOW)).toEqual({ r: SESSION, exp: NOW + 1000 });
  });

  it('a later event replaces an earlier one', () => {
    const storage = memoryStorage();
    storeEventHub({ r: SESSION, exp: NOW + 1000 }, storage);
    storeEventHub({ r: 'XXXXXXXXXXYYYYYYYYYY', exp: NOW + 1000 }, storage);

    expect(readEventHub(storage, NOW)?.r).toBe('XXXXXXXXXXYYYYYYYYYY');
  });

  it('reads an expired event as none', () => {
    const storage = memoryStorage();
    storeEventHub({ r: SESSION, exp: NOW - 1 }, storage);

    expect(readEventHub(storage, NOW)).toBeNull();
  });

  it('reads a malformed value as none instead of throwing', () => {
    expect(readEventHub(memoryStorage({ [EVENT_HUB_KEY]: 'not json' }), NOW)).toBeNull();
    expect(readEventHub(memoryStorage({ [EVENT_HUB_KEY]: '{"r":"short","exp":1}' }), NOW)).toBeNull();
    expect(readEventHub(memoryStorage(), NOW)).toBeNull();
  });
});

describe('the way back survives the end of a game', () => {
  // "Reset game" and the start menu clear the game. The player still needs
  // the way back to the event after either one.
  it('is not cleared with the game', () => {
    expect(GAME_SCOPED_KEYS).not.toContain(EVENT_HUB_KEY);
    expect(keysToClearOnGoToStart()).not.toContain(EVENT_HUB_KEY);
  });
});

describe('eventHubUrl', () => {
  it('names the hub on the public address', () => {
    expect(eventHubUrl(SESSION)).toBe(`https://eventtrinket.com/hub/${SESSION}`);
  });

  it('joins a base without a trailing slash', () => {
    expect(eventHubUrl(SESSION, 'http://localhost:5174')).toBe(
      `http://localhost:5174/hub/${SESSION}`
    );
  });
});

describe('the shipped .env.production', () => {
  const env = readFileSync(new URL('../../../.env.production', import.meta.url), 'utf8');
  const value = (key: string) =>
    env.split('\n').find((line) => line.startsWith(`${key}=`))?.slice(key.length + 1) ?? null;

  it('sends a player back to eventtrinket.com', () => {
    expect(value('VITE_EVENTTRINKET_URL')).toBe('https://eventtrinket.com/');
  });

  it('agrees with the fallback in eventHub.ts', () => {
    expect(value('VITE_EVENTTRINKET_URL')).toBe(EVENTTRINKET_URL);
  });
});

describe('planNextRoundPrompt', () => {
  const GAME = 'AAAAAAAAAABBBBBBBBBB';
  const hub = (round: number, ids: string[]) => ({
    v: 1 as const,
    round,
    exp: NOW + 1000,
    p: ids.map((id) => ({ a: 'Anna', b: 'Bo', id })),
  });

  it('asks nothing while this game is in the current round', () => {
    expect(planNextRoundPrompt({ hub: hub(1, [GAME]), gameId: GAME, dismissedRound: null })).toBeNull();
  });

  it('asks once the round no longer holds this game', () => {
    expect(
      planNextRoundPrompt({ hub: hub(2, ['XXXXXXXXXXYYYYYYYYYY']), gameId: GAME, dismissedRound: null })
    ).toEqual({ round: 2 });
  });

  it('asks nothing again for a round the player said not now to', () => {
    expect(
      planNextRoundPrompt({ hub: hub(2, ['XXXXXXXXXXYYYYYYYYYY']), gameId: GAME, dismissedRound: 2 })
    ).toBeNull();
  });

  it('asks again for the round after that', () => {
    expect(
      planNextRoundPrompt({ hub: hub(3, ['XXXXXXXXXXYYYYYYYYYY']), gameId: GAME, dismissedRound: 2 })
    ).toEqual({ round: 3 });
  });

  it('asks nothing without a hub or without a game', () => {
    expect(planNextRoundPrompt({ hub: null, gameId: GAME, dismissedRound: null })).toBeNull();
    expect(planNextRoundPrompt({ hub: hub(2, []), gameId: null, dismissedRound: null })).toBeNull();
  });
});

describe('parseHubNode', () => {
  const valid = { v: 1, round: 2, exp: NOW + 1000, p: [{ a: 'Anna', b: 'Bo', id: 'AAAAAAAAAABBBBBBBBBB' }] };

  it('accepts a valid node', () => {
    expect(parseHubNode(valid, NOW)).toEqual(valid);
  });

  it('reads a round with no pairings as an empty list', () => {
    expect(parseHubNode({ v: 1, round: 2, exp: NOW + 1000 }, NOW)?.p).toEqual([]);
  });

  it('rejects a malformed or expired node', () => {
    expect(parseHubNode({ ...valid, p: 'nope' }, NOW)).toBeNull();
    expect(parseHubNode(valid, NOW + 2000)).toBeNull();
    expect(parseHubNode(null, NOW)).toBeNull();
  });
});
