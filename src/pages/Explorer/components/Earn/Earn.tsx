import Grid from '@mui/material/Grid';
import * as S from './styles';
import TooltipInfo from '../../../../components/TooltipInfo/TooltipInfo';
import { AssetHolding } from '../../../../interfaces/interfaces';
import { formatNumber, getAssetIcon } from '../../../../utils';

interface IEarn {
  userPool: AssetHolding[];
}
const Earn = ({ userPool }: IEarn) => {
  const loans = userPool.filter((pool) => pool.amount.isGreaterThanZero());
  const totalLoaned = loans.reduce((acc, { value }) => acc + value, 0);
  return (
    <S.Container>
      <S.Title>
        Earn Positions
        <S.AccountValue>
          ${formatNumber(totalLoaned)}
          <TooltipInfo message="The total sum of your C3 lend positions, including accrued interest." />
        </S.AccountValue>
      </S.Title>
      <S.AssetInfo>
        <Grid item xs={4}>
          Asset
        </Grid>
        <Grid item xs={4}>
          Subscribed Amount
        </Grid>
        <Grid item xs={4}>
          Subscribed Value
        </Grid>
      </S.AssetInfo>
      <S.ScrollableContent>
        {loans.map((asset) => (
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

export default Earn;
