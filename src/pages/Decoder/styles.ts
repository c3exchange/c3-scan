import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';
export const Container = styled(Grid)(() => ({}));
export const Title = styled(Grid)(() => ({
  fontFamily: 'Bricolage Grotesque',
  fontSize: '40px',
  fontWeight: 600,
  lineHeight: '120%',
  letterSpacing: '-1.6px',
  marginBottom: '32px',
}));

export const BannerContainer = styled(Grid)(() => ({
  marginTop: '40px',
}));
