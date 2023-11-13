import { useEffect, useState } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import { getApplicationAddress } from 'algosdk';
import { Holding } from '../interfaces/interfaces';
import { cleanC3Prefix, getInstrumentInfo } from '../utils';
import { ALGO_INSTRUMENT, InstrumentAmount } from '@c3exchange/common';

export const useGetC3HoldingAssets = () => {
  const [holdingAssets, setHoldingAssets] = useState<Holding[]>([]);
  const { assetPrices } = useGlobalContext();
  const { algoIndexer, coreAppId } = useGlobalContext();

  const searchHoldingAssets = async (appId: number) => {
    try {
      const appAddress = await getApplicationAddress(appId);
      const accountInfo = await algoIndexer.lookupAccountByID(appAddress).do();
      const algoPrice: number =
        assetPrices.find((price) => price.id === ALGO_INSTRUMENT.id)?.price || 0;
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
        const assetPrice =
          assetPrices.find((price) => price.id === cleanInstrumentId)?.price || 0;
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
      setHoldingAssets(holdingAssets);
      return holdingAssets;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!coreAppId) return;
    searchHoldingAssets(coreAppId);
  }, [coreAppId]);

  return holdingAssets;
};
