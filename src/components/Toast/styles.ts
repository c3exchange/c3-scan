import Typography from '@mui/material/Typography';
import styled from '@mui/material/styles/styled';

export const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  position: 'relative',
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.primary.contrastText,
}));

export const Message = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));
