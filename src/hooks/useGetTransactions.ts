import { useGlobalContext } from '../contexts/GlobalContext';

interface ITx {
  group?: string;
}

export const useGetTransactions = () => {
  const { algoIndexer } = useGlobalContext();

  const getGroupTxs = async (groupId: string, block: string) => {
    if (!groupId || !block) return;
    const response = await algoIndexer
      .searchForTransactions()
      .round(parseInt(block))
      .do();
    const transactions = response.transactions;
    const groupTxs = transactions.filter((tx: ITx) => tx.group === groupId);
    return groupTxs;
  };

  return {
    getGroupTxs,
  };
};
