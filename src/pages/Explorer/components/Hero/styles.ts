import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';
import { createShouldForwardProp } from '../../../../utils';

interface IContainer {
  _hasC3Address: boolean;
}

interface IInputContainer {
  _isMobile: boolean;
  _isInputFocused: boolean;
}

export const Container = styled(Grid, {
  shouldForwardProp: createShouldForwardProp(['_hasC3Address']),
})<IContainer>(({ theme, _hasC3Address }) => ({
  borderRadius: theme.spacing(2),
  width: '100%',
  height: _hasC3Address ? '130px' : '144px',
  paddingTop: _hasC3Address ? '0px' : '20px',
  paddingLeft: _hasC3Address ? '0px' : '40px',
  paddingBottom: _hasC3Address ? '0px' : '32px',
  background: _hasC3Address
    ? 'none'
    : `linear-gradient(180deg, #53308A -68.06%, #05061B 95.83%)`,
  marginBottom: _hasC3Address ? '16px' : '32px',
  [theme.breakpoints.down('desktop')]: {
    paddingRight: _hasC3Address ? '0px' : '40px',
    paddingBottom: _hasC3Address && '12px',
    height: 'auto',
  },
  [theme.breakpoints.down('laptop')]: {
    paddingLeft: _hasC3Address ? '0px' : '15px',
    paddingRight: _hasC3Address ? '0px' : '15px',
    paddingBottom: _hasC3Address ? '12px' : '24px',
  },
}));

export const Title = styled('div', {
  shouldForwardProp: createShouldForwardProp(['_hasC3Address']),
})<IContainer>(({ theme, _hasC3Address }) => ({
  fontFamily: 'Bricolage Grotesque',
  fontSize: _hasC3Address ? '40px' : '18px',
  fontWeight: 500,
  marginBottom: 10,
  [theme.breakpoints.down('desktop')]: {
    fontSize: _hasC3Address ? '28px' : '16px',
  },
}));

export const SearchBtn = styled('div')(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const SearchTxt = styled('span')(() => ({
  marginLeft: 8,
}));

export const InputContainer = styled('div', {
  shouldForwardProp: createShouldForwardProp(['_isMobile', '_isInputFocused']),
})<IInputContainer>(({ theme, _isMobile, _isInputFocused }) => ({
  width: '538px',
  height: '56px',
  [theme.breakpoints.down('desktop')]: {
    width: '100%',
  },
  ...(_isMobile &&
    _isInputFocused && {
      marginTop: '68px',
      padding: '0 15px',
      width: 'calc(100% - 30px) !important',
      height: 'calc(100% - 60px - 68px)',
      position: 'absolute',
      top: '0',
      left: '0',
      background: theme.palette.primary.dark,
      zIndex: 999,
    }),
}));

export const Error = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: '14px',
  marginTop: '4px',
}));

export const SearchContainer = styled('div')(() => ({
  width: '144px',
  marginLeft: '16px',
}));
