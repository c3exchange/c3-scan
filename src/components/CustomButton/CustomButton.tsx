import * as S from './styles';
import { ButtonProps as MUIButtonProps } from '@mui/material/Button';

export interface CustomButtonProps extends MUIButtonProps {
  height?: string;
}

const CustomButton: React.FC<CustomButtonProps> = (props) => (
  <S.Button height={props.height} {...props} disableRipple />
);

export default CustomButton;
