import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#7F9172',
    },
    secondary: {
      main: '#5E714C',
    },
    background: {
      default: '#495E35',
    },
    text: {
      primary: '#F5F5F5',
      secondary: '#FFFFF0',
    },
    action: {
      disabled: '#5E714C',
    },
    common: {
      white: '#F9FFE3',
      black: '#000000',
    },
  },
  components: {
    MuiSlider: {
      styleOverrides: {
        root: {
          marginBottom: '4em',
        },
        markLabel: {
          fontSize: '1.5em',
          color: '#F5F5F5',
        },
        valueLabel: {
          display: 'none',
          color: '#F5F5F5',
          background: '#5E714C',
        },
        track: {
          height: '1em',
        },
        rail: {
          height: '1em',
        },
        mark: {
          markerStart: 'none',
          markerEnd: 'none',
          width: '0.5em',
          height: '0.5em',
          borderRadius: '50%',
        },
        thumb: {
          width: '1.7em',
          height: '1.7em',
        },
      },
    },
  },
});
