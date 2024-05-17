import TooltipInfo from '../../../../../components/TooltipInfo/TooltipInfo';
import { getAssetIcon, formatNumber, formatPriceNumber } from '../../../../../utils';
import Loader from '../../../../../components/Loader/Loader';
import { IDepositTable } from '../interfaces';

import * as S from './styles';

const MobileTable = (props: IDepositTable) => {
  const {
    c3Assets,
    C3Address,
    userCash,
    isLoading,
    totalValueLocked,
    totalAccountValue,
    getUSDPrice,
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
      <S.ScrollableContent>
        {isLoading && <Loader />}
        {C3Address
          ? userCash.map((asset) => (
              <S.Card container key={asset.instrument.id}>
                <S.Row container justifyContent="space-between">
                  <S.Item item _isTitle>
                    Asset
                  </S.Item>
                  <S.Item item gap="4px">
                    <S.IconContainer>{getAssetIcon(asset.instrument.id)}</S.IconContainer>
                    {asset.instrument.id}
                  </S.Item>
                </S.Row>
                <S.Row container justifyContent="space-between">
                  <S.Item item _isTitle>
                    Price
                  </S.Item>
                  <S.Item item gap="4px">
                    {formatPriceNumber(getUSDPrice(asset.instrument.id))}
                  </S.Item>
                </S.Row>
                <S.Row container justifyContent="space-between">
                  <S.Item item _isTitle>
                    Amount
                  </S.Item>
                  <S.Item item gap="4px">
                    {formatNumber(Number(asset.amount.toDecimal()))} {asset.instrument.id}
                  </S.Item>
                </S.Row>
                <S.Row container justifyContent="space-between">
                  <S.Item item gap="4px" _isTitle>
                    Value
                  </S.Item>
                  <S.Item item>$ {formatNumber(asset.value)}</S.Item>
                </S.Row>
              </S.Card>
            ))
          : c3Assets?.map((asset) => (
              <S.Card container key={asset.instrument.id}>
                <S.Row container justifyContent="space-between">
                  <S.Item item _isTitle>
                    Asset
                  </S.Item>
                  <S.Item item>
                    <S.IconContainer>{getAssetIcon(asset.instrument.id)}</S.IconContainer>
                    {asset.instrument.id}
                  </S.Item>
                </S.Row>
                <S.Row container justifyContent="space-between">
                  <S.Item item _isTitle>
                    Price
                  </S.Item>
                  <S.Item item gap="4px">
                    {formatPriceNumber(getUSDPrice(asset.instrument.id))}
                  </S.Item>
                </S.Row>
                <S.Row container justifyContent="space-between">
                  <S.Item item _isTitle>
                    Amount
                  </S.Item>
                  <S.Item item gap="4px">
                    {formatNumber(asset.amount)} {asset.instrument.id}
                  </S.Item>
                </S.Row>
                <S.Row container justifyContent="space-between">
                  <S.Item item gap="4px" _isTitle>
                    Value
                  </S.Item>
                  <S.Item item>$ {formatNumber(asset.value)}</S.Item>
                </S.Row>
              </S.Card>
            ))}
      </S.ScrollableContent>
      {!C3Address && totalValueLocked && (
        <S.Footer>
          <S.Row container justifyContent="space-between">
            <S.Item item _isTitle>
              Total Value Locked (TVL)
            </S.Item>
            <S.Item item>
              ${formatNumber(totalValueLocked)}
              <TooltipInfo
                message="The total value of all available assets inside the C3 exchange platform."
                placement="bottom-end"
              />
            </S.Item>
          </S.Row>
        </S.Footer>
      )}
    </S.Container>
  );
};

export default MobileTable;
