export enum Orientation {
  OppositeLandscape = 'opposite-landscape',
  Landscape = 'landscape',
  Portrait = 'portrait',
}

export type Settings = {
  keepAwake: boolean;
  showStartingPlayer: boolean;
  goFullscreenOnStart: boolean;
};

export type InitialGameSettings = {
  startingLifeTotal: number;
  useCommanderDamage: boolean;
  gameFormat?: GameFormat;
  numberOfPlayers: number;
  orientation: Orientation;
};

type GameFormat = 'commander' | 'standard' | 'two-headed-giant';
