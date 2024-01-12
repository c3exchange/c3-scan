import Grid from '@mui/material/Grid';
import * as S from './styles';
import Icon from '../Icon/Icon';

const Footer = () => {
  return (
    <S.Container container spacing={1}>
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
          height={24}
          width={24}
          onClick={() => window.open('https://twitter.com/c3protocol')}
        />
      </Grid>
      <Grid item>
        <Icon
          name="discord"
          height={24}
          width={24}
          onClick={() => window.open('https://discord.gg/BXDqaQyVQK')}
        />
      </Grid>
    </S.Container>
  );
};

export default Footer;
