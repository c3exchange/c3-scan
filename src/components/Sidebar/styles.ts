import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MUIDrawer, { drawerClasses } from '@mui/material/Drawer';
import { backdropClasses } from '@mui/material/Backdrop';

import styled from '@mui/material/styles/styled';

export const Drawer = styled(MUIDrawer)(() => ({
  [`& .${backdropClasses.root}`]: {
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
  },
  [`& .${drawerClasses.paper}`]: {
    boxShadow: 'none',
  },
}));

export const Container = styled(Grid)(({ theme }) => ({
  width: 310,
  backgroundColor: theme.palette.primary.dark,
  height: '100%',
  color: theme.palette.primary.contrastText,
}));

export const CloseRow = styled(Grid)(() => ({
  height: 60,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingRight: 16,
}));

export const SidebarContent = styled(Grid)(() => ({
  padding: 16,
  height: 'calc(100% - 60px)',
}));

export const LinkContainer = styled(Grid)(() => ({
  flexGrow: 1,
  overflow: 'auto',
  height: 'calc(100% - 200px)',
  width: '100%',
  '::-webkit-scrollbar': {
    width: '0px',
  },
}));

export const LinkText = styled('span')(() => ({
  fontFamily: 'Manrope, sans-serif',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  fontWeight: '400',
}));

export const OpenCloseButton = styled(Button)(({ theme }) => ({
  display: 'none',
  minWidth: 'auto',
  padding: 0,
  [theme.breakpoints.down('desktop')]: {
    display: 'flex',
    justifyContent: 'flex-end',
    color: theme.palette.primary.contrastText,
    ':hover': {
      backgroundColor: 'transparent',
    },
  },
}));

export const SocialLinks = styled(Grid)(({ theme }) => ({
  fontFamily: 'Manrope',
  color: theme.palette.text.primary,
  marginBottom: 26,
  paddingTop: 10,
  display: 'flex',
  alignItems: 'center',
  borderTop: '1px solid #333',
}));

export const Documentation = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 400,
  marginLeft: 10,
  cursor: 'pointer',
}));

export const GithubContainer = styled('span')(() => ({
  marginRight: 10,
}));

export const Separator = styled('span')(() => ({
  fontSize: 32,
}));
