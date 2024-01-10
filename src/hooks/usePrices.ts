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
  return useQuery<Price[]>(
    'prices',
    () => fetchPrices(`${config.c3ApiUrl}/instruments/prices`),
    {
      refetchInterval: 30000,
    }
  );
};
