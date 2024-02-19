import { ServerInstrument } from '@c3exchange/common';

interface IMarginPool {
  onChainAppState?: ServerInstrument[];
}

interface IMarginPoolTable extends IMarginPool {
  getValue: (instrument: string, amount: number) => number;
}

export type { IMarginPool, IMarginPoolTable };
