import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';
import { createShouldForwardProp } from '../../utils';
import { Link } from 'react-router-dom';

interface IPath {
  _last: boolean;
}

export const Container = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
  fontFamily: 'Manrope',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '20px',
  padding: '8px 0',
}));

export const Item = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const Path = styled(Link, {
  shouldForwardProp: createShouldForwardProp(['_last']),
})<IPath>(({ theme, _last }) => ({
  color: _last ? theme.palette.secondary.main : theme.palette.primary.contrastText,
  padding: '0 8px',
  textDecoration: 'none',
}));
