import { useQuery } from 'react-query';
import { useGlobalContext } from '../contexts/GlobalContext';
import algosdk from 'algosdk';
import { useConfig } from './useConfig';

export const useGetTransactionDetails = () => {
  const config = useConfig();
  const { algoClient, algoIndexer } = useGlobalContext();
  const transactionId = 'ADFSJT2GOWXUHEA6DPCJKRYZXLZX7GCXML7P5NGYJ5GG7EZJO6IQ';
  const groupId = 'f1%2F404mfqYOv7hMBSndw35qJdbBUkwoUW4pEKbtCno0%3D';

  const fetchPrices2 = async (txId: string) => {
    // const url = `${config.indexer}/v2/transactions/group/${txId}`;
    // const response = await fetch(url);
    const response = await algoIndexer.searchForTransactions().txid(txId).do();
    // if (!response.ok) throw new Error('Error fetching prices');
    return response; //.json();
  };

  // Fetch the ledger state delta for the transaction group
  async function fetchLedgerStateDelta() {
    try {
      const url = `https://testnet.explorer.perawallet.app/tx-group/${groupId}/`;
      const response = await fetch(url);
      console.log('response', response);
      return response;
    } catch (error) {
      console.error('Error fetching ledger state delta:', error);
    }
  }

  async function fetchTransactionDetails() {
    try {
      // Fetch the transaction details using the transaction ID
      const response = await algoClient.pendingTransactionInformation(transactionId).do();
      console.log('response', response);

      const decoder = new TextDecoder('utf-8');

      const a = response.txn.txn;

      console.log('response.txn.txn.snd:', a.snd);
      console.log('senderAddress text: ', algosdk.encodeAddress(a.snd));

      // console.log('response.txn.txn.arcv:', a.arcv);
      // console.log('recieverAddress text: ', algosdk.encodeAddress(a.arcv));

      console.log('response.txn.txn.note', a.note);
      console.log('note text: ', decoder.decode(a.note));
    } catch (error) {
      console.error('Error fetching transaction details:', error);
    }
  }
  //7B6RVLM4TKNAAGNXBRPL4TFHNBOBVC4Y6ZBVR5OW5235MAXJIWXA old
  //ADFSJT2GOWXUHEA6DPCJKRYZXLZX7GCXML7P5NGYJ5GG7EZJO6IQ new

  const qPrices = useQuery('transaction', () => {
    console.log('a');
    // fetchPrices('ADFSJT2GOWXUHEA6DPCJKRYZXLZX7GCXML7P5NGYJ5GG7EZJO6IQ');
  });

  const fetchPrices = async (txId: string | null) => {
    const url = `${config.indexer}/v2/transactions/${txId}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error fetching prices');
    return response.json();
  };

  return {
    fetchTransactionDetails,
    qTransaction: qPrices,
    fetchPrices,
    fetchPrices2,
    fetchLedgerStateDelta,
  };
};
