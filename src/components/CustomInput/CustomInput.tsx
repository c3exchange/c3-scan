import { ReactNode } from 'react';
import * as S from './styles';
import { TextFieldProps as MUITextFieldProps } from '@mui/material/TextField';

interface ICustomInputProps {
  start_adornment?: ReactNode;
  end_adornment?: ReactNode;
  onClear?: () => void;
}

const CustomInput: React.FC<ICustomInputProps & MUITextFieldProps> = (props) => {
  return (
    <S.Input
      onBlur={props.onBlur}
      inputRef={props.inputRef}
      error={props.error}
      {...props}
      InputProps={{
        endAdornment: !!props.end_adornment && (
          <S.EndAdornment>{props.end_adornment}</S.EndAdornment>
        ),
        startAdornment: !!props.start_adornment && (
          <S.StartAdornment>{props.start_adornment}</S.StartAdornment>
        ),
      }}
    />
  );
};

export default CustomInput;
