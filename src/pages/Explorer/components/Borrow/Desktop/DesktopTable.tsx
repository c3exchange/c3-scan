import Grid from '@mui/material/Grid';

import TooltipInfo from '../../../../../components/TooltipInfo/TooltipInfo';
import EmptyTable from '../../../../../components/EmptyTable/EmptyTable';

import { getAssetIcon, formatNumber } from '../../../../../utils';
import { IBorrowTable } from '../interfaces';

import * as S from './styles';

const DesktopTable = (props: IBorrowTable) => {
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
      <S.AssetInfo container>
        <Grid item desktop={2}>
          Asset
        </Grid>
        <Grid item desktop={4} display="flex" justifyContent="flex-end">
          Utilization
        </Grid>
        <Grid item desktop={4} display="flex" justifyContent="flex-end">
          Total supplied
        </Grid>
      </S.AssetInfo>
      <S.ScrollableContent _empty={isEmpty}>
        {!isEmpty ? (
          borrows.map((asset) => (
            <S.Row container key={asset.instrument.id}>
              <S.AssetIconContainer item desktop={2}>
                <S.IconContainer>{getAssetIcon(asset.instrument.id)}</S.IconContainer>
                {asset.instrument.id}
              </S.AssetIconContainer>
              <Grid item desktop={4} display="flex" justifyContent="flex-end">
                {formatNumber(Number(asset.amount.toDecimal()))} {asset.instrument.id}
              </Grid>
              <Grid item desktop={4} display="flex" justifyContent="flex-end">
                $ {formatNumber(asset.value)}
              </Grid>
            </S.Row>
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

export default DesktopTable;
