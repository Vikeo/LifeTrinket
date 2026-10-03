import { z } from 'zod';

export const TRACK_ID_LENGTH = 20;

/** The starting life a track link means when it names none. */
export const DEFAULT_TRACKED_LIFE = 20;

export const trackLinkSchema = z.object({
  v: z.literal(1),
  id: z.string().length(TRACK_ID_LENGTH),
  seats: z.array(z.string()).min(2).max(6),
  life: z.number().int().positive().optional(),
  label: z.string().max(64).optional(),
  /**
   * The session id naming the round clock this link's game follows.
   * Optional: every link minted before the round-end feature has none, and
   * must keep decoding unchanged.
   */
  r: z.string().length(TRACK_ID_LENGTH).optional(),
});

export type TrackLink = z.infer<typeof trackLinkSchema>;

export const seatStateSchema = z.object({
  l: z.number(),
  poi: z.number().optional(),
  cmd: z.number().optional(),
});

export type SeatState = z.infer<typeof seatStateSchema>;

export const liveNodeSchema = z.object({
  v: z.literal(1),
  st: z.enum(['live', 'offline', 'ended']),
  t0: z.number(),
  exp: z.number(),
  up: z.number(),
  wr: z.string().max(16),
  off: z.number().optional(),
  w: z.number().optional(),
  p: z.array(seatStateSchema),
  /**
   * Games won, seat-indexed, same order as `p`. Optional: a node written
   * before this field existed has none, and the two-writer guard parses
   * live nodes with this schema.
   */
  gs: z.array(z.number()).optional(),
});

export type LiveNode = z.infer<typeof liveNodeSchema>;
export type TrackStatus = LiveNode['st'];

/** `/rounds/$sessionId`, written by EventTrinket and only ever read here. */
export const roundNodeSchema = z.object({
  v: z.literal(1),
  end: z.number(),
  exp: z.number(),
});

export type RoundNode = z.infer<typeof roundNodeSchema>;

/**
 * `/hubs/$sessionId`, written by EventTrinket and only ever read here. It
 * lists the pairings of the tournament's current round.
 */
export const hubNodeSchema = z.object({
  v: z.literal(1),
  round: z.number().int().positive(),
  exp: z.number(),
  // The database keeps no empty arrays, so a round with no pairings reads
  // back with no `p` at all.
  p: z
    .array(
      z.object({
        a: z.string(),
        b: z.string(),
        id: z.string().length(TRACK_ID_LENGTH),
      })
    )
    .default([]),
});

export type HubNode = z.infer<typeof hubNodeSchema>;
