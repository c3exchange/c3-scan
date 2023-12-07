import { AssetHolding, Holding } from '../../../../interfaces/interfaces';

interface IDeposit {
  c3Assets: Holding[];
  C3Address: string;
  userCash: AssetHolding[];
  isLoading: boolean;
}

interface IDepositTable extends IDeposit {
  totalValueLocked: number;
  totalAccountValue: number;
}

export type { IDeposit, IDepositTable };
