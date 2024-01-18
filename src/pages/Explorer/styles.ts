import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';
import gridBackground from '../../assets/images/grid-background.png';

export const Container = styled(Grid)(() => ({
  maxWidth: '1400px',
}));

export const MarginPoolContainer = styled(Grid)(({ theme }) => ({
  marginTop: '16px',
  [theme.breakpoints.down('mediumDesktop')]: {
    marginBottom: '16px',
  },
}));

export const AddressLabel = styled('div')(({ theme }) => ({
  color: theme.palette.secondary.main,
  marginRight: '2px',
  display: 'flex',
  alignItems: 'center',
}));

export const Copy = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  color: theme.palette.secondary.main,
  display: 'flex',
  alignItems: 'center',
  marginLeft: '8px',
}));

export const ShowAddressContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  marginBottom: '32px',
  fontFamily: 'Manrope',
  [theme.breakpoints.down('desktop')]: {
    fontSize: '14px',
    marginBottom: '16px',
  },
}));

export const Subtitle = styled('div')(({ theme }) => ({
  fontFamily: 'Bricolage Grotesque',
  fontSize: '30px',
  fontWeight: 500,
  marginBottom: 10,
  [theme.breakpoints.down('desktop')]: {
    fontSize: '24px',
    marginBottom: 0,
  },
}));

export const Background = styled(Grid)(({ theme }) => ({
  position: 'absolute',
  top: '80px',
  left: '70px',
  right: '70px',
  height: '45%',
  width: 'calc(100% - 140px)',
  backgroundImage: `url(${gridBackground})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  zIndex: -1,
  [theme.breakpoints.down('mediumDesktop')]: {
    left: '40px',
    right: '40px',
    width: 'calc(100% - 80px)',
  },
  [theme.breakpoints.down('laptop')]: {
    display: 'none',
  },
}));

export const EmptyContainer = styled(Grid)(({ theme }) => ({
  fontFamily: 'Manrope',
  maxHeight: '350px',
  minHeight: '350px',
  borderRadius: theme.spacing(1),
  background: theme.palette.background.default,
}));
