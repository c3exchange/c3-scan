import Grid from '@mui/material/Grid';
import { InstrumentAmount } from '@c3exchange/common';
import TooltipInfo from '../../../../../components/TooltipInfo/TooltipInfo';
import { getAssetIcon, formatNumber, formatApyNumber } from '../../../../../utils';
import { IMarginPoolTable } from '../interfaces';
import UtilizationCircularProgress from '../../../../../components/CircularProgress/CircularProgress';

import * as S from './styles';

const DesktopTable = (props: IMarginPoolTable) => {
  const { onChainAppState, getUSDValue, getEarnAPR } = props;
  return (
    <S.Container>
      <S.Title>C3's Margin Pool</S.Title>
      <S.AssetInfo container>
        <Grid item desktop={2}>
          Asset
        </Grid>
        <Grid item desktop={2} display="flex">
          Utilization
          <TooltipInfo message="The percentage of the total supplied asset that's already been lent out" />
        </Grid>
        <Grid item desktop={1} display="flex">
          Earn APY
        </Grid>
        <Grid item desktop={3} display="flex">
          <S.ValorizedCompoundColumn container>
            <S.CompoundTitle item>
              Total Supplied
              <TooltipInfo message="Total amount and USD value of the supplied asset currently on the C3 lending market" />
            </S.CompoundTitle>
            <S.CompoundSubtitle container>
              <S.RightAlignedGrid item desktop={6}>
                Amount
              </S.RightAlignedGrid>
              <S.RightAlignedGrid item desktop={6}>
                Value
              </S.RightAlignedGrid>
            </S.CompoundSubtitle>
          </S.ValorizedCompoundColumn>
        </Grid>
        <Grid desktop={1}></Grid>
        <Grid item desktop={3} display="flex">
          <S.ValorizedCompoundColumn container>
            <S.CompoundTitle item>
              Total Borrowed
              <TooltipInfo message="The total amount and USD value of the asset that's already being borrowed on the C3 lending market." />
            </S.CompoundTitle>
            <S.CompoundSubtitle container>
              <S.RightAlignedGrid item desktop={6}>
                Amount
              </S.RightAlignedGrid>
              <S.RightAlignedGrid item desktop={6}>
                Value
              </S.RightAlignedGrid>
            </S.CompoundSubtitle>
          </S.ValorizedCompoundColumn>
        </Grid>
      </S.AssetInfo>
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
            <S.Row key={serverInstrument.instrument.id}>
              <S.AssetIconContainer item desktop={2}>
                <S.IconContainer>
                  {getAssetIcon(serverInstrument.instrument.id)}
                </S.IconContainer>
                {serverInstrument.instrument.id}
              </S.AssetIconContainer>
              <Grid item desktop={2} display="flex">
                <UtilizationCircularProgress value={utilizationRate} />
                {formatNumber(utilizationRate)} %
              </Grid>
              <Grid item desktop={1} display="flex">
                {formatApyNumber(earnAPR * 100)} %
              </Grid>
              <Grid item desktop={3}>
                <S.ValorizedInfoContainer container>
                  <S.RightAlignedGrid item desktop={6}>
                    {formatNumber(liquidity)}
                  </S.RightAlignedGrid>
                  <S.RightAlignedGrid item desktop={6}>
                    ${' '}
                    {formatNumber(getUSDValue(serverInstrument.instrument.id, liquidity))}
                  </S.RightAlignedGrid>
                </S.ValorizedInfoContainer>
              </Grid>
              <Grid desktop={1}></Grid>
              <Grid item desktop={3}>
                <S.ValorizedInfoContainer container>
                  <S.RightAlignedGrid item desktop={6}>
                    {formatNumber(borrowed)}
                  </S.RightAlignedGrid>
                  <S.RightAlignedGrid item desktop={6}>
                    ${' '}
                    {formatNumber(getUSDValue(serverInstrument.instrument.id, borrowed))}
                  </S.RightAlignedGrid>
                </S.ValorizedInfoContainer>
              </Grid>
            </S.Row>
          );
        })}
      </S.ScrollableContent>
    </S.Container>
  );
};

export default DesktopTable;
