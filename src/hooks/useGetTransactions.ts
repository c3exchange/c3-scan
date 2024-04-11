import { useGlobalContext } from '../contexts/GlobalContext';

export const useGetTransactions = () => {
  const { algoIndexer } = useGlobalContext();

  const getGroupTxs = async (groupId: string, block: string, blockIndex: string) => {
    if (!groupId || !block || !blockIndex) return;
    const response = await algoIndexer
      .searchForTransactions()
      .round(parseInt(block))
      .do();
    const transactions = response.transactions;
    const groupTxs = [];
    for (let i = parseInt(blockIndex); i < transactions.length; i++) {
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
