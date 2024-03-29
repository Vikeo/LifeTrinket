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

export enum PreStartMode {
  None = 'none',
  RandomKing = 'random-king',
  FingerGame = 'finger-game',
}

export type Settings = {
  keepAwake: boolean;
  showStartingPlayer: boolean;
  showPlayerMenuCog: boolean;
  goFullscreenOnStart: boolean;
  preStartMode: PreStartMode;
};

export type InitialGameSettings = {
  startingLifeTotal: number;
  useCommanderDamage: boolean;
  gameFormat?: GameFormat;
  numberOfPlayers: number;
  orientation: Orientation;
};

export const initialGameSettingsSchema = z.object({
  startingLifeTotal: z.number().min(1).max(200).default(20),
  useCommanderDamage: z.boolean().default(false),
  gameFormat: z.nativeEnum(GameFormat).optional(),
  numberOfPlayers: z.number().min(1).max(6).default(2),
  orientation: z.nativeEnum(Orientation).default(Orientation.Landscape),
});

export const settingsSchema = z.object({
  keepAwake: z.boolean().default(true),
  showStartingPlayer: z.boolean().default(true),
  showPlayerMenuCog: z.boolean().default(true),
  goFullscreenOnStart: z.boolean().default(true),
  preStartMode: z.nativeEnum(PreStartMode).default(PreStartMode.None),
});
