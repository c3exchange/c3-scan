import { AssetId, Instrument } from '@c3exchange/common';
import IndexerClient from 'algosdk/dist/types/client/v2/indexer/indexer';
import { shouldForwardProp as defaultShouldForwardProp } from '@mui/system';

export const cleanC3Prefix = (value: string) => {
  return value.replace(/^C3/, '');
};

export const getInstrumentInfo = async (
  assetId: AssetId,
  client: IndexerClient
): Promise<Instrument | undefined> => {
  const data = await client.lookupAssetByID(assetId).do();
  return {
    id: data.asset.params['unit-name'],
    asaId: data.asset.index,
    asaName: data.asset.params.name,
    asaUnitName: data.asset.params['unit-name'],
    asaDecimals: data.asset.params.decimals,
    chains: [],
  };
};

export const formatNumber = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format;

export const createShouldForwardProp = (propsToOmit: string[]) => (prop: PropertyKey) =>
  defaultShouldForwardProp(prop) && !propsToOmit.includes(String(prop));
