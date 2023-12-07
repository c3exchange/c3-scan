import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { AppRoutes } from '../../routes/routes';
import Icon from '../Icon/Icon';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useLocation } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/GlobalContext';

import * as S from './styles';

const Header = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const location = useLocation();
  const { isMainnet } = useGlobalContext();
  return (
    <S.Container container>
      <Grid item display="flex">
        <S.C3ScanLogoContainer onClick={() => window.open('https://c3.io/')}>
          <Logo />
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
        <S.HamburgerContainer>
          <Icon
            name="hamburger"
            height={22}
            width={42}
            onClick={() => setSideBarOpen(true)}
          />
        </S.HamburgerContainer>
        <SwipeableDrawer
          anchor="right"
          open={sideBarOpen}
          onClose={() => setSideBarOpen(false)}
          onOpen={() => setSideBarOpen(true)}
        ></SwipeableDrawer>
      </Grid>
    </S.Container>
  );
};
export default Header;
