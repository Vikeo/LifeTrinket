//@ts-expect-error - tailwindcss-grid-areas does not have typescript support
import tailwindcssGridAreas from '@savvywombat/tailwindcss-grid-areas';
import type { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
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
          main: '#7F9172',
          dark: '#57654F',
        },
        secondary: {
          main: '#5E714C',
        },
        background: {
          default: '#495E35',
          backdrop: 'rgba(0, 0, 0, 0.3)',
          settings: 'rgba(20, 20, 0, 0.9)',
        },
        text: {
          primary: '#F5F5F5',
          secondary: '#b3b39b',
        },
        action: {
          disabled: '#5E714C',
        },
        common: {
          white: '#F9FFE3',
          black: '#000000',
        },
        lifeCounter: {
          text: 'rgba(0, 0, 0, 0.4)',
          lostWrapper: '#00000070',
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

// const fadeOut = keyframes`
//   0% {
//     opacity: 1;
//   }
//   33% {
//     opacity: 0.6;
//   }
//   100% {
//     opacity: 0;
//   }
// `;
