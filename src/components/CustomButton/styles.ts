import styled from '@mui/material/styles/styled';
import MUIButton from '@mui/material/Button';
import { ButtonProps as MUIButtonProps } from '@mui/material/Button';
import { createShouldForwardProp } from '../../utils';

interface CustomButtonProps extends MUIButtonProps {
  _height?: string;
  _width?: string;
  _maxWidth?: string;
}

export const Button = styled(MUIButton, {
  shouldForwardProp: createShouldForwardProp(['_width', '_height', '_maxWidth']),
})<CustomButtonProps>(({ theme, _width, _height, _maxWidth, disabled }) => ({
  width: _width || '100%',
  height: _height || '46px',
  maxWidth: _maxWidth,
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
}));
