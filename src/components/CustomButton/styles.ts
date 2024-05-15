import styled from '@mui/material/styles/styled';
import MUIButton from '@mui/material/Button';
import { CustomButtonProps } from './CustomButton';

export const Button = styled(MUIButton)<CustomButtonProps>(
  ({ theme, width, height, maxWidth, disabled }) => ({
    width: width || '100%',
    height: height || '46px',
    maxWidth: maxWidth || '',
    borderRadius: theme.spacing(1),
    textTransform: 'none',
    background: disabled ? theme.palette.background.paper : theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    ':hover': {
      background: disabled ? theme.palette.background.paper : theme.palette.primary.main,
    },
    '&.Mui-disabled': {
      color: '#8F9193',
    },
  })
);
