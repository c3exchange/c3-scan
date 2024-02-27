import { ReactNode } from 'react';
import * as S from './styles';
import { TextFieldProps as MUITextFieldProps } from '@mui/material/TextField';

interface ICustomInputProps {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  onClear?: () => void;
}
const CustomInput: React.FC<ICustomInputProps & MUITextFieldProps> = (props) => {
  return (
    <S.Input
      error={props.error}
      InputProps={{
        endAdornment: !!props.endAdornment && (
          <S.EndAdornment>{props.endAdornment}</S.EndAdornment>
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
