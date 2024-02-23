import Grid from '@mui/material/Grid';

import TooltipInfo from '../../../../../components/TooltipInfo/TooltipInfo';
import EmptyTable from '../../../../../components/EmptyTable/EmptyTable';

import { getAssetIcon, formatNumber } from '../../../../../utils';
import { IEarnTable } from '../interfaces';

import * as S from './styles';

const DesktopTable = (props: IEarnTable) => {
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
      <S.AssetInfo container>
        <Grid item desktop={2}>
          Asset
        </Grid>
        <S.RightAlignedGrid item desktop={4}>
          Subscribed Amount
        </S.RightAlignedGrid>
        <S.RightAlignedGrid item desktop={4}>
          Subscribed Value
        </S.RightAlignedGrid>
      </S.AssetInfo>
      <S.ScrollableContent _empty={isEmpty}>
        {!isEmpty ? (
          loans.map((asset) => (
            <S.Row container key={asset.instrument.id}>
              <S.AssetIconContainer item desktop={2}>
                <S.IconContainer>{getAssetIcon(asset.instrument.id)}</S.IconContainer>
                {asset.instrument.id}
              </S.AssetIconContainer>
              <S.RightAlignedGrid item desktop={4}>
                {formatNumber(Number(asset.amount.toDecimal()))} {asset.instrument.id}
              </S.RightAlignedGrid>
              <S.RightAlignedGrid item desktop={4}>
                $ {formatNumber(asset.value)}
              </S.RightAlignedGrid>
            </S.Row>
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

export default DesktopTable;
