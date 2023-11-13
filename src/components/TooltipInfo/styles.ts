import styled from '@mui/material/styles/styled';

interface StyledTooltipInfoProps {
  _size?: number;
}

export const TooltipInfoContainer = styled('span')<StyledTooltipInfoProps>(
  ({ _size }) => ({
    marginLeft: '4px',
    marginRight: '4px',
    height: _size ? `${_size}px` : '16px',
    width: _size ? `${_size}px` : '16px',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
  })
);
