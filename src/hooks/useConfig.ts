import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import configs from '../constants/configs';

interface Config {
  c3ApiUrl: string;
  indexer: string;
  algoNode: string;
  isMainnet: boolean;
}

export const useConfig = (): Config => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const env = params.get('env');

  const config = useMemo(() => {
    switch (env) {
      case 'test':
        return configs.testnet;
      default:
        return configs.mainnet;
    }
  }, [env]);

  return config;
};
