import { AssetHolding } from '../../../../interfaces/interfaces';

interface IEarn {
  userPool: AssetHolding[];
}

interface IEarnTable {
  loans: AssetHolding[];
  isEmpty: boolean;
  totalLoaned: number;
}

export type { IEarn, IEarnTable };
