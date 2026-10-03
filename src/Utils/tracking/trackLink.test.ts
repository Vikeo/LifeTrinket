import { describe, it, expect, vi } from 'vitest';
import {
  encodeTrackLink,
  decodeTrackLink,
  getTrackLinkFromUrl,
  clearTrackLinkFromUrl,
  readTrackEntry,
  readSavedTrackLink,
} from './trackLink';
import { roundNodeSchema, type TrackLink } from '../../Types/Tracking';

const link: TrackLink = {
  v: 1,
  id: 'AAAAAAAAAABBBBBBBBBB',
  seats: ['Alice', 'Bob'],
  life: 20,
  label: 'Round 2 · Table 3',
};

describe('encodeTrackLink and decodeTrackLink', () => {
  it('round-trips a link', () => {
    expect(decodeTrackLink(encodeTrackLink(link))).toEqual(link);
  });

  it('round-trips a link without the optional fields', () => {
    const minimal: TrackLink = { v: 1, id: link.id, seats: ['Alice', 'Bob'] };
    expect(decodeTrackLink(encodeTrackLink(minimal))).toEqual(minimal);
  });

  it('returns null for rubbish instead of throwing', () => {
    expect(decodeTrackLink('not-compressed')).toBeNull();
  });

  it('returns null for an id of the wrong length', () => {
    const bad = encodeTrackLink({ ...link, id: 'short' } as TrackLink);
    expect(decodeTrackLink(bad)).toBeNull();
  });

  it('returns null for a single seat', () => {
    const bad = encodeTrackLink({ ...link, seats: ['Alice'] } as TrackLink);
    expect(decodeTrackLink(bad)).toBeNull();
  });

  it('accepts 6 seats', () => {
    const sixSeats: TrackLink = {
      ...link,
      seats: ['A', 'B', 'C', 'D', 'E', 'F'],
    };
    expect(decodeTrackLink(encodeTrackLink(sixSeats))).toEqual(sixSeats);
  });

  it('returns null for 7 seats', () => {
    const bad = encodeTrackLink({
      ...link,
      seats: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    } as TrackLink);
    expect(decodeTrackLink(bad)).toBeNull();
  });

  it('accepts a label of exactly 64 characters', () => {
    const maxLabel: TrackLink = { ...link, label: 'x'.repeat(64) };
    expect(decodeTrackLink(encodeTrackLink(maxLabel))).toEqual(maxLabel);
  });

  it('returns null for a label of 65 characters', () => {
    const bad = encodeTrackLink({
      ...link,
      label: 'x'.repeat(65),
    } as TrackLink);
    expect(decodeTrackLink(bad)).toBeNull();
  });

  it('returns null for a non-positive life', () => {
    const bad = encodeTrackLink({ ...link, life: 0 } as TrackLink);
    expect(decodeTrackLink(bad)).toBeNull();
  });

  it('round-trips a link carrying a round session id', () => {
    const withRound: TrackLink = { ...link, r: 'CCCCCCCCCCDDDDDDDDDD' };
    expect(decodeTrackLink(encodeTrackLink(withRound))).toEqual(withRound);
  });

  it('decodes a link with no round session id, leaving r undefined', () => {
    const decoded = decodeTrackLink(encodeTrackLink(link));
    expect(decoded?.r).toBeUndefined();
  });

  it('returns null for a round session id of the wrong length', () => {
    const bad = encodeTrackLink({ ...link, r: 'short' } as TrackLink);
    expect(decodeTrackLink(bad)).toBeNull();
  });
});

describe('roundNodeSchema', () => {
  it('rejects a node with no end', () => {
    const bad = { v: 1, exp: 1758000000000 };
    expect(roundNodeSchema.safeParse(bad).success).toBe(false);
  });
});

describe('getTrackLinkFromUrl', () => {
  it('reads a track hash', () => {
    expect(getTrackLinkFromUrl(`#track=${encodeTrackLink(link)}`)).toEqual(link);
  });

  it('ignores the existing game hash', () => {
    expect(getTrackLinkFromUrl('#game=abc')).toBeNull();
  });

  it('ignores an empty hash', () => {
    expect(getTrackLinkFromUrl('')).toBeNull();
  });
});

describe('clearTrackLinkFromUrl', () => {
  it('clears a track hash, replacing the URL with just path and search', () => {
    const replaceState = vi.fn();
    clearTrackLinkFromUrl(
      { hash: '#track=xyz', pathname: '/app', search: '?foo=bar' },
      { replaceState }
    );
    expect(replaceState).toHaveBeenCalledWith(null, '', '/app?foo=bar');
  });

  it('leaves a game hash alone', () => {
    const replaceState = vi.fn();
    clearTrackLinkFromUrl(
      { hash: '#game=abc', pathname: '/app', search: '' },
      { replaceState }
    );
    expect(replaceState).not.toHaveBeenCalled();
  });

  it('leaves an empty hash alone', () => {
    const replaceState = vi.fn();
    clearTrackLinkFromUrl(
      { hash: '', pathname: '/app', search: '' },
      { replaceState }
    );
    expect(replaceState).not.toHaveBeenCalled();
  });
});

describe('readTrackEntry', () => {
  // A bare object with only `getItem` proves purity at compile time (the
  // type is `Pick<Storage, 'getItem'>`) and at run time: if the reader ever
  // tried to write or delete, calling a method that does not exist here
  // would throw and fail the test.
  const readOnlyStorage = (value: string | null) => ({
    getItem: () => value,
  });

  it('reports a fresh link as new on two consecutive calls, leaving storage and the hash untouched', () => {
    const storage = readOnlyStorage(null);
    const hash = `#track=${encodeTrackLink(link)}`;

    expect(readTrackEntry(storage, hash)).toEqual({ link, isNew: true });
    // Same inputs, same answer: nothing was consumed or mutated by the
    // first call.
    expect(readTrackEntry(storage, hash)).toEqual({ link, isNew: true });
  });

  it('reports a stored link with no hash as a resume', () => {
    const storage = readOnlyStorage(JSON.stringify(link));

    expect(readTrackEntry(storage, '')).toEqual({ link, isNew: false });
  });

  it('reports a hash whose id differs from the stored link as new', () => {
    const storedLink: TrackLink = { ...link, id: 'AAAAAAAAAABBBBBBBBBB' };
    const urlLink: TrackLink = { ...link, id: 'CCCCCCCCCCDDDDDDDDDD' };
    const storage = readOnlyStorage(JSON.stringify(storedLink));
    const hash = `#track=${encodeTrackLink(urlLink)}`;

    expect(readTrackEntry(storage, hash)).toEqual({
      link: urlLink,
      isNew: true,
    });
  });

  it('does not throw and does not delete a corrupt stored value', () => {
    const storage = readOnlyStorage('{not json');

    expect(() => readTrackEntry(storage, '')).not.toThrow();
    expect(readTrackEntry(storage, '')).toBeNull();
  });
});

describe('readSavedTrackLink', () => {
  it('returns the link a saved game carries', () => {
    expect(readSavedTrackLink({ players: [], trackLink: link })).toEqual(link);
  });

  // Every game saved before this field existed has none, and resumes
  // untracked, as it did before.
  it('returns null for a saved game without a link', () => {
    expect(readSavedTrackLink({ players: [] })).toBeNull();
    expect(readSavedTrackLink(null)).toBeNull();
  });

  // savedGame is read from storage without a schema, so the link in it is
  // checked here before it can start publishing.
  it('returns null for a link that does not validate', () => {
    expect(readSavedTrackLink({ trackLink: { ...link, id: 'short' } })).toBeNull();
    expect(readSavedTrackLink({ trackLink: 'nope' })).toBeNull();
  });
});
