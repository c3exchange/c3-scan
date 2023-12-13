import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';
import { createShouldForwardProp } from '../../../../utils';
interface IScrollableContent {
  _empty: boolean;
}
export const Container = styled(Grid)(({ theme }) => ({
  fontFamily: 'Manrope',
  width: '100%',
  borderRadius: theme.spacing(1),
  height: '304px',
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
export const ScrollableContent = styled('div', {
  shouldForwardProp: createShouldForwardProp(['_empty']),
})<IScrollableContent>(({ _empty }) => ({
  overflowY: 'auto',
  maxHeight: 'calc(100% - 82px)',
  ...(_empty && { height: '100%' }),
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

export const EmptyTableContainer = styled(Grid)(() => ({
  height: '100%',
}));
export const EmptyTableItem = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
}));

export const EmptyTableIconContainer = styled('div')(() => ({
  display: 'block',
  textAlign: 'center',
}));
