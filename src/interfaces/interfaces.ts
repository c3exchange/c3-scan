import { Instrument, InstrumentAmount } from '@c3exchange/common';

export interface Holding {
  instrument: Instrument;
  amount: number;
  value: number;
}

export interface Price {
  id: string;
  price: number;
}

export interface AssetHolding {
  instrument: Instrument;
  amount: InstrumentAmount;
  value: number;
}

export interface DecodedMessage {
  amount?: number;
  target?: string;
  instrumentName?: string;
  operationType?: string;
  userID?: string;
  creationTime?: string;
  expiresOn?: string;
  account?: string | AccountWithModifier;
  accountAddresses?: ChainAddressInfoObj;
  nonce?: number;
  sellAssetId?: string;
  sellAmount?: number;
  maxBorrow?: number;
  buyAssetId?: string;
  buyAmount?: number;
  maxRepay?: number;
  chain?: ChainInfo;
  delegateAddress?: string;
  delegatedAddresses?: ChainAddressInfoObj;
  liquidationTarget?: ChainAddressInfoObj;
  liquidatorAddress?: string | ChainAddressInfoObj;
  cash?: LiqAssetInfoObj | string;
  pool?: LiqAssetInfoObj;
}

type ChainInfo = {
  chainId: number;
  chainName: string;
};

export type DecodedMessageFieldTypes =
  | DecodedMessage[keyof DecodedMessage]
  | SubMultiValuesFieldTypes;

export type MultiValueFieldTypes = ChainAddressInfoObj | LiqAssetInfoObj;
type SubMultiValuesFieldTypes = ChainAddressInfo | LiqAssetInfo;

export interface AccountWithModifier {
  account: string;
  modifier: string;
}

export type ChainAddressInfoObj = Record<string, ChainAddressInfo>;
export interface ChainAddressInfo {
  address: string;
  chainName: string;
}

export type LiqAssetInfoObj = Record<string, LiqAssetInfo>;
export interface LiqAssetInfo {
  name: string;
  amount: string;
}

export enum OnChainRequestOp {
  Login = -1,
  Deposit = 0,
  Withdraw = 1,
  PoolMove = 2,
  Delegate = 3,
  Liquidation = 4,
  AccountMove = 5,
  Settle = 6,
}

// mui overrides
declare module '@mui/material/styles' {
  // breakpoints
  interface BreakpointOverrides {
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
    mediumDesktop: true;
    largeDesktop: true;
  }
}
