import MUIReactModal from 'react-modal';
import styled from '@mui/material/styles/styled';
import { createShouldForwardProp } from '../../utils';
import { MOBILE_HEADER_HEIGHT } from '../../constants/constants';

export interface IStyledProps {
  _mobile?: boolean;
  _allheight?: boolean;
}

export interface IStyledReactModalProps extends IStyledProps {
  _background?: string;
}

export const Overlay = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1200,
  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%)',
  backgroundColor: 'transparent !important',
  backdropFilter: 'blur(5px)',
}));

export const ReactModal = styled(MUIReactModal, {
  shouldForwardProp: createShouldForwardProp(['_mobile', '_background', '_allheight']),
})<IStyledReactModalProps>(({ theme, _mobile, _background, _allheight }) => ({
  padding: _mobile ? '12px 15px' : '20px 32px',
  outline: 0,
  minWidth: _mobile ? 'auto' : '480px',
  borderRadius: _mobile ? '16px 16px 0px 0px' : '16px',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  margin: _mobile ? 'auto 0 0 0' : 'auto',
  background: _background ? _background : theme.palette.primary.dark,
  position: 'relative',
  ...(_mobile && {
    width: '100vw',
    height: _allheight ? `calc(100% - ${MOBILE_HEADER_HEIGHT}px)` : 'auto',
  }),
  [theme.breakpoints.down('laptop')]: {
    minWidth: 'auto',
    margin: 'auto 0 0 0',
    padding: '12px 15px',
    height: _allheight ? `calc(100% - ${MOBILE_HEADER_HEIGHT}px)` : 'auto',
    width: '100vw',
    borderRadius: '16px 16px 0px 0px',
  },
}));

export const ModalHeader = styled('div', {
  shouldForwardProp: createShouldForwardProp(['_mobile', '_allheight']),
})<IStyledProps>(({ theme, _mobile }) => ({
  display: 'flex',
  flexDirection: 'row',
  marginLeft: 'auto',
  ...(_mobile && {
    justifyContent: 'center',
    marginTop: '-12px',
    marginLeft: '-15px',
    marginRight: '-15px',
    paddingTop: '12px',
  }),
  [theme.breakpoints.down('laptop')]: {
    justifyContent: 'center',
    marginTop: '-12px',
    marginLeft: '-15px',
    marginRight: '-15px',
    paddingTop: '12px',
  },
}));

export const ModalContent = styled('div', {
  shouldForwardProp: createShouldForwardProp(['_allheight', '_mobile']),
})<IStyledProps>(({ theme, _allheight, _mobile }) => ({
  ...(_mobile && {
    height: _allheight ? 'calc(100% - 32px)' : 'auto',
  }),
  [theme.breakpoints.down('laptop')]: {
    height: _allheight ? 'calc(100% - 32px)' : 'auto',
  },
}));

export const CloseLine = styled('div')(({ theme }) => ({
  width: '64px',
  height: '4px',
  background: '#23262F',
  borderRadius: '50px',
  marginBottom: '16px',
}));

export const CloseButton = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  background: '#23262F',
  alignItems: 'center',
  marginLeft: 'auto',
  cursor: 'pointer',
  justifyContent: 'center',
}));
