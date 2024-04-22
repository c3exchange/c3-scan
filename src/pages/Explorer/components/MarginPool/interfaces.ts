import { ServerInstrument } from '@c3exchange/common';

interface IMarginPool {
  onChainAppState?: ServerInstrument[];
}

interface IMarginPoolTable extends IMarginPool {
  getUSDValue: (instrumentId: string, amount: number) => number;
  getEarnAPR: (instrumentId: string) => number | undefined;
}

export type { IMarginPool, IMarginPoolTable };
