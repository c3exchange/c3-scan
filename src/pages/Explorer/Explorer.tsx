import { useMemo, useState } from 'react';
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
import { getC3Address, truncateText } from '../../utils';
import { useGetAddressState } from '../../hooks/useGetAddressState';
import { AppRoutes } from '../../routes/routes';
import { breakpoints } from '../../theme';
import { useWindowSize } from '../../hooks/useWindowSize';
import TooltipInfo from '../../components/TooltipInfo/TooltipInfo';
import Icon from '../../components/Icon/Icon';
import useCopy from '../../hooks/useCopy';
import EmptyTable from '../../components/EmptyTable/EmptyTable';

import * as S from './styles';

const Explorer = () => {
  const [address, setAddress] = useState<string>('');
  const [C3Address, setC3Address] = useState<string>('');
  const [wrongAddress, setWrongAddress] = useState<boolean>(false);

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
  const { userCash, userPool } = useGetAddressState(C3Address, onChainC3State);

  const onClear = () => {
    setAddress('');
  };

  const onReturnHomePage = () => {
    onClear();
    setC3Address('');
    setWrongAddress(false);
  };

  const { copy } = useCopy();
  const onCopy = async (address: string) => {
    copy(address);
  };

  const onChangeAddress = (adrInput: string) => {
    setAddress(adrInput);
  };

  const onSearch = () => {
    try {
      const c3Address = getC3Address(address);
      setC3Address(c3Address);
      setWrongAddress(false);
    } catch (error) {
      setWrongAddress(true);
      setC3Address('');
      console.error('Invalid address: ', address, error);
    }
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
    if (C3Address) values.push({ text: 'Search result' });
    return values;
  }, [C3Address, onClear]);

  return (
    <S.Container container>
      <Grid item mobile={12}>
        <Path values={path} />
        <Hero
          wrongAddress={wrongAddress}
          address={address}
          onSearch={onSearch}
          onClear={onClear}
          onChangeAddress={onChangeAddress}
          hasC3Address={!!C3Address}
          C3Address={C3Address}
        />
      </Grid>
      {C3Address ? (
        <S.ShowAddressContainer item mobile={12}>
          <S.AddressLabel>
            Your Primary C3 Account ID:
            <TooltipInfo message="This is the AccountId used in the API interface." />
          </S.AddressLabel>
          {truncateText(C3Address, [9, 4])}
          <S.Copy onClick={() => onCopy(C3Address)}>
            <Icon name="copy" width={16} height={16} />
          </S.Copy>
        </S.ShowAddressContainer>
      ) : (
        !wrongAddress && <S.Subtitle>C3 Overview</S.Subtitle>
      )}
      <Grid item mobile={12}>
        <Grid container columnSpacing={2}>
          <Grid item mobile={12} mediumDesktop={8}>
            {!wrongAddress ? (
              <Deposit
                c3Assets={holdingAssets}
                isLoading={isLoading}
                C3Address={C3Address}
                userCash={userCash}
              />
            ) : (
              <S.WrongAddressContainer>
                <EmptyTable icon={{ name: 'emptyInfoAddress', size: 48 }}>
                  <S.WrongAddressTableText>
                    No matching C3 account was found for this address
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
      {!wrongAddress && (
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
