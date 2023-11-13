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
  account?: string;
  nonce?: number;
  sellSlotId?: string;
  sellAmount?: number;
  maxBorrow?: number;
  buySlotId?: string;
  buyAmount?: number;
  maxRepay?: number;
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
