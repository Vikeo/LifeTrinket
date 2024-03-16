//@ts-expect-error - tailwindcss-grid-areas does not have typescript support
import tailwindcssGridAreas from '@savvywombat/tailwindcss-grid-areas';
import type { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      modalSm: '548px',
    },
    extend: {
      gridTemplateAreas: {
        onePlayerLandscape: ['player0 player0'],
        onePlayerPortrait: ['player0', 'player0'],
        twoPlayersOppositeLandscape: ['player0', 'player1'],
        twoPlayersOppositePortrait: ['player0 player1', 'player0 player1'],
        twoPlayersSameSideLandscape: ['player0 player1'],
        threePlayers: ['player0 player0', 'player1 player2'],
        threePlayersSide: [
          'player0 player0 player0 player2',
          'player1 player1 player1 player2',
        ],
        fourPlayerPortrait: [
          'player0 player1 player1 player1 player1 player3',
          'player0 player2 player2 player2 player2 player3',
        ],
        fourPlayer: ['player0 player1', 'player2 player3'],
        fivePlayers: [
          'player0 player0 player0 player1 player1 player1',
          'player2 player2 player3 player3 player4 player4',
        ],
        fivePlayersSide: [
          'player0 player0 player0 player0 player0 player1 player1 player1 player1 player1 player2',
          'player3 player3 player3 player3 player3 player4 player4 player4 player4 player4 player2',
        ],
        sixPlayers: ['player0 player1 player2', 'player3 player4 player5'],
        sixPlayersSide: [
          'player0 player1 player1 player1 player1 player2 player2 player2 player2 player3',
          'player0 player4 player4 player4 player4 player5 player5 player5 player5 player3',
        ],
      },
      colors: {
        primary: {
          main: '#3E7D78',
          dark: '#2D5F5B',
        },
        secondary: {
          main: '#284F4C',
          dark: '#1B3B38',
        },
        background: {
          default: '#08253B',
          backdrop: 'rgba(0, 0, 0, 0.3)',
          settings: 'rgba(20, 20, 0, 0.9)',
        },
        icons: {
          dark: '#00000080',
          light: '#ffffff4f',
        },
        text: {
          primary: '#F5F5F5',
          secondary: '#76A6A5',
        },
        action: {
          disabled: '#234A47',
        },
        common: {
          white: '#F9FFE3',
          black: '#000000',
        },
        lifeCounter: {
          text: 'rgba(0, 0, 0, 0.4)',
          lostWrapper: '#000000',
        },
        interface: {
          loseButton: {
            background: '#43434380',
          },
          recentDifference: {
            background: 'rgba(255, 255, 255, 0.6);',
            text: '#333333',
          },
        },
      },
      keyframes: {
        fadeOut: {
          '0%': {
            opacity: '1',
          },
          '33%': {
            opacity: '0.6',
          },
          '100%': {
            opacity: '0',
          },
        },
      },
      animation: {
        fadeOut: 'fadeOut 3s 1s ease-out forwards',
      },
    },
  },
  plugins: [tailwindcssGridAreas],
} satisfies Config;
// #98FF98
