import Grid from '@mui/material/Grid';
import TooltipInfo from '../../../../components/TooltipInfo/TooltipInfo';
import { AssetHolding, Holding } from '../../../../interfaces/interfaces';
import { getAssetIcon, formatNumber } from '../../../../utils';
import * as S from './styles';
import Loader from '../../../../components/Loader/Loader';

interface IDeposit {
  c3Assets: Holding[];
  C3Address: string;
  userCash: AssetHolding[];
  isLoading: boolean;
}

const Deposit = ({ c3Assets, C3Address, userCash, isLoading }: IDeposit) => {
  const totalValueLocked = c3Assets.reduce((acc, { value }) => acc + value, 0);
  const totalAccountValue = userCash.reduce((acc, { value }) => acc + value, 0);
  return (
    <S.Container>
      <S.Title>
        {C3Address ? 'Account Assets' : "C3's Total Deposits"}
        {C3Address && (
          <S.AccountValue>
            ${formatNumber(totalAccountValue)}
            <TooltipInfo message="The net balance of assets in your C3 account, including liabilities. Account Assets = Assets in your account + Earn holdings - Borrow Position" />
          </S.AccountValue>
        )}
      </S.Title>
      <S.AssetInfo container>
        <Grid item xs={4}>
          Asset
        </Grid>
        <Grid item xs={4}>
          Amount
        </Grid>
        <Grid item xs={4}>
          Value
        </Grid>
      </S.AssetInfo>
      <S.ScrollableContent>
        {isLoading && <Loader />}
        {C3Address
          ? userCash.map((asset) => (
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
          : c3Assets.map((asset) => (
              <S.Row container key={asset.instrument.id}>
                <S.AssetIconContainer item xs={4}>
                  <S.IconContainer>{getAssetIcon(asset.instrument.id)}</S.IconContainer>
                  {asset.instrument.id}
                </S.AssetIconContainer>
                <Grid item xs={4}>
                  {formatNumber(asset.amount)} {asset.instrument.id}
                </Grid>
                <Grid item xs={4}>
                  $ {formatNumber(asset.value)}
                </Grid>
              </S.Row>
            ))}
      </S.ScrollableContent>
      {!C3Address && (
        <S.Footer>
          <Grid item xs={8}></Grid>
          <S.TVLContainer item xs={4}>
            Total Value Locked (TVL) ${formatNumber(totalValueLocked)}
            <TooltipInfo message="The total value of all available assets inside the C3 exchange platform." />
          </S.TVLContainer>
        </S.Footer>
      )}
    </S.Container>
  );
};

export default Deposit;
