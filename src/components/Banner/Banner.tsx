import Grid from '@mui/material/Grid';
import { ReactComponent as C3ScanLogo } from '../../assets/images/c3ScanLogo.svg';
import Icon from '../Icon/Icon';
import CustomButton from '../CustomButton/CustomButton';
import * as S from './styles';

const Banner = () => {
  return (
    <S.Container container>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item>
            <C3ScanLogo height={102} width={102} />
          </Grid>
          <Grid item>
            <S.TitleContainer>
              <Icon name="github" width={32} height={32} />
              <S.Title>C3 SCAN</S.Title>
            </S.TitleContainer>
            <S.TextContainer>
              It's an open source project. Everyone is invited to contribute!
            </S.TextContainer>
          </Grid>
        </Grid>
      </Grid>
      <S.Separator />
      <Grid item xs={12}>
        <CustomButton
          height="54px"
          onClick={() => window.open('https://github.com/c3exchange/c3-scan/')}
        >
          <S.ViewDocumentationBtn>
            <S.ViewTxt>View Documentation</S.ViewTxt>
            <Icon name="github" width={20} height={20} />
          </S.ViewDocumentationBtn>
        </CustomButton>
      </Grid>
    </S.Container>
  );
};

export default Banner;
