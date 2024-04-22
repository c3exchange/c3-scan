import { InstrumentAmount } from '@c3exchange/common';
import TooltipInfo from '../../../../../components/TooltipInfo/TooltipInfo';
import { getAssetIcon, formatNumber, formatApyNumber } from '../../../../../utils';
import { IMarginPoolTable } from '../interfaces';

import * as S from './styles';

const MobileTable = (props: IMarginPoolTable) => {
  const { onChainAppState, getUSDValue, getEarnAPR } = props;
  return (
    <S.Container>
      <S.Title>C3's Margin Pool</S.Title>
      <S.ScrollableContent>
        {onChainAppState?.map((serverInstrument) => {
          const liquidity = Number(
            InstrumentAmount.fromContract(
              serverInstrument.instrument,
              serverInstrument.pool.poolData.liquidity
            ).toDecimal()
          );
          const borrowed = Number(
            InstrumentAmount.fromContract(
              serverInstrument.instrument,
              serverInstrument.pool.poolData.borrowed
            ).toDecimal()
          );
          const utilizationRate = liquidity !== 0 ? (borrowed / liquidity) * 100 : 0;
          const earnAPR = getEarnAPR(serverInstrument.instrument.id) || 0;

          return (
            <S.Card container key={serverInstrument.instrument.id}>
              <S.Row container justifyContent="space-between">
                <S.Item item _isTitle>
                  Asset
                </S.Item>
                <S.Item item gap="4px">
                  <S.IconContainer>
                    {getAssetIcon(serverInstrument.instrument.id)}
                  </S.IconContainer>
                  {serverInstrument.instrument.id}
                </S.Item>
              </S.Row>
              <S.Row container justifyContent="space-between">
                <S.Item item _isTitle>
                  Utilization
                  <TooltipInfo message="The percentage of the total supplied asset that's already been lent out" />
                </S.Item>
                <S.Item item gap="4px">
                  {formatNumber(utilizationRate)} %
                </S.Item>
              </S.Row>
              <S.Row container justifyContent="space-between">
                <S.Item item _isTitle>
                  Earn APY
                </S.Item>
                <S.Item item gap="4px">
                  {formatApyNumber(earnAPR * 100)} %
                </S.Item>
              </S.Row>

              <S.CompoundRow container justifyContent="space-between">
                <S.Item item gap="4px" _isTitle>
                  Total Supplied
                  <TooltipInfo message="Total amount and USD value of the supplied asset currently on the C3 lending market" />
                </S.Item>
                <S.CompoundItem item gap="1px">
                  <S.CompoundItemValue>
                    {formatNumber(liquidity)} {serverInstrument.instrument.id}
                  </S.CompoundItemValue>
                  <S.CompoundItemValue _isUSDValue>
                    ${' '}
                    {formatNumber(getUSDValue(serverInstrument.instrument.id, liquidity))}
                  </S.CompoundItemValue>
                </S.CompoundItem>
              </S.CompoundRow>
              <S.CompoundRow container justifyContent="space-between">
                <S.Item item gap="4px" _isTitle>
                  Total Borrowed
                  <TooltipInfo message="The total amount and USD value of the asset that's already being borrowed on the C3 lending market." />
                </S.Item>
                <S.CompoundItem item gap="1px">
                  <S.CompoundItemValue>
                    {formatNumber(borrowed)} {serverInstrument.instrument.id}
                  </S.CompoundItemValue>
                  <S.CompoundItemValue _isUSDValue>
                    ${' '}
                    {formatNumber(getUSDValue(serverInstrument.instrument.id, borrowed))}
                  </S.CompoundItemValue>
                </S.CompoundItem>
              </S.CompoundRow>
            </S.Card>
          );
        })}
      </S.ScrollableContent>
    </S.Container>
  );
};

export default MobileTable;
