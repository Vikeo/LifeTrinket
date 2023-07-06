export type Player = {
  lifeTotal: number;
  key: number;
  color: string;
  settings: PlayerSettings;
  extraCounters: ExtraCounter[];
};

type PlayerSettings = {
  flipped?: boolean;
  useCommanderDamage: boolean;
  usePartner?: boolean;
  usePoison?: boolean;
  useEnergy?: boolean;
  useExperience?: boolean;
};

type ExtraCounter = {
  type: CounterType;
  value: number;
};

export enum CounterType {
  CommanderTax = 'commanderTax',
  PartnerTax = 'partnerTax',
  Poison = 'poison',
  Energy = 'energy',
  Experience = 'experience',
}
