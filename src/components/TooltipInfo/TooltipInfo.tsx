import { memo, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Icon from '../Icon/Icon';
import * as S from './styles';

export interface ITooltipInfoProps {
  message: string;
  size?: number;
}

export const TooltipInfo = ({ message, size }: ITooltipInfoProps) => {
  const [hover, setHover] = useState<boolean>(false);
  const onOpen = (): void => setHover(true);
  const onClose = (): void => setHover(false);

  const TooltipProps = {
    tooltip: {
      sx: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '4px',
        maxWidth: '220px',
      },
    },
  };
  return (
    <Tooltip
      title={message}
      componentsProps={TooltipProps}
      placement="bottom"
      onOpen={onOpen}
      onClose={onClose}
    >
      <S.TooltipInfoContainer _size={size}>
        {hover ? (
          <Icon name="infoFilled" height={12} width={12} />
        ) : (
          <Icon name="info" height={12} width={12} />
        )}
      </S.TooltipInfoContainer>
    </Tooltip>
  );
};

export default memo(TooltipInfo);
