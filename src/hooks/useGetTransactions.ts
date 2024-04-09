import { useGlobalContext } from '../contexts/GlobalContext';
import { Transaction } from 'algosdk';

export const useGetTransactions = () => {
  const { algoIndexer } = useGlobalContext();

  const getGroupTxs = async (groupId: string, block: string, index: string) => {
    if (!groupId || !block || !index) return;
    const response = await algoIndexer
      .searchForTransactions()
      .round(parseInt(block))
      .do();
    const transactions = response.transactions;
    const groupTxs = [];
    for (let i = parseInt(index); i < transactions.length; i++) {
      if (transactions[i].group === groupId) {
        groupTxs.push(transactions[i]);
      } else {
        break;
      }
    }
    return groupTxs;
  };

  return {
    getGroupTxs,
  };
};
