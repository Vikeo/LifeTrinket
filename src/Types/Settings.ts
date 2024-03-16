import { z } from 'zod';

export enum Orientation {
  OppositeLandscape = 'opposite-landscape',
  Landscape = 'landscape',
  Portrait = 'portrait',
}

export enum GameFormat {
  Commander = 'commander',
  Standard = 'standard',
  TwoHeadedGiant = 'two-headed-giant',
}

export type Settings = {
  keepAwake: boolean;
  showStartingPlayer: boolean;
  showPlayerMenuCog: boolean;
  goFullscreenOnStart: boolean;
  useRandomStartingPlayerInterval: boolean;
};

export type InitialGameSettings = {
  startingLifeTotal: number;
  useCommanderDamage: boolean;
  gameFormat?: GameFormat;
  numberOfPlayers: number;
  orientation: Orientation;
};

export const InitialGameSettingsSchema = z.object({
  startingLifeTotal: z.number().min(1).max(200).default(20),
  useCommanderDamage: z.boolean().default(false),
  gameFormat: z.nativeEnum(GameFormat).optional(),
  numberOfPlayers: z.number().min(1).max(6).default(2),
  orientation: z.nativeEnum(Orientation).default(Orientation.Landscape),
});
