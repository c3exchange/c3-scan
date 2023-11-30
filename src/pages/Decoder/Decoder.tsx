import Grid from '@mui/material/Grid';
import Banner from '../../components/Banner/Banner';
import { ReactComponent as DecoderLogo } from '../../assets/images/decoderLogo.svg';
import DecoderBox from './components/DecoderBox/DecoderBox';
import { useState } from 'react';
import DecodedInfo from './components/DecodedInfo/DecodedInfo';
import { decodeMessage } from '../../utils';
import { DecodedMessage } from '../../interfaces/interfaces';
import { useGetC3HoldingAssets } from '../../hooks/useGetHoldingAssets';
import { useGetOnChainC3State } from '../../hooks/useGetOnChainC3State';
import * as S from './styles';

const Decoder = () => {
  const [message, setMessage] = useState('');
  const [decodedMessage, setDecodedMessage] = useState<DecodedMessage>();
  const { holdingAssets } = useGetC3HoldingAssets();
  const onChainC3State = useGetOnChainC3State(holdingAssets);
  const onDecode = () => {
    const messageDecoded = decodeMessage(message, onChainC3State);
    if (messageDecoded) setDecodedMessage(messageDecoded);
  };
  return (
    <S.Container>
      <S.Title>C3 Base64 Decoder</S.Title>
      <Grid item xs={12}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <DecoderBox message={message} onChange={setMessage} onDecode={onDecode} />
          </Grid>
          <Grid item xs={6}>
            {decodedMessage ? (
              <DecodedInfo decodedMsg={decodedMessage} />
            ) : (
              <DecoderLogo width={566} height={430} />
            )}
          </Grid>
        </Grid>
      </Grid>
      <S.BannerContainer item xs={12}>
        <Banner />
      </S.BannerContainer>
    </S.Container>
  );
};

export default Decoder;
