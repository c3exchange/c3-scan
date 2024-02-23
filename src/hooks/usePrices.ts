import { useQuery } from 'react-query';
import { useConfig } from './useConfig';
import { Price } from '../interfaces/interfaces';

const fetchPrices = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error fetching prices');
  return response.json();
};

export const usePrices = () => {
  const config = useConfig();

  const qPrices = useQuery<Price[]>(
    'prices',
    () => fetchPrices(`${config.c3ApiUrl}/instruments/prices`),
    {
      refetchInterval: 30000,
    }
  );

  const getUSDPrice = (instrumentId: string) => {
    return qPrices?.data?.find((price) => price.id === instrumentId)?.price || 0;
  };

  const getUSDValue = (instrumentId: string, amount: number) => {
    return getUSDPrice(instrumentId) * amount;
  };

  return { assetPrices: qPrices?.data, getUSDPrice, getUSDValue };
};
