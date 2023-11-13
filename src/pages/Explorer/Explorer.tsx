import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Hero from './components/Hero/Hero';
import Deposit from './components/Deposit/Deposit';
import Banner from '../../components/Banner/Banner';
import MarginPool from './components/MarginPool/MarginPool';
import Borrow from './components/Borrow/Borrow';
import Earn from './components/Earn/Earn';
import { useGetC3HoldingAssets } from '../../hooks/useGetHoldingAssets';
import { useGetOnChainC3State } from '../../hooks/useGetOnChainC3State';
import { getC3Address } from '../../utils';
import { useGetAddressState } from '../../hooks/useGetAddressState';
import * as S from './styles';

const Explorer = () => {
  const [address, setAddress] = useState<string>('');
  const [C3Address, setC3Address] = useState<string>('');
  const onClear = () => {
    setAddress('');
    setC3Address('');
  };
  const c3Assets = useGetC3HoldingAssets();
  const onChainC3State = useGetOnChainC3State(c3Assets);
  const { userCash, userPool } = useGetAddressState(C3Address, onChainC3State);

  const onSearch = () => {
    try {
      const c3Address = getC3Address(address);
      setC3Address(c3Address);
    } catch (error) {
      console.error('Invalid address: ', address, error);
    }
  };

  return (
    <S.Container container>
      <Grid item xs={12}>
        <Hero
          address={address}
          onSearch={onSearch}
          onClear={onClear}
          onChangeAddress={setAddress}
          hasC3Address={!!C3Address}
        />
      </Grid>
      {C3Address && (
        <S.ShowAddressContainer item xs={12} display="flex">
          <S.AddressLabel>Address: </S.AddressLabel>
          {address}
        </S.ShowAddressContainer>
      )}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Deposit c3Assets={c3Assets} C3Address={C3Address} userCash={userCash} />
          </Grid>
          <Grid item xs={4}>
            <Banner />
          </Grid>
        </Grid>
      </Grid>
      <S.MarginPoolContainer item xs={12}>
        {!C3Address ? (
          <MarginPool onChainAppState={onChainC3State} />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Borrow userPool={userPool} />
            </Grid>
            <Grid item xs={6}>
              <Earn userPool={userPool} />
            </Grid>
          </Grid>
        )}
      </S.MarginPoolContainer>
    </S.Container>
  );
};

export default Explorer;
