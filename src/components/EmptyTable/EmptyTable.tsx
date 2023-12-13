import { ReactNode } from 'react';
import Icon, { IconName } from '../Icon/Icon';

import * as S from './styles';

interface IEmptyTable {
  icon: {
    size: number;
    name: string;
  };
  children?: ReactNode;
}

const EmptyTable = (props: IEmptyTable) => {
  const { icon, children } = props;
  return (
    <S.EmptyTableContainer container>
      <S.EmptyTableItem item mobile={12}>
        <div>
          <S.EmptyTableIconContainer>
            <Icon name={icon.name as IconName} width={icon.size} height={icon.size} />
          </S.EmptyTableIconContainer>
          {children}
        </div>
      </S.EmptyTableItem>
    </S.EmptyTableContainer>
  );
};

export default EmptyTable;
