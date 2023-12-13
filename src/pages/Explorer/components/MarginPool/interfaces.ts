import { ServerInstrument } from '@c3exchange/common';

interface IMarginPool {
  onChainAppState?: ServerInstrument[];
}

interface IMarginPoolTable extends IMarginPool {}

export type { IMarginPool, IMarginPoolTable };
