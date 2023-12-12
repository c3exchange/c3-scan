import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';

export const Container = styled(Grid)(() => ({
  maxWidth: '1400px',
}));

export const Title = styled(Grid)(({ theme }) => ({
  fontFamily: 'Bricolage Grotesque',
  fontSize: '40px',
  fontWeight: 600,
  lineHeight: '120%',
  letterSpacing: '-1.6px',
  marginBottom: '32px',
  [theme.breakpoints.down('desktop')]: {
    fontSize: '28px',
    marginBottom: '16px',
  },
}));

export const BannerContainer = styled(Grid)(() => ({
  marginTop: '40px',
}));
