import { GridTemplateAreas } from '../Data/GridTemplateAreas';

export type Settings = {
  keepAwake: boolean;
  showStartingPlayer: boolean;
  goFullscreenOnStart: boolean;
};

export type InitialGameSettings = {
  startingLifeTotal: number;
  useCommanderDamage: boolean;
  gameFormat: GameFormat;
  numberOfPlayers: number;
  gridAreas: GridTemplateAreas;
};

type GameFormat = 'commander' | 'standard' | 'two-headed-giant';
