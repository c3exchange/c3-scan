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
export const Container = styled(Grid)(({ theme }) => ({
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 74px 32px 74px',
  fontFamily: 'Manrope',
  [theme.breakpoints.down('mediumDesktop')]: {
    padding: '15px 15px 25px 15px',
  },
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
export const TestnetBtn = styled('div')(({ theme }) => ({
  borderRadius: '20px',
  border: `1px solid ${theme.palette.success.main}`,
  height: '37px',
  width: '98px',
  color: theme.palette.primary.contrastText,
  marginLeft: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
export const Bullet = styled('span')(({ theme }) => ({
  color: theme.palette.success.main,
  fontSize: '20px',
}));
