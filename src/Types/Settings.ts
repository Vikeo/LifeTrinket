import { GridTemplateAreas } from '../Data/GridTemplateAreas';

export type Settings = {
  keepAwake: boolean;
  showStartingPlayer: boolean;
  goFullscreenOnStart: boolean;
};

export type InitialGameSettings = {
  startingLifeTotal: number;
  useCommanderDamage: boolean;
  numberOfPlayers: number;
  gridAreas: GridTemplateAreas;
};
