import * as S from './styles';
import { ButtonProps as MUIButtonProps } from '@mui/material/Button';

interface CustomButtonProps extends MUIButtonProps {
  _height?: string;
  _width?: string;
  _maxWidth?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  _height,
  _width,
  _maxWidth,
  ...props
}) => (
  <S.Button
    _height={_height}
    _width={_width}
    _maxWidth={_maxWidth}
    {...props}
    disableRipple
  />
);

export default CustomButton;
