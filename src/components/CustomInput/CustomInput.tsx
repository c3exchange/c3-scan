import Icon from '../Icon/Icon';
import * as S from './styles';
import { TextFieldProps as MUITextFieldProps } from '@mui/material/TextField';

interface ICustomInputProps {
  onClear?: () => void;
}
const CustomInput: React.FC<ICustomInputProps & MUITextFieldProps> = (props) => (
  <S.Input
    InputProps={{
      endAdornment: props.onClear && !!props.value && (
        <S.EndAdornment onClick={() => props.onClear!()}>
          <Icon name="close" height={16} width={16} />
        </S.EndAdornment>
      ),
    }}
    {...props}
  />
);

export default CustomInput;
