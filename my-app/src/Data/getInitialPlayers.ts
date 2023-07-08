import { Player, Rotation } from '../Types/Player';
import { GridTemplateAreas } from './getGridTemplateAreas';

type InitialSettings = {
  startingLifeTotal: number;
  useCommanderDamage: boolean;
  numberOfPlayers: number;
  gridAreas: GridTemplateAreas;
};

const presetColors = [
  '#F06292', // Light Pink
  '#4DB6AC', // Teal
  '#FFA726', // Orange
  '#7986CB', // Indigo
  '#FFCC80', // Peach
  '#90CAF9', // Pastel Blue
  '#CE93D8', // Lilac
  '#FF8A80', // Coral
];

const getRotation = (index: number, gridAreas: GridTemplateAreas): Rotation => {
  if (gridAreas === GridTemplateAreas.OnePlayerHorizontal && index === 1) {
    return Rotation.Normal;
  }

  if (gridAreas === GridTemplateAreas.OnePlayerVertical && index === 1) {
    return Rotation.Side;
  }

  if (gridAreas === GridTemplateAreas.TwoPlayersOppositeHorizontal) {
    switch (index) {
      case 1:
        return Rotation.Flipped;
      case 2:
        return Rotation.Normal;
      default:
        return Rotation.Normal;
    }
  }

  if (gridAreas === GridTemplateAreas.TwoPlayersSameSide) {
    switch (index) {
      case 1:
        return Rotation.Normal;
      case 2:
        return Rotation.Normal;
      default:
        return Rotation.Normal;
    }
  }

  if (gridAreas === GridTemplateAreas.ThreePlayers) {
    switch (index) {
      case 1:
        return Rotation.Flipped;
      case 2:
        return Rotation.Normal;
      case 3:
        return Rotation.Normal;
      default:
        return Rotation.Normal;
    }
  }

  if (gridAreas === GridTemplateAreas.ThreePlayersSide) {
    switch (index) {
      case 1:
        return Rotation.Flipped;
      case 2:
        return Rotation.SideFlipped;
      case 3:
        return Rotation.Normal;
      default:
        return Rotation.Normal;
    }
  }

  return Rotation.Normal;
};

export const createInitialPlayers = ({
  numberOfPlayers,
  startingLifeTotal,
  useCommanderDamage,
  gridAreas,
}: InitialSettings): Player[] => {
  const players: Player[] = [];
  const availableColors = [...presetColors]; // Create a copy of the colors array

  for (let i = 1; i <= numberOfPlayers; i++) {
    const colorIndex = Math.floor(Math.random() * availableColors.length);
    const color = availableColors[colorIndex];

    // Remove the assigned color from the availableColors array
    availableColors.splice(colorIndex, 1);

    const commanderDamage = [];
    for (let j = 1; j <= numberOfPlayers; j++) {
      commanderDamage.push({
        source: j,
        damageTotal: 0,
        partnerDamageTotal: 0,
      });
    }
    const rotation = getRotation(i, gridAreas);
    console.log(rotation);

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
        rotation,
      },

      extraCounters: [],
      commanderDamage,
    };

    players.push(player);
  }

  return players;
};
