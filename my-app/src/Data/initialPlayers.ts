import { Player } from '../Types/Player';

export const initialPlayers: Player[] = [
  {
    lifeTotal: 40,
    key: 1,
    color: '#9c9a9a',
    settings: {
      useCommanderDamage: true,
      usePartner: false,
      useEnergy: false,
      useExperience: false,
      usePoison: false,
      flipped: true,
    },
    extraCounters: [],
  },
  {
    lifeTotal: 40,
    key: 2,
    color: '#F5FFF9',
    settings: {
      useCommanderDamage: true,
      usePartner: false,
      useEnergy: false,
      useExperience: false,
      usePoison: false,
      flipped: true,
    },
    extraCounters: [],
  },
  {
    lifeTotal: 40,
    key: 3,
    color: '#FFD601',
    settings: {
      useCommanderDamage: true,
      usePartner: false,
      useEnergy: false,
      useExperience: false,
      usePoison: false,
      flipped: false,
    },
    extraCounters: [],
  },
  {
    lifeTotal: 40,
    key: 4,
    color: '#7FFFD3',
    settings: {
      useCommanderDamage: true,
      usePartner: false,
      useEnergy: false,
      useExperience: false,
      usePoison: false,
      flipped: false,
    },
    extraCounters: [],
  },
];
