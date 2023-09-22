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
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        markLabel: {
          fontSize: '1rem',
          color: '#F5F5F5',
        },
        valueLabel: {
          display: 'none',
          color: '#F5F5F5',
          background: '#5E714C',
        },
        track: {
          height: '0.7rem',
        },
        rail: {
          height: '0.7rem',
        },
        mark: {
          width: '0.5rem',
          height: '0.5rem',
          borderRadius: '50%',
          display: 'none',
        },
        thumb: {
          width: '1.3rem',
          height: '1.3rem',
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          margin: '0',
        },
      },
    },
    MuiFormGroup: {
      styleOverrides: {
        root: {},
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          top: '1rem',
          background: '#495E35',
          height: 'auto',
          borderRadius: '8px',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
