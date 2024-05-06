import { useQuery } from 'react-query';
import { useConfig } from './useConfig';
import { InstrumentPoolInfo } from '@c3exchange/common';

const fetchPools = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error fetching intruments pools');
  return response.json();
};

export const useGetInstrumentsPools = () => {
  const config = useConfig();

  const qPools = useQuery<InstrumentPoolInfo[]>('pools', () =>
    fetchPools(`${config.c3ApiUrl}/instruments/pools`)
  );

  const getEarnAPR = (instrumentId: string) => {
    return qPools?.data?.find((pool) => pool.id === instrumentId)?.lendApr;
  };

  const getBorrowAPR = (instrumentId: string) => {
    return qPools?.data?.find((pool) => pool.id === instrumentId)?.borrowApr;
  };

  return { instrumentsPools: qPools?.data, getEarnAPR, getBorrowAPR };
};
