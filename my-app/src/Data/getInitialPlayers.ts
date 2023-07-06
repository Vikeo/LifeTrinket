import { Player } from '../Types/Player';

type InitialSettings = {
  startingLifeTotal: number;
  flipped?: boolean;
  useCommanderDamage: boolean;
  numberOfPlayers: number;
};

export const createInitialPlayers = ({
  numberOfPlayers,
  startingLifeTotal,
  useCommanderDamage,
}: InitialSettings): Player[] => {
  const colors = [
    '#F06292', // Light Pink
    '#4DB6AC', // Teal
    '#FFA726', // Orange
    '#7986CB', // Indigo
    '#FFCC80', // Peach
    '#90CAF9', // Pastel Blue
    '#CE93D8', // Lilac
    '#FF8A80', // Coral
  ];

  const players: Player[] = [];
  const availableColors = [...colors]; // Create a copy of the colors array

  for (let i = 1; i <= numberOfPlayers; i++) {
    const colorIndex = Math.floor(Math.random() * availableColors.length);
    const color = availableColors[colorIndex];

    // Remove the assigned color from the availableColors array
    availableColors.splice(colorIndex, 1);

    const player: Player = {
      lifeTotal: startingLifeTotal,
      key: i,
      color,
      settings: {
        useCommanderDamage,
        usePartner: false,
        useEnergy: false,
        useExperience: false,
        usePoison: false,
        flipped: i === 1 || i === 2,
      },
      extraCounters: [],
      commanderDamage: [
        { source: 1, damageTotal: 0, partnerDamageTotal: 0 },
        { source: 2, damageTotal: 0, partnerDamageTotal: 0 },
        { source: 3, damageTotal: 0, partnerDamageTotal: 0 },
        { source: 4, damageTotal: 0, partnerDamageTotal: 0 },
      ],
    };

    players.push(player);
  }

  return players;
};

export const initialPlayers: Player[] = createInitialPlayers({
  numberOfPlayers: 4,
  startingLifeTotal: 40,
  useCommanderDamage: true,
});
