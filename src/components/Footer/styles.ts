import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';

export const Container = styled(Grid)(({ theme }) => ({
  fontFamily: 'Manrope',
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: '60px',
  padding: '0px 64px',
  color: theme.palette.text.primary,
  borderTop: '1px solid #333',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('laptop')]: {
    padding: '0px 15px',
  },
}));

export const Documentation = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 400,
  marginLeft: 10,
  cursor: 'pointer',
}));

export const Separator = styled('span')(() => ({
  fontSize: 32,
}));
export const Title = styled('span')(({ theme }) => ({
  color: theme.palette.secondary.main,
  marginLeft: 8,
}));
export const SubTitle = styled('span')(() => ({
  fontWeight: 'bold',
  marginLeft: 8,
}));
