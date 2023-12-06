import * as S from './styles';
import { ButtonProps as MUIButtonProps } from '@mui/material/Button';

export interface CustomButtonProps extends MUIButtonProps {
  height?: string;
  width?: string;
}

const CustomButton: React.FC<CustomButtonProps> = (props) => (
  <S.Button height={props.height} width={props.width} {...props} disableRipple />
);

export default CustomButton;
