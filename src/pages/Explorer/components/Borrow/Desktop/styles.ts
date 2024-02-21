import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';
import { createShouldForwardProp } from '../../../../../utils';

interface IProps {
  _empty: boolean;
}

export const Container = styled(Grid, {
  shouldForwardProp: createShouldForwardProp(['_empty']),
})<IProps>(({ theme, _empty }) => ({
  fontFamily: 'Manrope',
  width: '100%',
  borderRadius: theme.spacing(1),
  maxHeight: '350px',
  minHeight: '350px',
  ...(_empty && { height: '350px' }),
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

export const AssetInfo = styled(Grid)(({ theme }) => ({
  height: '44px',
  borderBottom: `1px solid ${theme.palette.primary.dark}`,
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '32px',
  paddingRight: '32px',
}));

export const Row = styled(Grid)(({ theme }) => ({
  height: '46px',
  borderBottom: `1px solid ${theme.palette.primary.dark}`,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '32px',
  paddingRight: '32px',
}));

export const ScrollableContent = styled('div', {
  shouldForwardProp: createShouldForwardProp(['_empty']),
})<IProps>(({ _empty }) => ({
  overflowY: 'auto',
  height: 'calc(100% - 120px)',
  ...(_empty && { height: '100%' }),
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
