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
        <Grid item desktop={3}>
          Asset
        </Grid>
        <Grid item desktop={4} display="flex" justifyContent="flex-end">
          Subscribed Amount
        </Grid>
        <Grid item desktop={5} display="flex" justifyContent="flex-end">
          Subscribed Value
        </Grid>
      </S.AssetInfo>
      <S.ScrollableContent _empty={isEmpty}>
        {!isEmpty ? (
          loans.map((asset) => (
            <S.Row container key={asset.instrument.id}>
              <S.AssetIconContainer item desktop={3}>
                <S.IconContainer>{getAssetIcon(asset.instrument.id)}</S.IconContainer>
                {asset.instrument.id}
              </S.AssetIconContainer>
              <Grid item desktop={4} display="flex" justifyContent="flex-end">
                {formatNumber(Number(asset.amount.toDecimal()))}
              </Grid>
              <Grid item desktop={5} display="flex" justifyContent="flex-end">
                $ {formatNumber(asset.value)}
              </Grid>
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
