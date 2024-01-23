import { ReactNode } from 'react';
import Icon from '../Icon/Icon';
import * as S from './styles';
import { TextFieldProps as MUITextFieldProps } from '@mui/material/TextField';

interface ICustomInputProps {
  startAdornment?: ReactNode;
  onClear?: () => void;
}
const CustomInput: React.FC<ICustomInputProps & MUITextFieldProps> = (props) => {
  return (
    <S.Input
      error={props.error}
      InputProps={{
        endAdornment: props.onClear && !!props.value && (
          <S.EndAdornment onClick={() => props.onClear!()}>
            <Icon name="close" height={16} width={16} />
          </S.EndAdornment>
        ),
        startAdornment: !!props.startAdornment && (
          <S.StartAdornment>{props.startAdornment}</S.StartAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default CustomInput;
