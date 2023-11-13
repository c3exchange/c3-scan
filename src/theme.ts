import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#3E246B',
      contrastText: '#FFFFFF',
      dark: '#000000',
    },
    secondary: {
      main: '#F0A200',
      contrastText: '#1E1E1E',
    },
    error: {
      main: '#FC3044',
    },
    success: {
      main: '#1ACD77',
    },
    warning: {
      main: '#F03A00',
    },
    info: {
      main: '#8999A4',
    },
    background: {
      default: '#151519',
      paper: '#1F2328',
    },
    text: {
      primary: '#BABABA',
      secondary: '#484848',
      disabled: '#6B6B6B',
    },
    divider: '#F7F7F7',
    action: {
      active: '#05061B',
      hover: '#3C2800',
      selected: '#3C0E00',
    },
  },
});
