import { useGlobalContext } from '../contexts/GlobalContext';
import { Transaction } from 'algosdk';

export const useGetTransactions = () => {
  const { algoIndexer } = useGlobalContext();

  const getGroupTxs = async (groupId: string, block: string) => {
    if (!groupId || !block) return;
    const response = await algoIndexer
      .searchForTransactions()
      .round(parseInt(block))
      .do();
    const transactions = response.transactions;
    const groupTxs = transactions.filter((tx: any) => tx['group'] === groupId);
    return groupTxs;
  };

  return {
    getGroupTxs,
  };
};
