import Grid from '@mui/material/Grid';
import * as S from './styles';
import Icon from '../Icon/Icon';

const Footer = () => {
  return (
    <S.Container container spacing={1}>
      <S.Documentation
        item
        onClick={() => window.open('https://github.com/c3exchange/c3-scan/')}
      >
        <S.GithubContainer>
          <Icon name="github" width={24} height={24} />
        </S.GithubContainer>
        <S.Title>C3 SCAN</S.Title>
        <S.SubTitle>documentation</S.SubTitle>
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
