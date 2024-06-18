import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';
import { createShouldForwardProp } from '../../../../utils';
export const Container = styled(Grid)(({ theme }) => ({
  fontFamily: 'Manrope',
  background: theme.palette.background.default,
  width: '100%',
  borderRadius: 8,
  minHeight: '452px',
  paddingLeft: 16,
  paddingRight: 16,
  paddingBottom: 24,
  paddingTop: 40,
}));

export const Title = styled(Grid)(() => ({
  fontFamily: 'Bricolage Grotesque',
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '100%',
  letterSpacing: '-0.16px',
  marginBottom: '16px',
}));

export const Row = styled(Grid)(({ theme }) => ({
  background: theme.palette.primary.dark,
  height: '44px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: '8px',
  marginBottom: '8px',
  paddingLeft: '10px',
  paddingRight: '10px',
}));

interface IWideRow {
  _amountValues: number;
}
export const WideRow = styled(Grid, {
  shouldForwardProp: createShouldForwardProp(['_amountValues']),
})<IWideRow>(({ theme, _amountValues }) => ({
  background: theme.palette.primary.dark,
  height: `calc((19px + 5px) * ${_amountValues} - 5px + 25px)`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: '8px',
  marginBottom: '8px',
  paddingLeft: '10px',
  paddingRight: '10px',
}));

export const Label = styled(Grid)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '30%',
  fontSize: '14px',
  textAlign: 'left',
}));

export const LabelDoubleValue = styled(Grid)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '20%',
  fontSize: '14px',
  textAlign: 'left',
}));

export const Value = styled(Grid)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontWeight: 500,
  fontSize: '14px',
}));

export const SecondaryValue = styled('span')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 300,
  fontSize: '14px',
}));

export const DoubleValue = styled(Grid)({
  width: '70%',
  gap: '5%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const MultiValue = styled(Grid)({
  gap: '5px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-end',
});

export const ValueRight = styled(Grid)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontWeight: 500,
  fontSize: '14px',
  textAlign: 'right',
}));
