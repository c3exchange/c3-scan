import { useGlobalContext } from '../contexts/GlobalContext';
import { getApplicationAddress } from 'algosdk';
import { Holding } from '../interfaces/interfaces';
import { cleanC3Prefix, getInstrumentInfo } from '../utils';
import { ALGO_INSTRUMENT, InstrumentAmount } from '@c3exchange/common';
import { usePrices } from './usePrices';
import { useQuery } from 'react-query';

export const useGetC3HoldingAssets = () => {
  const { algoIndexer, coreAppId } = useGlobalContext();
  const { assetPrices, getUSDPrice } = usePrices();

  const fetchHoldingPrices = async (coreAppId?: number) => {
    if (!coreAppId) return [];
    const appAddress = await getApplicationAddress(coreAppId);
    const accountInfo = await algoIndexer.lookupAccountByID(appAddress).do();
    const algoPrice: number = getUSDPrice(ALGO_INSTRUMENT.id);
    const algoAmount = Number(
      InstrumentAmount.fromContract(
        ALGO_INSTRUMENT,
        BigInt(accountInfo.account.amount)
      ).toDecimal()
    );
    let holdingAssets: Holding[] = [
      {
        instrument: ALGO_INSTRUMENT,
        amount: algoAmount,
        value: algoAmount * algoPrice,
      },
    ];
    const assetPromises = accountInfo.account.assets.map(async (asset: any) => {
      const instrument = await getInstrumentInfo(asset['asset-id'], algoIndexer);
      const cleanInstrumentId = cleanC3Prefix(instrument?.id || '');
      const assetPrice = getUSDPrice(cleanInstrumentId);
      const instrumentAmount = instrument
        ? Number(
            InstrumentAmount.fromContract(instrument!, BigInt(asset.amount)).toDecimal()
          )
        : 0;
      return instrument
        ? {
            instrument: {
              ...instrument,
              id: cleanInstrumentId,
            },
            amount: instrumentAmount,
            value: instrumentAmount * assetPrice,
          }
        : null;
    });
    const resolvedAssets = await Promise.all(assetPromises);
    holdingAssets = holdingAssets.concat(
      resolvedAssets.filter((holding) => holding !== null)
    );
    return holdingAssets;
  };

  return useQuery('useGetC3HoldingAssets', () => fetchHoldingPrices(coreAppId), {
    refetchInterval: 30000,
    enabled: !!coreAppId && !!assetPrices,
  });
};
