import { ReactNode } from 'react';
import * as S from './styles';
import { TextFieldProps as MUITextFieldProps } from '@mui/material/TextField';

interface ICustomInputProps {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  _height?: string;
  _background?: string;
}

const CustomInput: React.FC<ICustomInputProps & MUITextFieldProps> = ({
  startAdornment,
  endAdornment,
  ...props
}) => {
  return (
    <S.Input
      {...props}
      InputProps={{
        endAdornment: !!endAdornment && <S.EndAdornment>{endAdornment}</S.EndAdornment>,
        startAdornment: !!startAdornment && (
          <S.StartAdornment>{startAdornment}</S.StartAdornment>
        ),
      }}
    />
  );
};

export default CustomInput;
