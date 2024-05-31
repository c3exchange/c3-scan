import Grid from '@mui/material/Grid';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import * as S from './styles';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import { theme } from '../../../../theme';

interface IDecoderBox {
  message: string;
  wrongMessage: boolean;
  onChange: (value: string) => void;
  onDecode: () => void;
}
const DecoderBox = ({ message, wrongMessage, onChange, onDecode }: IDecoderBox) => {
  return (
    <S.Container container>
      <S.Title item mobile={12}>
        Use this tool to decode the message your wallet is prompted to sign when using C3.
      </S.Title>
      <S.Subtitle item mobile={12}>
        It will translate it from base64 format to text using the open-source algorithm
        found &nbsp;
        <S.Here onClick={() => window.open('https://github.com/c3exchange/c3-scan/')}>
          here
        </S.Here>
      </S.Subtitle>
      <S.InputTitle item mobile={12}>
        Input Encoded Message (Base64)
      </S.InputTitle>
      <S.InputContainer _wrongMessage={wrongMessage}>
        <CustomInput
          _height="160px"
          _background={theme.palette.background.default}
          rows={6}
          multiline
          value={message}
          autoComplete="off"
          placeholder="Paste here the encoded message your wallet prompted to sign"
          onChange={(event) => onChange(event.target.value)}
          error={wrongMessage}
        />
        {wrongMessage && (
          <S.Error>The content you are trying to decode is not a valid format.</S.Error>
        )}
      </S.InputContainer>
      <Grid item mobile={12}>
        <CustomButton disabled={!message} onClick={onDecode}>
          Decode Message
        </CustomButton>
      </Grid>
    </S.Container>
  );
};

export default DecoderBox;
