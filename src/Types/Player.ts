export type Player = {
  lifeTotal: number;
  index: number;
  color: string;
  iconTheme: 'light' | 'dark';
  settings: PlayerSettings;
  commanderDamage: CommanderDamage[];
  extraCounters: ExtraCounter[];
  isStartingPlayer: boolean;
  isMonarch: boolean;
  hasLost: boolean;
  isSide: boolean;
  name: string;
};

export type PlayerSettings = {
  rotation: Rotation;
  useCommanderDamage: boolean;
  usePartner: boolean;
  usePoison: boolean;
  useEnergy: boolean;
  useExperience: boolean;
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
