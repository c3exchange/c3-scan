import Grid from '@mui/material/Grid';
import { ReactComponent as C3ScanLogo } from '../../assets/images/c3ScanLogo.svg';
import Icon from '../Icon/Icon';
import CustomButton from '../CustomButton/CustomButton';
import * as S from './styles';

interface IBanner {
  separator?: boolean;
}

const Banner = (props: IBanner) => {
  const { separator = true } = props;
  return (
    <S.Container
      container
      _separator={separator}
      {...(!separator && { columnSpacing: 2 })}
    >
      <Grid item xs={12} lg="auto">
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <C3ScanLogo height={102} width={102} />
          </Grid>
          <Grid item>
            <S.TitleContainer>
              <Icon name="github" width={32} height={32} />
              <S.Title>C3 SCAN</S.Title>
            </S.TitleContainer>
            <S.TextContainer _separator={separator}>
              It's an open source project. Everyone is invited to contribute!
            </S.TextContainer>
          </Grid>
        </Grid>
      </Grid>
      {separator && <S.Separator />}
      <S.ButtonContainer item xs={12} lg>
        <CustomButton
          {...(!separator && { width: 'auto' })}
          height="54px"
          onClick={() => window.open('https://github.com/c3exchange/c3-scan/')}
        >
          <S.ViewDocumentationBtn>
            <S.ViewTxt>View Documentation</S.ViewTxt>
            <Icon name="github" width={20} height={20} />
          </S.ViewDocumentationBtn>
        </CustomButton>
      </S.ButtonContainer>
    </S.Container>
  );
};

export default Banner;
