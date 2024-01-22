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

import * as S from './styles';

const Explorer = () => {
  const { copy } = useCopy();
  const windowSize = useWindowSize();
  const isMediumDesktop = useMemo(
    () => windowSize.width < breakpoints.mediumDesktop,
    [windowSize.width]
  );
  const isMobile = useMemo(
    () => windowSize.width < breakpoints.laptop,
    [windowSize.width]
  );

  const [address, setAddress] = useState<string>('');
  const [C3Address, setC3Address] = useState<string>('');

  const { data: holdingAssets, isLoading } = useGetC3HoldingAssets();
  const onChainC3State = useGetOnChainC3State(holdingAssets);
  const { userCash, userPool } = useGetAddressState(C3Address, onChainC3State);

  const onClear = () => {
    setAddress('');
    setC3Address('');
  };

  const onCopy = async (address: string) => {
    copy(address);
  };

  const onSearch = () => {
    try {
      const c3Address = getC3Address(address);
      setC3Address(c3Address);
    } catch (error) {
      console.error('Invalid address: ', address, error);
    }
  };

  const path = useMemo(() => {
    const values: IPath[] = [
      { text: 'Explorer', route: AppRoutes.EXPLORER, onClick: () => onClear() },
      { text: 'C3 Overview', route: AppRoutes.EXPLORER, onClick: () => onClear() },
    ];
    if (C3Address) values.push({ text: 'Search result' });
    return values;
  }, [C3Address, onClear]);

  return (
    <S.Container container>
      <Grid item mobile={12}>
        <Path values={path} />
        <Hero
          address={address}
          onSearch={onSearch}
          onClear={onClear}
          onChangeAddress={setAddress}
          hasC3Address={!!C3Address}
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
        <S.Subtitle>C3 Overview</S.Subtitle>
      )}
      <Grid item mobile={12}>
        <Grid container columnSpacing={2}>
          <Grid item mobile={12} mediumDesktop={8}>
            <Deposit
              c3Assets={holdingAssets}
              isLoading={isLoading}
              C3Address={C3Address}
              userCash={userCash}
            />
          </Grid>
          {!isMediumDesktop && (
            <Grid item mobile={4}>
              <Banner />
            </Grid>
          )}
        </Grid>
      </Grid>
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
