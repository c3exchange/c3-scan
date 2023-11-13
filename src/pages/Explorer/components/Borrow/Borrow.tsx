import Grid from '@mui/material/Grid';
import TooltipInfo from '../../../../components/TooltipInfo/TooltipInfo';
import { AssetHolding } from '../../../../interfaces/interfaces';
import { formatNumber, getAssetIcon } from '../../../../utils';
import * as S from './styles';

interface IBorrow {
  userPool: AssetHolding[];
}
const Borrow = ({ userPool }: IBorrow) => {
  const borrows = userPool.filter((pool) => !pool.amount.isGreaterThanZero());
  const totalBorrowed = borrows.reduce((acc, { value }) => acc + value, 0);
  return (
    <S.Container>
      <S.Title>
        Borrow Positions
        <S.AccountValue>
          ${formatNumber(totalBorrowed)}
          <TooltipInfo message="The total sum of your C3  outstanding debts, including borrowed funds and accrued interest." />
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
      <S.ScrollableContent>
        {borrows.map((asset) => (
          <S.Row container key={asset.instrument.id}>
            <S.AssetIconContainer item xs={4}>
              <S.IconContainer>{getAssetIcon(asset.instrument.id)}</S.IconContainer>
              {asset.instrument.id}
            </S.AssetIconContainer>
            <Grid item xs={4} className="3">
              {formatNumber(Number(asset.amount.toDecimal()))} {asset.instrument.id}
            </Grid>
            <Grid item xs={4}>
              $ {formatNumber(asset.value)}
            </Grid>
          </S.Row>
        ))}
      </S.ScrollableContent>
    </S.Container>
  );
};

export default Borrow;
