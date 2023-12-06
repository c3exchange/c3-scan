import { AppRoutes } from '../../routes/routes';
import Icon from '../Icon/Icon';
import * as S from './styles';

export interface IPath {
  text: string;
  route?: string;
  onClick?: () => void;
}

interface IPathProps {
  values: IPath[];
}

const Path = (props: IPathProps) => {
  const { values } = props;
  return (
    <S.Container container>
      {values.map((value, index) => {
        const lastItem: boolean = index === values.length - 1;
        return (
          <S.Item item xs="auto" key={index}>
            <S.Path
              _last={lastItem}
              to={!!value.route ? value.route! : AppRoutes.EXPLORER}
              onClick={value.onClick}
            >
              {value.text}
            </S.Path>
            {!lastItem && <Icon name="rightArrow" width={15} height={15} />}
          </S.Item>
        );
      })}
    </S.Container>
  );
};

export default Path;
