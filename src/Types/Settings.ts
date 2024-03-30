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
  startingLifeTotal: z.number().min(1).max(200),
  useCommanderDamage: z.boolean(),
  gameFormat: z.nativeEnum(GameFormat),
  numberOfPlayers: z.number().min(1).max(6),
  orientation: z.nativeEnum(Orientation),
});

export const defaultInitialGameSettings = {
  numberOfPlayers: 4,
  startingLifeTotal: 40,
  useCommanderDamage: true,
  orientation: Orientation.Landscape,
  gameFormat: GameFormat.Commander,
};

export const settingsSchema = z.object({
  keepAwake: z.boolean(),
  showStartingPlayer: z.boolean(),
  showPlayerMenuCog: z.boolean(),
  goFullscreenOnStart: z.boolean(),
  preStartMode: z.nativeEnum(PreStartMode),
});

export const defaultSettings: Settings = {
  goFullscreenOnStart: true,
  keepAwake: true,
  showStartingPlayer: true,
  showPlayerMenuCog: true,
  preStartMode: PreStartMode.None,
};
