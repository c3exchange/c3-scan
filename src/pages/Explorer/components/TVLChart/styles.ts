import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';

const BaseTVLChartContainer = styled(Grid)(({ theme }) => ({
  height: '408px',
  minHeight: '408px',
  maxHeight: '408px',
  overflow: 'hidden',
  borderRadius: theme.spacing(1),
  marginBottom: '16px',
}));

const BaseTVLChartTitle = styled(Grid)(() => ({
  fontFamily: 'Bricolage Grotesque',
  height: '38px',
  minHeight: '38px',
  maxHeight: '38px',
  display: 'flex',
  alignItems: 'center',
  fontSize: '14px',
}));

const BaseTVLChart = styled('div')();

export const TVLChartContainerMobile = styled(BaseTVLChartContainer)();

export const TVLChartTitleMobile = styled(BaseTVLChartTitle)(() => ({
  paddingLeft: '10px',
}));

export const TVLChartMobile = styled(BaseTVLChart)(({ theme }) => ({
  paddingLeft: '0px',
  width: '100%',
  height: '370px',
  background: theme.palette.background.default,
  borderRadius: theme.spacing(1),
}));

export const TVLChartContainerDesktop = styled(BaseTVLChartContainer)(({ theme }) => ({
  background: theme.palette.background.default,
}));

export const TVLChartTitleDesktop = styled(BaseTVLChartTitle)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.primary.dark}`,
  paddingLeft: '32px',
}));

export const TVLChartDesktop = styled(BaseTVLChart)(() => ({
  paddingLeft: '13px',
  width: 'calc(100% - 32px)',
}));
