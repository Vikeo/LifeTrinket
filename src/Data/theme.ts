import { createTheme } from '@mui/material';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';

//TODO Create provider for this
const fullConfig = resolveConfig(tailwindConfig);

const { primary, secondary, background, text, action, common } =
  fullConfig.theme.colors;

export const theme = createTheme({
  palette: {
    primary,
    secondary,
    background,
    text,
    action,
    common,
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          color: text.primary,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        markLabel: {
          fontSize: '1rem',
          color: text.primary,
        },
        valueLabel: {
          display: 'none',
          color: text.primary,
          background: secondary.main,
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
          background: background.default,
          height: 'auto',
          borderRadius: '8px',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: background.backdrop,
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
    MuiSwitch: {
      styleOverrides: {
        colorPrimary: {
          color: action.disabled,
        },
      },
    },
  },
});
