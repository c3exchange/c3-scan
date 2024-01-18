import styled from '@mui/material/styles/styled';
import TextField from '@mui/material/TextField';
import { createShouldForwardProp } from '../../utils';
interface ICustomInput {
  onClear?: () => void;
}
export const Input = styled(TextField, {
  shouldForwardProp: createShouldForwardProp(['onClear']),
})<ICustomInput>(({ theme }) => ({
  width: '100%',
  borderRadius: theme.spacing(1),
  border: `2px solid ${theme.palette.text.disabled}`,
  backgroundColor: theme.palette.primary.dark,
  '&:hover': {
    border: `2px solid ${theme.palette.text.disabled}`,
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
  },
  '& input': {
    color: theme.palette.text.primary,
    caretColor: theme.palette.secondary.main,
  },
}));

export const EndAdornment = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  marginLeft: '5px',
}));

export const StartAdornment = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  paddingRight: '8px',
}));
