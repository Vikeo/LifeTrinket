import { Player, Rotation } from '../Types/Player';
import { InitialGameSettings, Orientation } from '../Types/Settings';
import { checkContrast } from '../Utils/checkContrast';

export const presetColors = [
  '#D08182', // Muted Pink
  '#5AAB9E', // Teal
  '#D58B5A', // Burnt Orange
  '#697A9A', // Soft Indigo
  '#78B2D3', // Pastel Blue
  '#A785BA', // Lilac
  '#D9C17C', // Muted Yellow
  '#FF907F', // Light Coral
];

const getOrientationRotations = (
  index: number,
  numberOfPlayers: number,
  orientation: Orientation
): Rotation => {
  switch (numberOfPlayers) {
    case 1:
      switch (orientation) {
        default:
        case Orientation.Landscape:
          return Rotation.Normal;
        case Orientation.Portrait:
          return Rotation.Side;
      }
    case 2:
      switch (orientation) {
        default:
        case Orientation.Landscape:
          return Rotation.Normal;
        case Orientation.Portrait:
          switch (index) {
            case 0:
              return Rotation.SideFlipped;
            case 1:
              return Rotation.Side;
            default:
              return Rotation.Normal;
          }
        case Orientation.OppositeLandscape:
          switch (index) {
            case 0:
              return Rotation.Flipped;
            case 1:
              return Rotation.Normal;
            default:
              return Rotation.Normal;
          }
      }
    case 3:
      switch (orientation) {
        default:
        case Orientation.Landscape:
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
        case Orientation.Portrait:
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
    case 4:
      switch (orientation) {
        default:
        case Orientation.Landscape:
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
        case Orientation.Portrait:
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
    case 5:
      switch (orientation) {
        default:
        case Orientation.Landscape:
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
        case Orientation.Portrait:
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
    case 6:
      switch (orientation) {
        default:
        case Orientation.Landscape:
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
        case Orientation.Portrait:
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
    default:
      return Rotation.Normal;
  }
};

export const createInitialPlayers = ({
  numberOfPlayers,
  startingLifeTotal,
  useCommanderDamage,
  orientation,
}: InitialGameSettings): Player[] => {
  const players: Player[] = [];
  const availableColors = [...presetColors]; // Create a copy of the colors array

  for (let i = 0; i <= numberOfPlayers - 1; i++) {
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

    const rotation = getOrientationRotations(i, numberOfPlayers, orientation);

    const player: Player = {
      lifeTotal: startingLifeTotal,
      index: i,
      color,
      iconTheme:
        checkContrast(color, '#00000080') === 'Fail' ? 'light' : 'dark',
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
      hasLost: false,
      isStartingPlayer: false,
      isSide: rotation === Rotation.Side || rotation === Rotation.SideFlipped,
      name: '',
      isMonarch: false,
    };

    players.push(player);
  }

  return players;
};
