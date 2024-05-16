import { AssetId, Instrument } from '@c3exchange/common';
import IndexerClient from 'algosdk/dist/types/client/v2/indexer/indexer';
import { shouldForwardProp as defaultShouldForwardProp } from '@mui/system';

export enum Asset {
  USDC = 'USDC',
  BTC = 'BTC',
  ETH = 'ETH',
  ALGO = 'ALGO',
  AVAX = 'AVAX',
  ARB = 'ARB',
  BNB = 'BNB',
  PYTH = 'PYTH',
  SOL = 'SOL',
  W = 'W',
}
export interface Patterns {
  [key: string]: RegExp;
}

export const cleanC3Prefix = (value: string) => {
  return value.replace(/^C3/, '');
};

export const cleanWrappedPrefix = (value: string) => {
  if (value === Asset.W) return value;
  let regex;
  const patterns: Patterns = {
    [Asset.BTC]: new RegExp(Asset.BTC, 'i'),
  };
  for (const asset in patterns) {
    regex = patterns[asset];
    if (value.match(regex)) return value;
  }
  return value.replace(/^W/, '');
};

export const getInstrumentInfo = async (
  assetId: AssetId,
  client: IndexerClient
): Promise<Instrument | undefined> => {
  const data = await client.lookupAssetByID(assetId).do();
  return {
    id: cleanWrappedPrefix(data.asset.params['unit-name']),
    asaId: data.asset.index,
    asaName: data.asset.params.name,
    asaUnitName: cleanWrappedPrefix(data.asset.params['unit-name']),
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

export const truncateText = (
  text = '',
  [start, end]: number[] = [6, 6],
  spacing: Boolean = false
) => {
  const head = text.slice(0, start);
  const tail = text.slice(-1 * end, text.length);
  const separator = spacing ? ' ... ' : '...';
  return text.length > start + end ? [head, tail].join(separator) : text;
};

export const formatApyNumber = (num: number) => {
  if (num % 1 !== 0) return num.toFixed(3);
  return num;
};
