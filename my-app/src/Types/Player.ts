export type Player = {
  lifeTotal: number;
  key: number;
  color: string;
  settings: PlayerSettings;
};

type PlayerSettings = {
  useCommanderDamage: boolean;
  flipped?: boolean;
  usePartner?: boolean;
  usePoison?: boolean;
  useEnergy?: boolean;
  useExperience?: boolean;
};
