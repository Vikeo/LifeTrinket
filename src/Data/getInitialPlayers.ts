import { Player, Rotation } from '../Types/Player';
import { GridTemplateAreas } from './GridTemplateAreas';

export type InitialSettings = {
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
  if (gridAreas === GridTemplateAreas.OnePlayerLandscape && index === 0) {
    return Rotation.Normal;
  }

  if (gridAreas === GridTemplateAreas.OnePlayerPortrait && index === 0) {
    return Rotation.Side;
  }

  if (gridAreas === GridTemplateAreas.TwoPlayersOppositePortrait) {
    switch (index) {
      case 0:
        return Rotation.SideFlipped;
      case 1:
        return Rotation.Side;
      default:
        return Rotation.Normal;
    }
  }

  if (gridAreas === GridTemplateAreas.TwoPlayersOppositeLandscape) {
    switch (index) {
      case 0:
        return Rotation.Flipped;
      case 1:
        return Rotation.Normal;
      default:
        return Rotation.Normal;
    }
  }

  if (gridAreas === GridTemplateAreas.TwoPlayersSameSide) {
    switch (index) {
      case 0:
        return Rotation.Normal;
      case 1:
        return Rotation.Normal;
      default:
        return Rotation.Normal;
    }
  }

  if (gridAreas === GridTemplateAreas.ThreePlayers) {
    switch (index) {
      case 0:
        return Rotation.Flipped;
      case 1:
        return Rotation.Normal;
      case 2:
        return Rotation.Normal;
      default:
        return Rotation.Normal;
    }
  }

  if (gridAreas === GridTemplateAreas.ThreePlayersSide) {
    switch (index) {
      case 0:
        return Rotation.Flipped;
      case 1:
        return Rotation.Normal;
      case 2:
        return Rotation.Side;
      default:
        return Rotation.Normal;
    }
  }

  if (gridAreas === GridTemplateAreas.FourPlayers) {
    switch (index) {
      case 0:
        return Rotation.Flipped;
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

  if (gridAreas === GridTemplateAreas.FourPlayersSide) {
    switch (index) {
      case 0:
        return Rotation.SideFlipped;
      case 1:
        return Rotation.Flipped;
      case 2:
        return Rotation.Normal;
      case 3:
        return Rotation.Side;
      default:
        return Rotation.Normal;
    }
  }

  if (gridAreas === GridTemplateAreas.FivePlayers) {
    switch (index) {
      case 0:
        return Rotation.Flipped;
      case 1:
        return Rotation.Flipped;
      case 2:
        return Rotation.Normal;
      case 3:
        return Rotation.Normal;
      case 4:
        return Rotation.Normal;
      default:
        return Rotation.Normal;
    }
  }

  if (gridAreas === GridTemplateAreas.FivePlayersSide) {
    switch (index) {
      case 0:
        return Rotation.Flipped;
      case 1:
        return Rotation.Flipped;
      case 2:
        return Rotation.Side;
      case 3:
        return Rotation.Normal;
      case 4:
        return Rotation.Normal;
      default:
        return Rotation.Normal;
    }
  }

  if (gridAreas === GridTemplateAreas.SixPlayers) {
    switch (index) {
      case 0:
        return Rotation.Flipped;
      case 1:
        return Rotation.Flipped;
      case 2:
        return Rotation.Flipped;
      case 3:
        return Rotation.Normal;
      case 4:
        return Rotation.Normal;
      case 5:
        return Rotation.Normal;
      default:
        return Rotation.Normal;
    }
  }

  if (gridAreas === GridTemplateAreas.SixPlayersSide) {
    switch (index) {
      case 0:
        return Rotation.SideFlipped;
      case 1:
        return Rotation.Flipped;
      case 2:
        return Rotation.Flipped;
      case 3:
        return Rotation.Side;
      case 4:
        return Rotation.Normal;
      case 5:
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
  const firstPlayerIndex = Math.floor(Math.random() * numberOfPlayers);

  for (let i = 0; i <= numberOfPlayers - 1; i++) {
    const isStartingPlayer = i === firstPlayerIndex;
    const colorIndex = Math.floor(Math.random() * availableColors.length);
    const color = availableColors[colorIndex];

    // Remove the assigned color from the availableColors array
    availableColors.splice(colorIndex, 1);

    const commanderDamage = [];
    for (let j = 0; j <= numberOfPlayers - 1; j++) {
      commanderDamage.push({
        source: j,
        damageTotal: 0,
        partnerDamageTotal: 0,
      });
    }

    const rotation = getRotation(i, gridAreas);

    const player: Player = {
      lifeTotal: startingLifeTotal,
      index: i,
      color,
      settings: {
        useCommanderDamage,
        usePartner: false,
        useEnergy: false,
        useExperience: false,
        usePoison: false,
        rotation,
      },
      isStartingPlayer: isStartingPlayer,
      extraCounters: [],
      commanderDamage,
    };

    players.push(player);
  }

  return players;
};
