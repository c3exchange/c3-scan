import { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import Icon from '../../../../components/Icon/Icon';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { breakpoints } from '../../../../theme';

import * as S from './styles';

interface IHero {
  address: string;
  hasC3Address: boolean;
  onSearch: () => void;
  onChangeAddress: (address: string) => void;
  onClear: () => void;
}
const Hero = ({ address, hasC3Address, onSearch, onClear, onChangeAddress }: IHero) => {
  const windowSize = useWindowSize();
  const isMobile = useMemo(
    () => windowSize.width < breakpoints.desktop,
    [windowSize.width]
  );

  return (
    <S.Container container direction="column" _hasC3Address={hasC3Address}>
      <Grid container>
        <S.Title _hasC3Address={hasC3Address}>
          Search C3 data directly from the Blockchain
        </S.Title>
      </Grid>
      <Grid item>
        <Grid container direction="row">
          <Grid item mobile={12} desktop="auto">
            <S.InputContainer>
              <CustomInput
                value={address}
                onChange={(ev) => onChangeAddress(ev.target.value)}
                onClear={onClear}
                placeholder="Search by address or account id"
                {...(isMobile && {
                  startAdornment: (
                    <S.SearchStartAdornment
                      _disabled={!address.length}
                      onClick={onSearch}
                    >
                      <Icon name="search" width={16} height={16} />
                    </S.SearchStartAdornment>
                  ),
                })}
              />
            </S.InputContainer>
          </Grid>
          {!isMobile && (
            <Grid item desktop>
              <S.SearchContainer>
                <CustomButton height="56px" onClick={onSearch} disabled={!address.length}>
                  <S.SearchBtn>
                    <Icon name="search" width={16} height={16} />
                    <S.SearchTxt>Search</S.SearchTxt>
                  </S.SearchBtn>
                </CustomButton>
              </S.SearchContainer>
            </Grid>
          )}
        </Grid>
      </Grid>
    </S.Container>
  );
};

export default Hero;
