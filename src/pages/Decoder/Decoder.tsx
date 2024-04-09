import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Banner from '../../components/Banner/Banner';
import { ReactComponent as DecoderLogo } from '../../assets/images/decoderLogo.svg';
import DecoderBox from './components/DecoderBox/DecoderBox';
import DecodedInfo from './components/DecodedInfo/DecodedInfo';
import { urlParamToBase64, decodeMessage, decodeMsgFromTxDetails } from '../../utils';
import { DecodedMessage } from '../../interfaces/interfaces';
import { useGetC3HoldingAssets } from '../../hooks/useGetHoldingAssets';
import { useGetOnChainC3State } from '../../hooks/useGetOnChainC3State';
import { useWindowSize } from '../../hooks/useWindowSize';
import { breakpoints } from '../../theme';
import { ServerInstrument } from '@c3exchange/common';

import * as S from './styles';
import { useGetTransactions } from '../../hooks/useGetTransactions';

const Decoder = () => {
  const { getGroupTxs } = useGetTransactions();

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
  const onChainC3State: ServerInstrument[] = useGetOnChainC3State(holdingAssets);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);

  const queryGroupId = queryParameters.get('groupId');
  const queryBlock = queryParameters.get('block');
  const queryIndex = queryParameters.get('index');
  useEffect(() => {
    if (queryGroupId && queryBlock && queryIndex) handleUrlGroupIdDecode();
  }, [queryGroupId, queryBlock, queryIndex]);

  const handleUrlGroupIdDecode = async () => {
    if (!queryGroupId || !queryBlock || !queryIndex) return;
    if (!onChainC3State.length) return;
    const groupId = urlParamToBase64(queryGroupId);
    const groupTxs = await getGroupTxs(groupId, queryBlock, queryIndex);
    const msg = decodeMsgFromTxDetails(groupTxs, onChainC3State);
    if (msg) setDecodedMessage(msg);
  };

  const queryMessage = queryParameters.get('message');
  useEffect(() => {
    if (queryMessage) handleUrlMsgDecode();
  }, [queryMessage]);

  const [initialURLDecodeDone, setInitialURLDecodeDone] = useState(false);
  useEffect(() => {
    if (!onChainC3State.length || initialURLDecodeDone) return;
    setInitialURLDecodeDone(true);
    if (queryMessage) handleUrlMsgDecode();
    if (queryGroupId && queryBlock) handleUrlGroupIdDecode();
  }, [onChainC3State]);

  const handleUrlMsgDecode = () => {
    if (!decodedMessage || message !== queryMessage) {
      onUrlMsgDecode(urlParamToBase64(queryMessage));
    }
  };

  const onUrlMsgDecode = (queryMessageBase64: string) => {
    setMessage(queryMessageBase64);
    if (!onChainC3State || !onChainC3State.length) return;
    const messageDecoded = decodeMessage(queryMessageBase64, onChainC3State);
    if (messageDecoded) setDecodedMessage(messageDecoded);
  };

  const onDecode = () => {
    if (!onChainC3State || !onChainC3State.length) return;
    const messageDecoded = decodeMessage(message, onChainC3State);
    if (messageDecoded) {
      setDecodedMessage(messageDecoded);
      queryParameters.set('message', message);
      navigate(`?${queryParameters.toString()}`);
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
