import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';
export const Container = styled(Grid)(() => ({}));

export const MarginPoolContainer = styled(Grid)(() => ({
  marginTop: '16px',
}));

export const AddressLabel = styled('div')(({ theme }) => ({
  color: theme.palette.secondary.main,
  marginRight: '2px',
}));
export const ShowAddressContainer = styled(Grid)(() => ({
  marginBottom: '32px',
  fontFamily: 'Manrope',
}));
