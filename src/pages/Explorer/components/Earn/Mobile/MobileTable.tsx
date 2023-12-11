import TooltipInfo from '../../../../../components/TooltipInfo/TooltipInfo';
import EmptyTable from '../../../../../components/EmptyTable/EmptyTable';
import { getAssetIcon, formatNumber } from '../../../../../utils';
import { IEarnTable } from '../interfaces';

import * as S from './styles';

const MobileTable = (props: IEarnTable) => {
  const { loans, isEmpty, totalLoaned } = props;
  return (
    <S.Container _empty={isEmpty}>
      <S.Title>
        Earn Positions
        <S.AccountValue>
          {!isEmpty && (
            <>
              ${formatNumber(totalLoaned)}
              <TooltipInfo message="The total sum of your C3 lend positions, including accrued interest." />
            </>
          )}
        </S.AccountValue>
      </S.Title>
      <S.ScrollableContent _empty={isEmpty}>
        {!isEmpty ? (
          loans.map((asset) => (
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
                  Subscribed Amount
                </S.Item>
                <S.Item item gap="4px">
                  {formatNumber(Number(asset.amount.toDecimal()))} {asset.instrument.id}
                </S.Item>
              </S.Row>
              <S.Row container justifyContent="space-between">
                <S.Item item gap="4px" _isTitle>
                  Subscribed Value
                </S.Item>
                <S.Item item>$ {formatNumber(asset.value)}</S.Item>
              </S.Row>
            </S.Card>
          ))
        ) : (
          <EmptyTable icon={{ name: 'emptyEarnTable', size: 48 }}>
            No active earn positions for this address
          </EmptyTable>
        )}
      </S.ScrollableContent>
    </S.Container>
  );
};

export default MobileTable;
