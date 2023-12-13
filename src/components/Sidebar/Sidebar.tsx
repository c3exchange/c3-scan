import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';

import SidebarButton from './components/SidebarButton/SidebarButton';

import { useWindowSize } from '../../hooks/useWindowSize';
import { AppRoutes } from '../../routes/routes';
import Icon from '../Icon/Icon';
import { breakpoints } from '../../theme';

import * as S from './styles';

const Sidebar = () => {
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);

  const mobileCondition = useMemo(
    () => windowSize.width < breakpoints.desktop,
    [windowSize.width]
  );

  const closeSidebar = () => setIsOpen(false);
  const openSidebar = () => setIsOpen(true);

  const onNavigate = (path: string, isExternal?: boolean) => {
    if (isExternal) window.open(path, '_blank');
    else navigate(path);
    closeSidebar();
  };

  useEffect(() => {
    if (!mobileCondition) closeSidebar();
  }, [mobileCondition]);

  return (
    <>
      <S.OpenCloseButton onClick={openSidebar} disableRipple>
        <Icon name="hamburger" height={22} width={42} />
      </S.OpenCloseButton>
      <S.Drawer anchor="right" open={isOpen} onClose={closeSidebar}>
        <S.Container container direction="column">
          <S.CloseRow item>
            <Grid item>
              <S.OpenCloseButton onClick={closeSidebar} disableRipple>
                <Icon name="closeHamburger" height={24} width={24} />
              </S.OpenCloseButton>
            </Grid>
          </S.CloseRow>
          <S.SidebarContent
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <S.LinkContainer>
              <SidebarButton onClick={() => onNavigate(AppRoutes.EXPLORER)} key="1">
                <S.LinkText>Explorer</S.LinkText>
              </SidebarButton>
              <SidebarButton onClick={() => onNavigate(AppRoutes.DECODER)} key="2">
                <S.LinkText>Decoder</S.LinkText>
              </SidebarButton>
            </S.LinkContainer>
            <S.SocialLinks container justifyContent="space-between">
              <S.Documentation item>
                <S.GithubContainer>
                  <Icon name="github" width={20} height={20} />
                </S.GithubContainer>
                C3 SCAN <b>documentation</b>
              </S.Documentation>
              <Grid item></Grid>
              <Grid item>
                <S.Separator>|</S.Separator>
              </Grid>
              <Grid item>
                <Icon
                  name="x"
                  height={20}
                  width={20}
                  onClick={() => window.open('https://twitter.com/c3protocol')}
                />
              </Grid>
              <Grid item>
                <Icon
                  name="discord"
                  height={20}
                  width={20}
                  onClick={() => window.open('https://discord.com/invite/CDUc9yW4bF')}
                />
              </Grid>
            </S.SocialLinks>
          </S.SidebarContent>
        </S.Container>
      </S.Drawer>
    </>
  );
};

export default Sidebar;
