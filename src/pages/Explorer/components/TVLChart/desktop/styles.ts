import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';

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

export const TVLChart = styled('div')(({ theme }) => ({
  paddingLeft: '13px',
  width: 'calc(100% - 32px)',
}));
