import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';

export const TVLChartContainer = styled(Grid)(({ theme }) => ({
  height: '408px',
  minHeight: '408px',
  maxHeight: '408px',
  overflow: 'hidden',
  borderRadius: theme.spacing(1),
  marginBottom: '16px',
}));

export const TVLChartTitle = styled(Grid)(({ theme }) => ({
  fontFamily: 'Bricolage Grotesque',
  height: '38px',
  minHeight: '38px',
  maxHeight: '38px',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '10px',
  fontSize: '14px',
}));

export const TVLChart = styled('div')(({ theme }) => ({
  paddingLeft: '0px',
  width: '100%',
  background: theme.palette.background.default,
  borderRadius: theme.spacing(1),
}));
