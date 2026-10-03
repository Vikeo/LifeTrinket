/**
 * How long each persisted key is allowed to live.
 *
 * LifeTrinket keeps everything in one flat localStorage namespace, but the
 * keys are not all the same kind of thing. Some describe one game and are a
 * lie the moment the next one starts; others describe the device and are
 * meant to be found again years later. Nothing used to say which was which,
 * so clearing a key depended on whoever touched it remembering -- and it was
 * forgotten for the tracked game's start time, for the match score, for the
 * life transcript and for the timer, each in turn.
 *
 * This module is the one place that says it. Every key LifeTrinket persists
 * appears in exactly one of the lists below, and `PersistedKey` is checked
 * against them at compile time, so a new key cannot be added without being
 * classified. Callers ask this module what to clear rather than listing keys
 * of their own.
 */

/**
 * Keys that describe the game being played. A new game must not inherit any
 * of them: the score, the transcript and the timer of the previous game are
 * all wrong for the next one, and the tournament app reads some of them.
 *
 * A new field that belongs to a game goes here, and is then cleared by every
 * path below without anyone having to remember it.
 */
export const GAME_SCOPED_KEYS = [
  'players',
  'gameScore',
  'lifeHistory',
  'timerStartedAt',
  'timerAccumulatedMs',
  'startingPlayerIndex',
  'preStartComplete',
] as const;

/**
 * Keys that belong to the device, not to a game. They are listed here as an
 * explicit exclusion: they survive a new game on purpose.
 *
 * - `settings`: the player's own preferences -- keep awake, fullscreen, which
 *   counters are shown. Losing them on a new game is losing the setup.
 * - `initialGameSettings`: the table the player last set up by hand. It is
 *   what the start menu offers next time, and what a tracked game falls back
 *   to for everything the link does not decide (orientation, format).
 *   `goToStart` does clear it, because that is the player throwing the setup
 *   away deliberately -- see `keysToClearOnGoToStart`.
 */
export const DEVICE_SCOPED_KEYS = ['settings', 'initialGameSettings'] as const;

/**
 * Keys that say where the app is, rather than what is in the game. A new game
 * does not clear them either.
 *
 * - `playing`, `showPlay`: view routing. A load that starts a game sets both
 *   from the link, so clearing them would change nothing and could race the
 *   provider writing them back.
 * - `savedGame`: a game the player parked on purpose so they could come back
 *   to it. It is game data, but its whole point is to outlive the game that
 *   follows it.
 */
export const SESSION_SCOPED_KEYS = [
  'playing',
  'showPlay',
  'savedGame',
] as const;

/**
 * Keys owned by the tracking module (`Utils/tracking/trackLink.ts`,
 * `Utils/tracking/eventHub.ts` and `Hooks/useGameTracker.ts`). They are not
 * cleared from here: `trackedGame` is what says a new game is starting at
 * all, `trackedGameT0` and `trackedGameSession` are already keyed to a game
 * id, so a new game cannot read the previous game's values, and `eventHub`
 * is the way back to the event, which a player needs most after the game.
 * It carries its own expiry.
 */
export const TRACKING_KEYS = [
  'trackedGame',
  'trackedGameT0',
  'trackedGameSession',
  'eventHub',
] as const;

/**
 * Every key LifeTrinket persists.
 *
 * Add a key here and the assertion below fails until it also appears in one
 * of the four lists -- which is the point: the compiler asks the question
 * instead of a reviewer having to.
 */
export type PersistedKey =
  | 'players'
  | 'gameScore'
  | 'lifeHistory'
  | 'timerStartedAt'
  | 'timerAccumulatedMs'
  | 'startingPlayerIndex'
  | 'preStartComplete'
  | 'settings'
  | 'initialGameSettings'
  | 'playing'
  | 'showPlay'
  | 'savedGame'
  | 'trackedGame'
  | 'trackedGameT0'
  | 'trackedGameSession'
  | 'eventHub';

export type GameScopedKey = (typeof GAME_SCOPED_KEYS)[number];

type ClassifiedKey =
  | GameScopedKey
  | (typeof DEVICE_SCOPED_KEYS)[number]
  | (typeof SESSION_SCOPED_KEYS)[number]
  | (typeof TRACKING_KEYS)[number];

type MustBeNever<T extends never> = T;

/**
 * Fails to compile if the lists and `PersistedKey` ever disagree -- a key
 * added to the union but to no list, or listed under a name nothing
 * persists.
 */
export type AllKeysClassified = [
  MustBeNever<Exclude<PersistedKey, ClassifiedKey>>,
  MustBeNever<Exclude<ClassifiedKey, PersistedKey>>,
];

/**
 * The game-scoped keys `goToStart` deliberately leaves behind.
 *
 * Going back to the start menu is not the start of a game, and these two
 * outlive it today:
 *
 * - `startingPlayerIndex`: the seat that goes first carries into the game the
 *   player sets up next, so a match continues its rotation across a trip to
 *   the start menu.
 * - `lifeHistory`: the start menu clears it when the next game actually
 *   starts, so dropping it here would only change what a reload of the start
 *   menu itself shows.
 *
 * Inclusion is the default: a new game-scoped key is cleared by `goToStart`
 * unless someone adds it here with a reason.
 */
export const KEPT_BY_GO_TO_START: readonly GameScopedKey[] = [
  'startingPlayerIndex',
  'lifeHistory',
];

/**
 * The keys a load must clear before anything reads them.
 *
 * A track link that names a game this device has not played is the one moment
 * a game starts without the start menu, and so the one moment nothing else
 * clears the previous game. A link restored on a reload, or a re-scan of the
 * game in progress, clears nothing: that is a match in progress, and its
 * score, transcript and timer are the real result. No link at all clears
 * nothing either -- a device that never tracks is untouched by this module.
 */
export function keysToClearOnLoad(
  trackEntry: { isNew: boolean } | null
): readonly PersistedKey[] {
  return trackEntry?.isNew ? GAME_SCOPED_KEYS : [];
}

/**
 * The keys going back to the start menu clears: the game, minus what it
 * keeps, plus the setup and the view flags that only this path drops.
 */
export function keysToClearOnGoToStart(): readonly PersistedKey[] {
  return [
    ...GAME_SCOPED_KEYS.filter((key) => !KEPT_BY_GO_TO_START.includes(key)),
    'initialGameSettings',
    'playing',
    'showPlay',
  ];
}

const noStorage = { removeItem: () => {} };

/** Removes the given keys, and only those. */
export function clearKeys(
  keys: readonly PersistedKey[],
  storage: Pick<Storage, 'removeItem'> = typeof localStorage === 'undefined'
    ? noStorage
    : localStorage
): void {
  keys.forEach((key) => storage.removeItem(key));
}
