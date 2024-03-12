import { useEffect, useMemo, useState } from 'react';
import Grid from '@mui/material/Grid';
import Banner from '../../components/Banner/Banner';
import { ReactComponent as DecoderLogo } from '../../assets/images/decoderLogo.svg';
import DecoderBox from './components/DecoderBox/DecoderBox';

import DecodedInfo from './components/DecodedInfo/DecodedInfo';
import { UrlMsgToBase64Msg, decodeMessage } from '../../utils';
import { DecodedMessage } from '../../interfaces/interfaces';
import { useGetC3HoldingAssets } from '../../hooks/useGetHoldingAssets';
import { useGetOnChainC3State } from '../../hooks/useGetOnChainC3State';
import { useWindowSize } from '../../hooks/useWindowSize';
import { breakpoints } from '../../theme';

import * as S from './styles';
import { useLocation, useNavigate } from 'react-router-dom';

const Decoder = () => {
  const windowSize = useWindowSize();
  const isMediumDesktop = useMemo(
    () => windowSize.width < breakpoints.mediumDesktop,
    [windowSize.width]
  );
  const isMobile = useMemo(
    () => windowSize.width < breakpoints.laptop,
    [windowSize.width]
  );

  const [message, setMessage] = useState('');
  const [decodedMessage, setDecodedMessage] = useState<DecodedMessage>();
  const { data: holdingAssets } = useGetC3HoldingAssets();
  const onChainC3State = useGetOnChainC3State(holdingAssets);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const queryMessage = queryParams.has('message')
    ? queryParams.get('message') || ''
    : undefined;

  useEffect(() => {
    if (queryMessage && !decodedMessage) {
      setMessage(queryMessage);
      onUrlDecode(UrlMsgToBase64Msg(queryMessage));
    }
  }, [queryMessage, onChainC3State]);

  const onUrlDecode = (msg: string) => {
    if (!onChainC3State || !onChainC3State.length) return;
    const messageDecoded = decodeMessage(msg, onChainC3State);
    if (messageDecoded) setDecodedMessage(messageDecoded);
  };

  const onDecode = () => {
    if (!onChainC3State || !onChainC3State.length) return;
    const messageDecoded = decodeMessage(message, onChainC3State);
    if (messageDecoded) {
      setDecodedMessage(messageDecoded);
      queryParams.set('message', message);
      navigate(`?${queryParams.toString()}`);
    }
  };

  return (
    <S.Container>
      <S.Title>C3 Base64 Decoder</S.Title>
      <Grid item mobile={12}>
        <Grid container spacing={4}>
          <Grid item mobile={12} mediumDesktop={7} largeDesktop={6}>
            <DecoderBox message={message} onChange={setMessage} onDecode={onDecode} />
          </Grid>
          <Grid item mobile={12} mediumDesktop={5} largeDesktop={6}>
            {decodedMessage ? (
              <DecodedInfo decodedMsg={decodedMessage} />
            ) : (
              !isMediumDesktop && <DecoderLogo width="100%" height={430} />
            )}
          </Grid>
        </Grid>
      </Grid>
      <S.BannerContainer item mobile={12}>
        <Banner separator={isMobile} />
      </S.BannerContainer>
    </S.Container>
  );
};

export default Decoder;
