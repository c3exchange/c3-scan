import TooltipInfo from '../../../../../components/TooltipInfo/TooltipInfo';
import EmptyTable from '../../../../../components/EmptyTable/EmptyTable';
import { getAssetIcon, formatNumber } from '../../../../../utils';
import { IBorrowTable } from '../interfaces';

import * as S from './styles';

const MobileTable = (props: IBorrowTable) => {
  const { borrows, isEmpty, totalBorrowed } = props;
  return (
    <S.Container _empty={isEmpty}>
      <S.Title>
        Borrow Positions
        <S.AccountValue>
          {!isEmpty && (
            <>
              ${formatNumber(totalBorrowed)}
              <TooltipInfo message="The total sum of your C3  outstanding debts, including borrowed funds and accrued interest." />
            </>
          )}
        </S.AccountValue>
      </S.Title>
      <S.ScrollableContent _empty={isEmpty}>
        {!isEmpty ? (
          borrows.map((asset) => (
            <S.Card container key={asset.instrument.id}>
              <S.Row container justifyContent="space-between">
                <S.Item item _isTitle>
                  Asset
                </S.Item>
                <S.Item item gap="4px">
                  <S.IconContainer>{getAssetIcon(asset.instrument.id)}</S.IconContainer>
                  {asset.instrument.id}
                </S.Item>
              </S.Row>
              <S.Row container justifyContent="space-between">
                <S.Item item _isTitle>
                  Utilization
                </S.Item>
                <S.Item item gap="4px">
                  {formatNumber(Number(asset.amount.toDecimal()))} {asset.instrument.id}
                </S.Item>
              </S.Row>
              <S.Row container justifyContent="space-between">
                <S.Item item gap="4px" _isTitle>
                  Total Supplied
                </S.Item>
                <S.Item item>$ {formatNumber(asset.value)}</S.Item>
              </S.Row>
            </S.Card>
          ))
        ) : (
          <EmptyTable icon={{ name: 'emptyTable', size: 40 }}>
            No active borrow positions for this address
          </EmptyTable>
        )}
      </S.ScrollableContent>
    </S.Container>
  );
};

export default MobileTable;
