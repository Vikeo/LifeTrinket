export type Player = {
  lifeTotal: number;
  key: number;
  color: string;
  settings: PlayerSettings;
  commanderDamage: CommanderDamage[];
  extraCounters: ExtraCounter[];
};

type PlayerSettings = {
  rotation: Rotation;
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

type CommanderDamage = {
  source: number;
  damageTotal: number;
  partnerDamageTotal: number;
};

export enum CounterType {
  CommanderTax = 'commanderTax',
  PartnerTax = 'partnerTax',
  Poison = 'poison',
  Energy = 'energy',
  Experience = 'experience',
}

export enum Rotation {
  Normal = 0,
  Side = 90,
  Flipped = 180,
  SideFlipped = 270,
}
