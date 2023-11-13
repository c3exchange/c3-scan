import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';
import { Link } from 'react-router-dom';
import { createShouldForwardProp } from '../../utils';

interface ILink {
  _active: boolean;
}

export const C3ScanLogoContainer = styled('div')(() => ({
  cursor: 'pointer',
}));
export const Container = styled(Grid)(() => ({
  padding: '16px 74px 32px 74px',
  fontFamily: 'Manrope',
}));
export const LinksContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));
export const HamburgerContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));
export const LinkRouter = styled(Link, {
  shouldForwardProp: createShouldForwardProp(['_active']),
})<ILink>(({ theme, _active }) => ({
  textDecoration: 'none',
  color: _active ? theme.palette.primary.contrastText : theme.palette.text.primary,
  fontSize: '16px',
  fontWeight: 500,
  marginRight: '32px',
  '&:hover': {
    color: _active ? theme.palette.primary.contrastText : theme.palette.text.primary,
  },
}));
