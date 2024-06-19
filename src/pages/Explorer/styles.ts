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
  flexDirection: 'column',
  gap: '16px',
  marginBottom: '32px',
  fontFamily: 'Manrope',
  [theme.breakpoints.down('desktop')]: {
    fontSize: '14px',
    marginBottom: '16px',
  },
}));

export const ShowAddressItem = styled(Grid)(({ theme }) => ({
  display: 'flex',
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

export const WrongAddressContainer = styled(Grid)(({ theme }) => ({
  fontFamily: 'Manrope',
  borderRadius: theme.spacing(1),
  maxHeight: '350px',
  minHeight: '350px',
  background: theme.palette.background.default,
  fontWeight: 700,
  [theme.breakpoints.down('mediumDesktop')]: {
    maxHeight: '240px',
    minHeight: '240px',
    marginBottom: 16,
  },
}));

export const WrongAddressTableText = styled('div')(() => ({
  marginTop: '16px',
  padding: '0 15%',
  textAlign: 'center',
}));

export const TVLChartContainer = styled(Grid)(({ theme }) => ({
  height: '408px',
  minHeight: '408px',
  maxHeight: '408px',
  overflow: 'hidden',
  background: theme.palette.background.default,
  borderRadius: theme.spacing(1),
  marginBottom: '16px',
}));

export const TVLChartTitle = styled(Grid)(({ theme }) => ({
  fontFamily: 'Bricolage Grotesque',
  height: '38px',
  minHeight: '38px',
  maxHeight: '38px',
  borderBottom: `1px solid ${theme.palette.primary.dark}`,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '32px',
  fontSize: '14px',
}));

export const TVLChart = styled('div')(() => ({
  paddingLeft: '13px',
  width: 'calc(100% - 32px)',
}));
