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
  const windowSize = useWindowSize();
  const isMediumDesktop = useMemo(
    () => windowSize.width < breakpoints.mediumDesktop,
    [windowSize.width]
  );
  const isMobile = useMemo(
    () => windowSize.width < breakpoints.laptop,
    [windowSize.width]
  );

  const { data: holdingAssets } = useGetC3HoldingAssets();
  const onChainC3State: ServerInstrument[] = useGetOnChainC3State(holdingAssets);
  const [message, setMessage] = useState('');
  const [decodedMessage, setDecodedMessage] = useState<DecodedMessage>();
  const [secondDecodedMessage, setSecondDecodedMessage] = useState<DecodedMessage>();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const queryMessage = queryParameters.get('message');
  const queryGroupId = queryParameters.get('groupId');
  const queryBlock = queryParameters.get('block');
  const queryBlockIndex = queryParameters.get('blockIndex');

  // Decode URL parameters on initial page load
  const [initialURLDecodeDone, setInitialURLDecodeDone] = useState(false);
  useEffect(() => {
    if (!onChainC3State.length || initialURLDecodeDone) return;
    setInitialURLDecodeDone(true);
    if (queryMessage) handleUrlMsgDecode();
    if (queryGroupId && queryBlock && queryBlockIndex) handleUrlGroupIdDecode();
  }, [onChainC3State]);

  // Decode URL parameters: groupId, block, blockIndex
  const { getGroupTxs } = useGetTransactions();
  useEffect(() => {
    setMessage('');
    if (queryGroupId && queryBlock && queryBlockIndex) handleUrlGroupIdDecode();
  }, [queryGroupId, queryBlock, queryBlockIndex]);

  const handleUrlGroupIdDecode = async () => {
    if (!onChainC3State.length) return;
    const groupId = urlParamToBase64(queryGroupId);
    const groupTxs = await getGroupTxs(groupId, queryBlock, queryBlockIndex);
    const messages = decodeMsgFromTxDetails(groupTxs, onChainC3State);
    if (messages[0]) setDecodedMessage(messages[0]);
    if (messages[1]) setSecondDecodedMessage(messages[1]);
  };

  // Decode URL parameter: message
  useEffect(() => {
    if (queryMessage) handleUrlMsgDecode();
  }, [queryMessage]);

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

  // Decode message on user input
  const onDecode = () => {
    if (!onChainC3State || !onChainC3State.length) return;
    const messageDecoded = decodeMessage(message, onChainC3State);
    if (messageDecoded) {
      setDecodedMessage(messageDecoded);
      queryParameters.set('message', message);
      queryParameters.delete('groupId');
      queryParameters.delete('block');
      queryParameters.delete('blockIndex');
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
              <DecodedInfo
                decodedMsg={decodedMessage}
                secondDecodedMsg={secondDecodedMessage}
              />
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
