import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';

export const Container = styled(Grid)(({ theme }) => ({
  fontFamily: 'Manrope',
  width: '100%',
  borderRadius: theme.spacing(1),
  maxHeight: '350px',
  minHeight: '350px',
  background: theme.palette.background.default,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  flexDirection: 'column',
  fontSize: '12px',
}));

export const Title = styled(Grid)(({ theme }) => ({
  fontFamily: 'Bricolage Grotesque',
  height: '38px',
  borderBottom: `1px solid ${theme.palette.primary.dark}`,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '32px',
  fontSize: '14px',
}));

export const AssetInfo = styled(Grid)(({ theme }) => ({
  height: '44px',
  borderBottom: `1px solid ${theme.palette.primary.dark}`,
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '32px',
}));

export const Row = styled(Grid)(({ theme }) => ({
  height: '46px',
  borderBottom: `1px solid ${theme.palette.primary.dark}`,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '32px',
}));

export const Footer = styled(Grid)(() => ({
  marginTop: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '38px',
  fontSize: '12px',
  fontWeight: 700,
  lineHeight: '20px',
  paddingLeft: '32px',
}));

export const ScrollableContent = styled('div')(() => ({
  overflowY: 'auto',
  height: 'calc(100% - 120px)',
  '&::-webkit-scrollbar': {
    width: '4px',
  },
}));
export const AssetIconContainer = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const IconContainer = styled('span')(() => ({
  marginRight: '4px',
}));
export const AccountValue = styled('span')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '100%',
  letterSpacing: '-0.7px',
  marginLeft: '8px',
  display: 'flex',
  alignItems: 'center',
}));
export const TVLContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: '0px 0px 0px -300px',
  [theme.breakpoints.down('largeDesktop')]: {
    margin: '0px 0px 0px -55px',
  },
}));
export const TVLLabel = styled('span')(({ theme }) => ({
  display: 'inline-block',
  [theme.breakpoints.down('largeDesktop')]: {
    display: 'none',
  },
}));
