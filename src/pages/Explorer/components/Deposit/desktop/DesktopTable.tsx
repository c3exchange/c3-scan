import Grid from '@mui/material/Grid';
import TooltipInfo from '../../../../../components/TooltipInfo/TooltipInfo';
import { getAssetIcon, formatNumber } from '../../../../../utils';
import Loader from '../../../../../components/Loader/Loader';
import { IDepositTable } from '../interfaces';
import Formatter from '../../../../../utils/formatter';

import * as S from './styles';

const DesktopTable = (props: IDepositTable) => {
  const {
    c3Assets,
    C3Address,
    userCash,
    isLoading,
    totalValueLocked,
    totalAccountValue,
  } = props;
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
        <Grid item desktop={3}>
          Asset
        </Grid>
        <Grid item desktop={5}>
          Amount
        </Grid>
        <Grid item desktop={4}>
          Value
        </Grid>
      </S.AssetInfo>
      <S.ScrollableContent>
        {isLoading && <Loader />}
        {C3Address
          ? userCash.map((asset) => (
              <S.Row container key={asset.instrument.id}>
                <S.AssetIconContainer item desktop={3}>
                  <S.IconContainer>{getAssetIcon(asset.instrument.id)}</S.IconContainer>
                  {asset.instrument.id}
                </S.AssetIconContainer>
                <Grid item desktop={5}>
                  {Formatter.fromInstrumentAmount(asset.amount).precision().formatted()}
                </Grid>
                <Grid item desktop={4}>
                  $ {formatNumber(asset.value)}
                </Grid>
              </S.Row>
            ))
          : c3Assets?.map((asset) => (
              <S.Row container key={asset.instrument.id}>
                <S.AssetIconContainer item desktop={3}>
                  <S.IconContainer>{getAssetIcon(asset.instrument.id)}</S.IconContainer>
                  {asset.instrument.id}
                </S.AssetIconContainer>
                <Grid item desktop={5}>
                  {formatNumber(asset.amount)} {asset.instrument.id}
                </Grid>
                <Grid item desktop={4}>
                  $ {formatNumber(asset.value)}
                </Grid>
              </S.Row>
            ))}
      </S.ScrollableContent>
      {!C3Address && totalValueLocked && (
        <S.Footer>
          <Grid item desktop={8}></Grid>
          <S.TVLContainer item desktop={4}>
            <S.TVLLabel>Total Value Locked (</S.TVLLabel> TVL<S.TVLLabel>)</S.TVLLabel> $
            {formatNumber(totalValueLocked)}
            <TooltipInfo message="The total value of all available assets inside the C3 exchange platform." />
          </S.TVLContainer>
        </S.Footer>
      )}
    </S.Container>
  );
};

export default DesktopTable;
