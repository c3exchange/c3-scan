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
  minHeight: '38px',
  maxHeight: '38px',
  borderBottom: `1px solid ${theme.palette.primary.dark}`,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '32px',
  fontSize: '14px',
}));

export const AssetInfo = styled(Grid)(({ theme }) => ({
  height: '52px',
  minHeight: '52px',
  maxHeight: '52px',
  padding: '4px 32px',
  paddingRight: '128px',
  borderBottom: `1px solid ${theme.palette.primary.dark}`,
  color: theme.palette.text.primary,
  fontWeight: '500',
  display: 'flex',
  alignItems: 'center',
}));

export const Row = styled(Grid)(({ theme }) => ({
  height: '46px',
  minHeight: '46px',
  maxHeight: '46px',
  padding: '8px 32px',
  paddingRight: '128px',
  borderBottom: `1px solid ${theme.palette.primary.dark}`,
  display: 'flex',
  alignItems: 'center',
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

export const ValorizedCompoundColumn = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  gap: '4px',
}));

export const CompoundTitle = styled(Grid)(({ theme }) => ({
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '2px',
  background: '#000',
  fontSize: '10px',
}));

export const CompoundSubtitle = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  lineHeight: '20px',
  padding: '0 8px',
}));

export const ValorizedInfoContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0 8px',
}));

export const RightAlignedGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
}));
