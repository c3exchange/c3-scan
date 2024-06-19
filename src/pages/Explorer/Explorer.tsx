import { useEffect, useMemo, useState } from 'react';
import Grid from '@mui/material/Grid';
import Hero from './components/Hero/Hero';
import Deposit from './components/Deposit/Deposit';
import Banner from '../../components/Banner/Banner';
import MarginPool from './components/MarginPool/MarginPool';
import Borrow from './components/Borrow/Borrow';
import Earn from './components/Earn/Earn';
import Path, { IPath } from '../../components/Path/Path';
import { useGetC3HoldingAssets } from '../../hooks/useGetHoldingAssets';
import { useGetOnChainC3State } from '../../hooks/useGetOnChainC3State';
import { getC3Address, getUserAddress, truncateText } from '../../utils';
import { useGetAddressState } from '../../hooks/useGetAddressState';
import { AppRoutes } from '../../routes/routes';
import { breakpoints } from '../../theme';
import { useWindowSize } from '../../hooks/useWindowSize';
import TooltipInfo from '../../components/TooltipInfo/TooltipInfo';
import Icon from '../../components/Icon/Icon';
import useCopy from '../../hooks/useCopy';
import EmptyTable from '../../components/EmptyTable/EmptyTable';
import TVLChart from './components/TVLChart/TVLChart';

import * as S from './styles';

const Explorer = () => {
  const [inputAddress, setInputAddress] = useState<string>('');
  const [C3Address, setC3Address] = useState<string>('');
  const [userAddress, setUserAddress] = useState<string>('');
  const [wrongAddress, setWrongAddress] = useState<boolean>(false);
  const [enableRefresh, setEnableRefresh] = useState<boolean>(false);
  const [isAddrStateLoading, setIsAddrStateLoading] = useState<boolean>(false);

  const windowSize = useWindowSize();
  const isMediumDesktop = useMemo(
    () => windowSize.width < breakpoints.mediumDesktop,
    [windowSize.width]
  );
  const isMobile = useMemo(
    () => windowSize.width < breakpoints.laptop,
    [windowSize.width]
  );

  const { data: holdingAssets, isLoading } = useGetC3HoldingAssets();
  const onChainC3State = useGetOnChainC3State(holdingAssets);
  const { userCash, userPool, addressStateError, refreshAddressOnChainState } =
    useGetAddressState(C3Address, onChainC3State);
  useEffect(() => {
    if (userCash.length || addressStateError) {
      setIsAddrStateLoading(false);
    }
  }, [userCash, userPool, addressStateError]);

  const onClear = () => {
    setInputAddress('');
    setEnableRefresh(false);
  };

  const onReturnHomePage = () => {
    onClear();
    setC3Address('');
    setUserAddress('');
    setWrongAddress(false);
    setIsAddrStateLoading(false);
  };

  const { copy } = useCopy();
  const onCopy = async (address: string) => {
    copy(address);
  };

  const onChangeAddress = (inputAddress: string) => {
    setInputAddress(inputAddress);
    setEnableRefresh(false);
  };

  const onSearch = () => {
    try {
      const trimmedAddress = inputAddress.trim();
      const inputC3Address = getC3Address(trimmedAddress);
      const inputUserAddress = getUserAddress(inputC3Address);
      if (inputC3Address === C3Address) {
        onRefreshAddress();
      }
      setIsAddrStateLoading(true);
      setC3Address(inputC3Address);
      setUserAddress(inputUserAddress);
      setWrongAddress(false);
      setEnableRefresh(true);
    } catch (error) {
      setC3Address('');
      setUserAddress('');
      setWrongAddress(true);
      setEnableRefresh(false);
      console.error('Invalid address: ', inputAddress, error);
    }
  };

  const onRefreshAddress = () => {
    refreshAddressOnChainState();
    setIsAddrStateLoading(true);
  };

  const path = useMemo(() => {
    const values: IPath[] = [
      { text: 'Explorer', route: AppRoutes.EXPLORER, onClick: () => onReturnHomePage() },
      {
        text: 'C3 Overview',
        route: AppRoutes.EXPLORER,
        onClick: () => onReturnHomePage(),
      },
    ];
    if (C3Address || wrongAddress) values.push({ text: 'Search result' });
    return values;
  }, [C3Address, wrongAddress]);

  return (
    <S.Container container>
      <Grid item mobile={12}>
        <Path values={path} />
        <Hero
          address={inputAddress}
          wrongAddress={wrongAddress}
          hasC3Address={!!C3Address}
          enableRefresh={enableRefresh}
          onSearch={onSearch}
          onRefreshAddress={onRefreshAddress}
          onChangeAddress={onChangeAddress}
          onClear={onClear}
        />
      </Grid>
      {!wrongAddress && (
        <>
          {C3Address ? (
            <S.ShowAddressContainer>
              <S.ShowAddressItem item mobile={12}>
                <S.AddressLabel>
                  Your Primary C3 Account ID:
                  <TooltipInfo message="This is the AccountId used in the API interface." />
                </S.AddressLabel>
                {truncateText(C3Address, [9, 4])}
                <S.Copy onClick={() => onCopy(C3Address)}>
                  <Icon name="copy" width={16} height={16} />
                </S.Copy>
              </S.ShowAddressItem>
              <S.ShowAddressItem item mobile={12}>
                <S.AddressLabel>Your Address:</S.AddressLabel>
                {truncateText(userAddress, [7, 5])}
                <S.Copy onClick={() => onCopy(userAddress)}>
                  <Icon name="copy" width={16} height={16} />
                </S.Copy>
              </S.ShowAddressItem>
            </S.ShowAddressContainer>
          ) : (
            <S.Subtitle>C3 Overview</S.Subtitle>
          )}
        </>
      )}
      <TVLChart />
      <Grid item mobile={12}>
        <Grid container columnSpacing={2}>
          <Grid item mobile={12} mediumDesktop={8}>
            {!wrongAddress && !addressStateError ? (
              <Deposit
                c3Assets={holdingAssets}
                isLoading={isLoading || isAddrStateLoading}
                C3Address={C3Address}
                userCash={userCash}
              />
            ) : (
              <S.WrongAddressContainer>
                <EmptyTable icon={{ name: 'emptyInfoAddress', size: 48 }}>
                  <S.WrongAddressTableText>
                    {wrongAddress
                      ? 'No matching C3 account was found for this address'
                      : 'Error getting C3 account data Please try again'}
                  </S.WrongAddressTableText>
                </EmptyTable>
              </S.WrongAddressContainer>
            )}
          </Grid>
          {!isMediumDesktop && (
            <Grid item mobile={4}>
              <Banner />
            </Grid>
          )}
        </Grid>
      </Grid>
      {!wrongAddress && !addressStateError && (
        <S.MarginPoolContainer item mobile={12}>
          {!C3Address ? (
            <MarginPool onChainAppState={onChainC3State} />
          ) : (
            <Grid container spacing={2}>
              <Grid item mobile={12} mediumDesktop={6}>
                <Borrow userPool={userPool} />
              </Grid>
              <Grid item mobile={12} mediumDesktop={6}>
                <Earn userPool={userPool} />
              </Grid>
            </Grid>
          )}
        </S.MarginPoolContainer>
      )}
      {isMediumDesktop && (
        <Grid item mobile={12}>
          <Banner separator={isMobile} {...(isMobile && { size: 80 })} />
        </Grid>
      )}
      <S.Background />
    </S.Container>
  );
};

export default Explorer;
