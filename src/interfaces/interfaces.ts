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
  accountAddresses?: ChainAddressInfoMap;
  nonce?: number;
  sellAssetId?: string;
  sellAmount?: number;
  maxBorrow?: number;
  buyAssetId?: string;
  buyAmount?: number;
  maxRepay?: number;
  chain?: {
    chainId: number;
    chainName: string;
  };
  delegateAddress?: string;
  delegatedAddresses?: ChainAddressInfoMap;
}

export type ChainAddressInfoMap = Record<string, ChainAddressInfo>;

export interface AccountWithModifier {
  account: string;
  modifier: string;
}

export interface ChainAddressInfo {
  address: string;
  chainName: string;
}

export enum OnChainRequestOp {
  Login = -1,
  Deposit = 0,
  Withdraw = 1,
  PoolMove = 2,
  Delegate = 3,
  Liquidate = 4,
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
