import Grid from '@mui/material/Grid';
import { ReactComponent as C3ScanLogo } from '../../assets/images/c3ScanLogo.svg';
import Icon from '../Icon/Icon';
import CustomButton from '../CustomButton/CustomButton';
import * as S from './styles';

interface IBanner {
  separator?: boolean;
  size?: number;
}

const Banner = (props: IBanner) => {
  const { separator = true, size = 102 } = props;
  return (
    <S.Container
      container
      _separator={separator}
      {...(!separator && { columnSpacing: 2 })}
    >
      <Grid item mobile={12} laptop desktop>
        <Grid container spacing={2} alignItems="center">
          <Grid item laptop="auto">
            <C3ScanLogo height={size} width={size} />
          </Grid>
          <Grid item laptop>
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
      <S.ButtonContainer item mobile={12} laptop="auto" desktop>
        <CustomButton
          {...(!separator && { width: 'auto' })}
          _height="54px"
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
