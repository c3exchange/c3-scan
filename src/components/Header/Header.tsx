import { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { AppRoutes } from '../../routes/routes';
import { useLocation } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { useWindowSize } from '../../hooks/useWindowSize';
import Sidebar from '../Sidebar/Sidebar';
import { breakpoints } from '../../theme';

import * as S from './styles';

const Header = () => {
  const location = useLocation();
  const { isMainnet } = useGlobalContext();
  const windowSize = useWindowSize();
  const mobileCondition = useMemo(
    () => windowSize.width < breakpoints.desktop,
    [windowSize.width]
  );

  return (
    <S.Container container>
      <Grid item display="flex" alignItems="center">
        <S.C3ScanLogoContainer onClick={() => window.open('https://c3.io/')}>
          <Logo width={mobileCondition ? 166 : 214} height={mobileCondition ? 28 : 36} />
        </S.C3ScanLogoContainer>
        {!isMainnet && (
          <S.TestnetBtn>
            <S.Bullet>•</S.Bullet>
            Testnet
          </S.TestnetBtn>
        )}
      </Grid>
      <Grid item>
        <S.LinksContainer container spacing={2}>
          <Grid item>
            <S.LinkRouter
              to={AppRoutes.EXPLORER}
              _active={location.pathname === AppRoutes.EXPLORER}
            >
              Explorer
            </S.LinkRouter>
          </Grid>
          <Grid item>
            <S.LinkRouter
              to={AppRoutes.DECODER}
              _active={location.pathname === AppRoutes.DECODER}
            >
              Decoder
            </S.LinkRouter>
          </Grid>
        </S.LinksContainer>
        <Sidebar />
      </Grid>
    </S.Container>
  );
};
export default Header;
