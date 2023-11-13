import { useEffect, useMemo, useState } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import { Holding } from '../interfaces/interfaces';
import { cleanC3Prefix, getInstrumentInfo } from '../utils';
import {
  ALGO_INSTRUMENT,
  AssetId,
  ServerInstrument,
  parseCoreInstruments,
} from '@c3exchange/common';

export const useGetOnChainC3State = (assets: Holding[]) => {
  const [onChainC3State, setOnChainC3State] = useState<ServerInstrument[]>([]);
  const { coreAppId, algoClient, algoIndexer } = useGlobalContext();
  const instrumentBox = useMemo(() => new Uint8Array(Buffer.from('i')), []);

  const searchOnChainC3State = async (appId: number) => {
    try {
      const res = await algoClient.getApplicationBoxByName(appId, instrumentBox).do();
      const parsedInstruments = await parseCoreInstruments(
        res.value,
        assets.length,
        async (assetId: AssetId) =>
          assetId === 0 ? ALGO_INSTRUMENT : getInstrumentInfo(assetId, algoIndexer)
      );
      const cleanParsedInstruments = parsedInstruments.map((instrument) => ({
        ...instrument,
        instrument: {
          ...instrument.instrument,
          id: cleanC3Prefix(instrument.instrument.id),
        },
      }));
      setOnChainC3State(cleanParsedInstruments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!coreAppId || !assets.length) return;
    searchOnChainC3State(coreAppId);
  }, [coreAppId, assets]);

  return onChainC3State;
};
