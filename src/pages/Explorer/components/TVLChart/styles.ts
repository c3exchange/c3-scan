import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';

export const TVLChartContainer = styled(Grid)(({ theme }) => ({
  height: '408px',
  minHeight: '408px',
  maxHeight: '408px',
  overflow: 'hidden',
  borderRadius: theme.spacing(1),
  marginBottom: '16px',
  background: theme.palette.background.default,
  [theme.breakpoints.down('desktop')]: {
    marginTop: '16px',
  },
}));

export const TVLChartTitle = styled(Grid)(() => ({
  fontFamily: 'Bricolage Grotesque',
  height: '38px',
  minHeight: '38px',
  maxHeight: '38px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '14px',
  paddingLeft: '32px',
  paddingRight: '32px',
}));

export const TVLChart = styled('div')(() => ({
  paddingLeft: '13px',
  width: 'calc(100% - 25px)',
}));

export const DefiLlamaURL = styled('a')(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontFamily: 'Manrope',
  fontWeight: 600,
}));
