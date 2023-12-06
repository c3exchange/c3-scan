import Grid from '@mui/material/Grid';
import TooltipInfo from '../../../../components/TooltipInfo/TooltipInfo';
import { AssetHolding } from '../../../../interfaces/interfaces';
import { formatNumber, getAssetIcon } from '../../../../utils';
import Icon from '../../../../components/Icon/Icon';
import * as S from './styles';

interface IBorrow {
  userPool: AssetHolding[];
}
const Borrow = ({ userPool }: IBorrow) => {
  const borrows = userPool.filter((pool) => !pool.amount.isGreaterThanZero());
  const isEmpty = borrows.length <= 0;
  const totalBorrowed = borrows.reduce((acc, { value }) => acc + value, 0);
  return (
    <S.Container>
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
        <Grid item xs={4}>
          Asset
        </Grid>
        <Grid item xs={4}>
          Utilization
        </Grid>
        <Grid item xs={4}>
          Total supplied
        </Grid>
      </S.AssetInfo>
      <S.ScrollableContent _empty={isEmpty}>
        {!isEmpty ? (
          borrows.map((asset) => (
            <S.Row container key={asset.instrument.id}>
              <S.AssetIconContainer item xs={4}>
                <S.IconContainer>{getAssetIcon(asset.instrument.id)}</S.IconContainer>
                {asset.instrument.id}
              </S.AssetIconContainer>
              <Grid item xs={4}>
                {formatNumber(Number(asset.amount.toDecimal()))} {asset.instrument.id}
              </Grid>
              <Grid item xs={4}>
                $ {formatNumber(asset.value)}
              </Grid>
            </S.Row>
          ))
        ) : (
          <S.EmptyTableContainer container>
            <S.EmptyTableItem item xs={12}>
              <div>
                <S.EmptyTableIconContainer>
                  <Icon name="emptyTable" width={40} height={40} />
                </S.EmptyTableIconContainer>
                No active borrow positions for this address
              </div>
            </S.EmptyTableItem>
          </S.EmptyTableContainer>
        )}
      </S.ScrollableContent>
    </S.Container>
  );
};

export default Borrow;
