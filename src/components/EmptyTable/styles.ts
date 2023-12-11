import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';

export const EmptyTableContainer = styled(Grid)(() => ({
  height: '100%',
}));

export const EmptyTableItem = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
}));

export const EmptyTableIconContainer = styled('div')(() => ({
  display: 'block',
  textAlign: 'center',
}));
