import { GridTemplateAreas } from '../Data/GridTemplateAreas';

type Orientation = 'side' | 'landscape' | 'portrait';

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
  gridAreas: GridTemplateAreas;
  orientation?: Orientation;
};

type GameFormat = 'commander' | 'standard' | 'two-headed-giant';
