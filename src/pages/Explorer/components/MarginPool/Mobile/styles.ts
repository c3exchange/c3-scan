import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';
import { createShouldForwardProp } from '../../../../../utils';

export interface IItem {
  _isTitle?: boolean;
}

export interface ICompoundItem {
  _isUSDValue?: boolean;
}

export const Container = styled(Grid)(({ theme }) => ({
  fontFamily: 'Manrope',
  width: '100%',
  maxHeight: '860px',
  minHeight: '800px',
  color: theme.palette.primary.contrastText,
  display: 'flex',
  flexDirection: 'column',
  fontSize: '12px',
}));

export const Title = styled(Grid)(() => ({
  fontFamily: 'Bricolage Grotesque',
  height: '38px',
  display: 'flex',
  alignItems: 'center',
  fontSize: '14px',
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
  fontWeight: 500,
  padding: '5px 10px',
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

export const CompoundRow = styled(Grid)(({ theme }) => ({
  height: 46,
  display: 'flex',
  alignItems: 'center',
  fontWeight: 500,
  padding: '5px 10px',
  borderBottom: `1px solid ${theme.palette.primary.dark}`,
}));

export const CompoundItem = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyItems: 'space-between',
  alignItems: 'flex-end',
}));

export const CompoundItemValue = styled('span', {
  shouldForwardProp: createShouldForwardProp(['_isUSDValue']),
})<ICompoundItem>(({ theme, _isUSDValue }) => ({
  color: _isUSDValue ? theme.palette.text.primary : theme.palette.primary.contrastText,
}));
