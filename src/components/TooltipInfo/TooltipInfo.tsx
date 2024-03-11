import { memo, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Icon from '../Icon/Icon';
import * as S from './styles';

export interface ITooltipInfoProps {
  message: string;
  size?: number;
  placement?: 'bottom' | 'bottom-start' | 'bottom-end';
}

export const TooltipInfo = ({ message, size, placement }: ITooltipInfoProps) => {
  const [hover, setHover] = useState<boolean>(false);
  const onOpen = (): void => setHover(true);
  const onClose = (): void => setHover(false);

  const TooltipProps = {
    tooltip: {
      sx: {
        display: 'flex',
        alignItems: 'center',
        padding: '9px 12px 8px 12px',
        maxWidth: '220px',
        borderRadius: '4px',
        background: '#23262F',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        color: '#BABABA',
        fontFamily: 'Manrope',
        fontSize: '10px',
        fontWeight: '400',
        lineHeight: '130%',
        letterSpacing: '0.2px',
        marginTop: '0px !important',
      },
    },
  };
  return (
    <Tooltip
      title={message}
      componentsProps={TooltipProps}
      placement={placement ? placement : 'bottom'}
      onOpen={onOpen}
      onClose={onClose}
      enterTouchDelay={100}
      leaveTouchDelay={3000}
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
