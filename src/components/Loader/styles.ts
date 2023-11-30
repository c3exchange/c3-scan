import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';

export const Container = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
}));

export const LoaderContainer = styled(Grid)(() => ({
  height: 100,
  width: 100,
}));
