import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Banner from '../../components/Banner/Banner';
import { ReactComponent as DecoderLogo } from '../../assets/images/decoderLogo.svg';
import DecoderBox from './components/DecoderBox/DecoderBox';
import DecodedInfo from './components/DecodedInfo/DecodedInfo';
import { urlMsgToBase64Msg, decodeMessage } from '../../utils';
import { DecodedMessage } from '../../interfaces/interfaces';
import { useGetC3HoldingAssets } from '../../hooks/useGetHoldingAssets';
import { useGetOnChainC3State } from '../../hooks/useGetOnChainC3State';
import { useWindowSize } from '../../hooks/useWindowSize';
import { breakpoints } from '../../theme';
import { /*CHAIN_ID_ALGORAND, CHAIN_UTILS,*/ ServerInstrument } from '@c3exchange/common';

import * as S from './styles';
/*import { useGetTransactionDetails } from '../../hooks/useGetTransactionDetails';
import algosdk from 'algosdk';*/
import { useWebScrapping } from '../../hooks/useWebScrapping';

const Decoder = () => {
  /*const {
    fetchTransactionDetails,
    qTransaction,
    fetchPrices,
    fetchPrices2,
    fetchLedgerStateDelta,
  } = useGetTransactionDetails();*/
  const { getData } = useWebScrapping();

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
  const queryMessage = queryParameters.get('message');
  const queryTransactionId = queryParameters.get('txId');

  useEffect(() => {
    // fetchTransactionDetails();
    // console.log('----------------------------------------------------');
    // console.log('qTransaction', qTransaction);
    // console.log('----------------------------------------------------');
    //KEMzLklPKTAAAAAAAAAAAAAAAAChpiMJAK43f0ID+RYjnQmdQXNiQL5iYvPRe+8EnBFUbZUmM4tnzJtdVgrbee996F6X4bz3AAAAAAI+jg0CBAAAAAAX14QA
    /*const fetchData = async () => {
      try {
        const result = await fetchPrices(queryTransactionId);
        console.log('result', result);
        console.log(
          'result.transaction.application-transaction.application-args',
          result.transaction['application-transaction']['application-args']
        );

        const max =
          result.transaction['application-transaction']['application-args'].length;
        for (let i = 0; i < max; i++) {
          const b: string = result.transaction['application-transaction']['application-args'][i];
          console.log('b', b);
          const b2 = new Uint8Array(Array.from(atob(b), (char) => char.charCodeAt(0)));
          console.log('b2', b2);

          // if (i===1) {
          //   const b3 = b.split('/');
          //   console.log('b3', b3);
          //   const b4 = new Uint8Array(Array.from(atob(b3[2]), (char) => char.charCodeAt(0)));
          //   console.log('b4', b4);
          // }

          if (b2.length === 32) {
            // es diferente a cualquier address q aparece en la TX
            // const address = algosdk.encodeAddress(b2);
            // console.log('address', address);
            // let value = CHAIN_UTILS[CHAIN_ID_ALGORAND].getAddressByPublicKey(b2);
            // console.log('value', value);
          }
        }

        return result;
      } catch (error) {
        console.error('Error fetching transaction details:', error);
      }
    };*/

    /*const fetchData2 = async () => {
      const result = await fetchLedgerStateDelta();
      console.log('ledger', result);
    };
    const fetchData3 = async () => {
      const result = await fetchPrices2(queryTransactionId || '');
      console.log('txResult', result);
    };*/

    // if (queryTransactionId) fetchData2();
    // if (queryTransactionId) fetchData();
    // if (queryTransactionId) fetchData3();
    getData();
  }, [queryTransactionId]);

  useEffect(() => {
    if (queryMessage) handleUrlDecode();
  }, [queryMessage]);

  const [initialURLDecodeDone, setInitialURLDecodeDone] = useState(false);
  useEffect(() => {
    if (!onChainC3State.length || initialURLDecodeDone) return;
    setInitialURLDecodeDone(true);
    if (queryMessage) handleUrlDecode();
  }, [onChainC3State]);

  const handleUrlDecode = () => {
    if (!decodedMessage || message !== queryMessage) {
      onUrlDecode(urlMsgToBase64Msg(queryMessage));
    }
  };

  const onUrlDecode = (queryMessageBase64: string) => {
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
