import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import styled from '@mui/material/styles/styled';
import { createShouldForwardProp } from '../../../../utils';

export const Container = styled(Grid)(({ theme }) => ({
  fontFamily: 'Manrope',
  background: theme.palette.background.default,
  width: '100%',
  borderRadius: 8,
  minHeight: '452px',
  padding: '32px',
  [theme.breakpoints.down('desktop')]: {
    padding: '32px 15px',
  },
}));

export const Title = styled(Grid)(({ theme }) => ({
  fontFamily: 'Bricolage Grotesque',
  fontSize: '24px',
  fontWeight: 500,
  lineHeight: '110%',
  letterSpacing: '-0.96px',
  marginBottom: '16px',
}));

export const Subtitle = styled(Grid)(({ theme }) => ({
  color: theme.palette.info.main,
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '130%',
  letterSpacing: '0.32px',
  marginBottom: '24px',
}));

export const Here = styled('span')(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '130%',
  letterSpacing: '0.32px',
  textDecoration: 'underline',
  cursor: 'pointer',
}));

export const InputTitle = styled(Grid)(() => ({
  marginBottom: '16px',
  fontFamily: 'Bricolage Grotesque',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '100%',
  letterSpacing: '-0.14px',
}));

export const InputText = styled(TextField)(({ theme }) => ({
  height: '160px',
  width: '100%',
  borderRadius: '8px',
  border: `2px solid ${theme.palette.text.disabled}`,
  marginBottom: '16px',
  '&:hover': {
    border: `2px solid ${theme.palette.text.disabled}`,
  },
  // '& .MuiInputBase-root': {
  //   height: 'auto', // Asegura que la altura se ajuste al contenido
  // },
  // '& .MuiInputBase-inputMultiline': {
  //   height: 'auto', // Ajusta automáticamente la altura
  //   maxHeight: '160px', // Altura máxima antes de hacer scroll
  //   overflowY: 'auto', // Habilita el desplazamiento vertical
  // },
  '& .MuiOutlinedInput-root': {
    fieldset: {
      border: 'none',
    },

    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
  },
  '& input': {
    color: theme.palette.primary.contrastText,
  },
}));

interface IInputContainer {
  _wrongMessage: boolean;
}

export const InputContainer = styled('div', {
  shouldForwardProp: createShouldForwardProp(['_wrongMessage']),
})<IInputContainer>(({ _wrongMessage }) => ({
  height: !_wrongMessage ? '160px' : 'auto',
  width: '100%',
  marginBottom: '16px',
}));

export const Error = styled('div')(({ theme }) => ({
  height: '36px',
  color: theme.palette.error.main,
  fontSize: '14px',
  marginTop: '4px',
}));
