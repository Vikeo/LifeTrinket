import { z } from 'zod';
import { initialGameSettingsSchema, lifeHistoryEventSchema } from './Settings';
import { CounterType, Rotation } from './Player';

// Zod schemas for Player types
export const commanderDamageSchema = z.object({
  source: z.number(),
  damageTotal: z.number(),
  partnerDamageTotal: z.number(),
});

export const extraCounterSchema = z.object({
  type: z.nativeEnum(CounterType),
  value: z.number(),
});

export const playerSettingsSchema = z.object({
  rotation: z.nativeEnum(Rotation),
  useCommanderDamage: z.boolean(),
  usePartner: z.boolean(),
  usePoison: z.boolean(),
  useEnergy: z.boolean(),
  useExperience: z.boolean(),
});

export const playerSchema = z.object({
  lifeTotal: z.number(),
  index: z.number(),
  color: z.string(),
  iconTheme: z.enum(['light', 'dark']),
  settings: playerSettingsSchema,
  commanderDamage: z.array(commanderDamageSchema),
  extraCounters: z.array(extraCounterSchema),
  isStartingPlayer: z.boolean(),
  isMonarch: z.boolean(),
  hasLost: z.boolean(),
  isSide: z.boolean(),
  name: z.string(),
});

export const gameScoreSchema = z.record(z.string(), z.number());

export const sharedGameStateSchema = z.object({
  version: z.string(),
  initialGameSettings: initialGameSettingsSchema,
  players: z.array(playerSchema),
  gameScore: gameScoreSchema.optional(),
  lifeHistory: z.array(lifeHistoryEventSchema).optional(),
  startingPlayerIndex: z.number(),
  timestamp: z.number(),
});

export type SharedGameState = z.infer<typeof sharedGameStateSchema>;
