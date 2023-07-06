export type Player = {
  lifeTotal: number;
  key: number;
  color: string;
  settings: PlayerSettings;
  extraCounters?: ExtraCounters;
};

type PlayerSettings = {
  flipped?: boolean;
  useCommanderDamage: boolean;
  usePartner?: boolean;
  usePoison?: boolean;
  useEnergy?: boolean;
  useExperience?: boolean;
};

type ExtraCounters = {
  commanderDamage?: number;
  partnerDamage?: number;
  poison?: number;
  energy?: number;
  experience?: number;
};
