import { useGlobalContext } from '../contexts/GlobalContext';

export const useGetTransactions = () => {
  const { algoIndexer } = useGlobalContext();

  const getGroupTxs = async (
    groupId: string | null,
    block: string | null,
    blockIndex: string | null
  ) => {
    if (!groupId || !block || !blockIndex) return [];

    const response = await algoIndexer
      .searchForTransactions()
      .round(parseInt(block))
      .do();

    const transactions = response.transactions;

    return transactions
      .slice(parseInt(blockIndex))
      .filter((tx: any) => tx.group === groupId);
  };

  return {
    getGroupTxs,
  };
};
