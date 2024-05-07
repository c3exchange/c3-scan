import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';
import { createShouldForwardProp } from '../../utils';

interface IBanner {
  _separator: boolean;
}

export const Container = styled(Grid, {
  shouldForwardProp: createShouldForwardProp(['_separator']),
})<IBanner>(({ theme, _separator }) => ({
  fontFamily: 'Manrope',
  alignItems: 'center',
  background: theme.palette.background.default,
  width: 'auto',
  borderRadius: 8,
  height: _separator ? '350px' : 'auto',
  paddingLeft: 16,
  paddingRight: 16,
  paddingBottom: 24,
  paddingTop: 40,
  borderTop: `1px solid ${theme.palette.secondary.main}`,
  position: 'relative',
  marginLeft: '0px',
  // ...(!_separator && { maxWidth: '1275px' }),
  '&:before, &:after': {
    content: '""',
    position: 'absolute',
    width: '1px',
    top: '4px',
    bottom: '0px',
    background: `linear-gradient(180deg, rgba(240, 162, 0, 0) 0%, ${theme.palette.secondary.main} 2%, rgba(240, 162, 0, 0)) 0 100%`,
  },
  '&:before': {
    left: '-1px',
  },
  '&:after': {
    right: '-1px',
  },
  [theme.breakpoints.down('laptop')]: {
    paddingLeft: '12px',
    paddingRight: '12px',
    paddingBottom: '12px',
    paddingTop: '24px',
    gap: '16px',
    height: 'auto',
    fontSize: '14px',
  },
}));

export const Separator = styled('div')(() => ({
  width: '100%',
  height: '2px',
  background:
    'linear-gradient(270deg, rgba(240, 162, 0, 0.00) -1.16%, #F0A200 44.57%, rgba(240, 162, 0, 0.00) 90.3%)',
}));

export const TitleContainer = styled('span')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const Title = styled('span')(({ theme }) => ({
  color: theme.palette.secondary.main,
  marginLeft: 8,
}));
export const ViewDocumentationBtn = styled('span')(({ theme }) => ({
  fontFamily: 'Manrope',
  fontSize: '16px',
  color: theme.palette.primary.contrastText,
  display: 'flex',
  alignItems: 'center',
}));

export const ViewTxt = styled('span')(() => ({
  marginRight: '8px',
}));

export const TextContainer = styled('div', {
  shouldForwardProp: createShouldForwardProp(['_separator']),
})<IBanner>(({ theme, _separator }) => ({
  marginTop: '8px',
  width: _separator ? 'auto' : '100%',
  color: theme.palette.text.primary,
  fontWeight: 500,
  lineHeight: '130%',
  letterSpacing: '0.32px',
  [theme.breakpoints.down('laptop')]: {
    width: '320px',
  },
  [theme.breakpoints.down('tablet')]: {
    width: '200px',
  },
}));

export const ButtonContainer = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
}));
