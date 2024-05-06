import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';
import { createShouldForwardProp } from '../../../../../utils';

export interface IItem {
  _isTitle?: boolean;
}

export const Container = styled(Grid)(({ theme }) => ({
  fontFamily: 'Manrope',
  width: '100%',
  maxHeight: '740px',
  minHeight: '700px',
  color: theme.palette.primary.contrastText,
  display: 'flex',
  flexDirection: 'column',
  fontSize: '12px',
}));

export const Title = styled(Grid)(() => ({
  fontFamily: 'Bricolage Grotesque',
  height: '38px',
  minHeight: '38px',
  maxHeight: '38px',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '10px',
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

export const ScrollableContent = styled('div')(() => ({
  overflowY: 'auto',
  height: 'calc(100% - 120px)',
  '&::-webkit-scrollbar': {
    width: '4px',
  },
}));

export const Card = styled(Grid)(({ theme }) => ({
  borderRadius: '8px',
  marginBottom: '2px',
  background: theme.palette.background.default,
  border: `1px solid ${theme.palette.primary.dark}`,
}));

export const Row = styled(Grid)(({ theme }) => ({
  height: 40,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 10,
  paddingRight: 10,
  borderBottom: `1px solid ${theme.palette.primary.dark}`,
}));

export const Item = styled(Grid, {
  shouldForwardProp: createShouldForwardProp(['_isTitle']),
})<IItem>(({ theme, _isTitle }) => ({
  display: 'flex',
  alignItems: 'center',
  color: _isTitle ? theme.palette.text.primary : theme.palette.primary.contrastText,
}));

export const IconContainer = styled('span')(() => ({
  marginRight: '4px',
}));

export const Footer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '40px',
  fontSize: '12px',
  fontWeight: 700,
  lineHeight: '20px',
  borderRadius: '8px',
  background: theme.palette.background.default,
}));
