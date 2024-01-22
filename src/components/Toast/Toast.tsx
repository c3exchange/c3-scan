import * as S from './styles';

interface IToast {
  title: string;
  message: string;
}

const Toast = ({ title, message }: IToast) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Message>{message}</S.Message>
    </S.Container>
  );
};
export default Toast;
