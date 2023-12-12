import Grid from '@mui/material/Grid';

import * as S from './styles';

interface ISidebarButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const SidebarButton = (props: ISidebarButtonProps) => {
  const { onClick, children } = props;

  const onClickHandler = () => {
    if (onClick) onClick();
  };

  return (
    <S.Button disableRipple onClick={onClickHandler}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>{children}</Grid>
        <Grid item display="flex" alignItems="center">
          <S.RightArrowIcon />
        </Grid>
      </Grid>
    </S.Button>
  );
};

export default SidebarButton;
