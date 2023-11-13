import Grid from '@mui/material/Grid';
import TooltipInfo from '../../../../components/TooltipInfo/TooltipInfo';
import { InstrumentAmount, ServerInstrument } from '@c3exchange/common';
import { getAssetIcon, formatNumber } from '../../../../utils';
import * as S from './styles';

interface IMarginPool {
  onChainAppState?: ServerInstrument[];
}

const MarginPool = ({ onChainAppState }: IMarginPool) => {
  return (
    <S.Container>
      <S.Title>C3's Margin Pool</S.Title>
      <S.AssetInfo container>
        <Grid item xs={3}>
          Asset
        </Grid>
        <Grid item xs={3} display="flex">
          Utilization
          <TooltipInfo message="The percentage of the total supplied asset that's already been lent out" />
        </Grid>
        <Grid item xs={3} display="flex">
          Total Supplied
          <TooltipInfo message="Total amount of the supplied asset currently on the C3 lending market" />
        </Grid>
        <Grid item xs={3} display="flex">
          Total Borrowed
          <TooltipInfo message="The total amount of the asset that's already being borrowed on the C3 lending market." />
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
          return (
            <S.Row key={serverInstrument.instrument.id}>
              <S.AssetIconContainer item xs={3}>
                <S.IconContainer>
                  {getAssetIcon(serverInstrument.instrument.id)}
                </S.IconContainer>
                {serverInstrument.instrument.id}
              </S.AssetIconContainer>
              <Grid item xs={3}>
                {formatNumber(utilizationRate)} %
              </Grid>
              <Grid item xs={3}>
                {formatNumber(liquidity)}
              </Grid>
              <Grid item xs={3}>
                {formatNumber(borrowed)}
              </Grid>
            </S.Row>
          );
        })}
      </S.ScrollableContent>
    </S.Container>
  );
};

export default MarginPool;
