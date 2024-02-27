import styled from '@mui/material/styles/styled';
import TextField from '@mui/material/TextField';
import { createShouldForwardProp } from '../../utils';
interface ICustomInput {
  onClear?: () => void;
  error?: boolean;
}
export const Input = styled(TextField, {
  shouldForwardProp: createShouldForwardProp(['onClear']),
})<ICustomInput>(({ theme, error }) => ({
  width: '100%',
  borderRadius: theme.spacing(1),
  border: `2px solid ${error ? theme.palette.error.main : theme.palette.text.disabled}`,
  backgroundColor: theme.palette.primary.dark,
  '&:hover': {
    border: `2px solid ${error ? theme.palette.error.main : theme.palette.text.disabled}`,
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
    '&.Mui-error fieldset': {
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
  marginRight: '8px',
}));
