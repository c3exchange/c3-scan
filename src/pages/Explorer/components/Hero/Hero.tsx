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
  wrongAddress: boolean;
  onSearch: () => void;
  onChangeAddress: (address: string) => void;
  onClear: () => void;
}
const Hero = ({
  address,
  hasC3Address,
  onSearch,
  onClear,
  onChangeAddress,
  wrongAddress,
}: IHero) => {
  const windowSize = useWindowSize();
  const isMobile = useMemo(
    () => windowSize.width < breakpoints.desktop,
    [windowSize.width]
  );

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (!wrongAddress && event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <S.Container
      container
      direction="column"
      _hasC3Address={hasC3Address}
      onKeyUp={handleKeyPress}
    >
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
                error={wrongAddress}
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
              {wrongAddress && <S.Error>Invalid Address</S.Error>}
            </S.InputContainer>
          </Grid>
          {!isMobile && (
            <Grid item desktop>
              <S.SearchContainer>
                <CustomButton
                  height="56px"
                  onClick={onSearch}
                  disabled={!address.length || wrongAddress}
                >
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
