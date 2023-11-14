import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useConfig } from '../hooks/useConfig';
import algosdk from 'algosdk';
import { Price } from '../interfaces/interfaces';
interface GlobalContextType {
  coreAppId: number | undefined;
  algoIndexer: algosdk.Indexer;
  algoClient: algosdk.Algodv2;
  assetPrices: Price[];
  isMainnet: boolean;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const config = useConfig();
  const [coreAppId, setCoreAppId] = useState<number | undefined>();
  const [assetPrices, setAssetPrices] = useState<Price[]>([]);
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

  const fetchAssetPrices = async () => {
    try {
      const response = await fetch(`${config.c3ApiUrl}/instruments/prices`);
      const jsonData = await response.json();
      const assetPrices = jsonData.map((assetPrice: any) => ({
        ...assetPrice,
        price: Number(assetPrice.price),
      }));
      setAssetPrices(assetPrices);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };
  useEffect(() => {
    fetchGlobalData();
    fetchAssetPrices();
  }, []);
  useEffect(() => {
    if (config) setIsMainnet(config.isMainnet);
  }, [config]);

  return (
    <GlobalContext.Provider
      value={{ coreAppId, algoIndexer, assetPrices, algoClient, isMainnet }}
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
