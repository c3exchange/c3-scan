import Grid from '@mui/material/Grid';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import * as S from './styles';

interface IDecoderBox {
  message: string;
  onChange: (value: string) => void;
  onDecode: () => void;
}
const DecoderBox = ({ message, onChange, onDecode }: IDecoderBox) => {
  return (
    <S.Container container>
      <S.Title>
        Use this tool to decode the message your wallet is prompted to sign when using C3.
      </S.Title>
      <S.Subtitle>
        It will translate it from base64 format to text using the open-source algorithm
        found{' '}
        <S.Here onClick={() => window.open('https://github.com/c3exchange/c3-scan/')}>
          here
        </S.Here>
      </S.Subtitle>
      <S.InputTitle>Input Encoded Message (Base64)</S.InputTitle>
      <S.InputText
        rows={6}
        multiline
        value={message}
        autoComplete="off"
        placeholder="Paste here the encoded message your wallet prompted to sign"
        onChange={(event) => onChange(event.target.value)}
      />
      <Grid item xs={12}>
        <CustomButton disabled={!message} onClick={onDecode}>
          Decode Message
        </CustomButton>
      </Grid>
    </S.Container>
  );
};

export default DecoderBox;
