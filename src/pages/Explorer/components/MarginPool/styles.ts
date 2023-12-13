import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';
export const Container = styled(Grid)(({ theme }) => ({
  fontFamily: 'Manrope',
  background: theme.palette.background.default,
  width: '100%',
  borderRadius: theme.spacing(1),
  height: '312px',
  fontSize: '12px',
}));

export const Title = styled(Grid)(({ theme }) => ({
  fontFamily: 'Bricolage Grotesque',
  borderBottom: `1px solid ${theme.palette.primary.dark}`,
  fontSize: '14px',
  height: '38px',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '32px',
  fontWeight: 500,
  lineHeight: '100%' /* 14px */,
  letterSpacing: '-0.7px',
}));
export const AssetInfo = styled(Grid)(({ theme }) => ({
  height: '44px',
  borderBottom: `1px solid ${theme.palette.primary.dark}`,
  paddingLeft: '32px',
  display: 'flex',
  alignItems: 'center',
  fontSize: '12px',
  fontWeight: 500,
  lineWeight: '20px',
  color: theme.palette.text.primary,
}));
export const ScrollableContent = styled(Grid)(() => ({
  overflowY: 'auto',
  maxHeight: 'calc(100% - 82px)',
  '&::-webkit-scrollbar': {
    width: '4px',
  },
}));
export const Row = styled(Grid)(({ theme }) => ({
  height: '46px',
  borderBottom: `1px solid ${theme.palette.primary.dark}`,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '32px',
}));

export const IconContainer = styled('span')(() => ({
  marginRight: '4px',
}));
export const AssetIconContainer = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
}));
