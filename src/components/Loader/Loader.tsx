import Lottie from 'lottie-react';
import loader from '../../assets/lottie/c3-loader.json';
import * as S from './styles';

const Loader = () => {
  return (
    <S.Container>
      <S.LoaderContainer>
        <Lottie animationData={loader} loop={true} />
      </S.LoaderContainer>
    </S.Container>
  );
};

export default Loader;
