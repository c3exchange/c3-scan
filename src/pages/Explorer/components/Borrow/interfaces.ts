import { AssetHolding } from '../../../../interfaces/interfaces';

interface IBorrow {
  userPool: AssetHolding[];
}

interface IBorrowTable {
  borrows: AssetHolding[];
  isEmpty: boolean;
  totalBorrowed: number;
}

export type { IBorrow, IBorrowTable };
