import { InstrumentAmount, MarketPrice } from '@c3exchange/common';
import BigNumber from 'bignumber.js';

export default class Formatter {
  private constructor(readonly raw: BigNumber) {}

  static fromRaw = (value: BigNumber): Formatter => {
    return new Formatter(value);
  };

  static fromString = (value: string): Formatter => {
    return Formatter.fromRaw(new BigNumber(value));
  };

  static fromNumber = (value: number): Formatter => {
    return Formatter.fromString(value.toString());
  };

  static fromInstrumentAmount = (value: InstrumentAmount): Formatter => {
    return Formatter.fromString(value.toDecimal());
  };

  static fromMarketPrice = (value: MarketPrice): Formatter => {
    return Formatter.fromString(value.toDecimal());
  };

  fixed = (decimals: number, mode?: BigNumber.RoundingMode): Formatter => {
    return Formatter.fromRaw(this.raw.decimalPlaces(decimals, mode));
  };

  normal = (): string => {
    return this.raw.toFixed();
  };

  precision = (value?: number): Formatter => {
    if (this.raw.abs().isLessThan(1)) {
      const precision = value || 2;
      return Formatter.fromString(this.raw.toPrecision(precision));
    }
    return Formatter.fromRaw(this.raw).fixed(2);
  };

  formatted = (decimalPlaces?: number): string => {
    const decimalPlacesToUse = this.raw.isZero() ? 2 : decimalPlaces;
    return this.raw.toFormat(decimalPlacesToUse);
  };
}
