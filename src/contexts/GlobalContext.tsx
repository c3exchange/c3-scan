import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useConfig } from '../hooks/useConfig';
import algosdk from 'algosdk';
import { AssetHolding } from '../interfaces/interfaces';
import { Instrument, InstrumentAmount } from '@c3exchange/common';
interface GlobalContextType {
  coreAppId: number | undefined;
  algoIndexer: algosdk.Indexer;
  algoClient: algosdk.Algodv2;
  assetHoldings: AssetHolding[];
  isMainnet: boolean;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const config = useConfig();
  const [coreAppId, setCoreAppId] = useState<number | undefined>();
  const [assetHoldings, setAssetHoldings] = useState<AssetHolding[]>([]);
  const [isMainnet, setIsMainnet] = useState<boolean>(config.isMainnet);
  const algoIndexer = new algosdk.Indexer('', config.indexer, '');
  const algoClient = new algosdk.Algodv2('', config.algoNode, '');

  const fetchGlobalData = async () => {
    try {
      const response = await fetch(`${config.c3ApiUrl}/system-info`);
      const jsonData = await response.json();
      setCoreAppId(jsonData?.contractIds?.ceOnchain);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  const fetchInitialHoldings = async () => {
    try {
      const response = await fetch(`${config.c3ApiUrl}/instruments`);
      const jsonData: Instrument[] = await response.json();
      const defaultUserCash = jsonData.map((instrument) => ({
        instrument,
        amount: InstrumentAmount.fromDecimal(instrument, '0'),
        value: 0,
      }));
      setAssetHoldings(defaultUserCash);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  useEffect(() => {
    fetchGlobalData();
    fetchInitialHoldings();
  }, []);

  useEffect(() => {
    if (config) setIsMainnet(config.isMainnet);
  }, [config]);

  return (
    <GlobalContext.Provider
      value={{
        coreAppId,
        algoIndexer,
        assetHoldings,
        algoClient,
        isMainnet,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalContextProvider');
  }
  return context;
};
