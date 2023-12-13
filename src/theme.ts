import { createTheme } from '@mui/material/styles';

export enum Breakpoints {
  mobile = 'mobile',
  tablet = 'tablet',
  laptop = 'laptop',
  desktop = 'desktop',
  mediumDesktop = 'mediumDesktop',
  largeDesktop = 'largeDesktop',
}

// define const of breakpoints devices
export const breakpoints = {
  [Breakpoints.mobile]: 0,
  [Breakpoints.tablet]: 480,
  [Breakpoints.laptop]: 768,
  [Breakpoints.desktop]: 1024,
  [Breakpoints.mediumDesktop]: 1200,
  [Breakpoints.largeDesktop]: 1440,
};

const defaultTheme = createTheme();

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
  breakpoints: {
    values: {
      ...defaultTheme.breakpoints.values,
      ...breakpoints,
    },
  },
});
