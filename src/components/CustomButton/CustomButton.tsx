import * as S from './styles';
import { ButtonProps as MUIButtonProps } from '@mui/material/Button';

interface CustomButtonProps extends MUIButtonProps {
  height?: string;
  width?: string;
  maxWidth?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ maxWidth, ...props }) => (
  <S.Button
    height={props.height}
    width={props.width}
    _maxWidth={maxWidth}
    {...props}
    disableRipple
  />
);

export default CustomButton;
