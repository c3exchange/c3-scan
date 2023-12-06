import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';
import { createShouldForwardProp } from '../../../../utils';

interface IContainer {
  _hasC3Address: boolean;
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
}));

export const Title = styled('div', {
  shouldForwardProp: createShouldForwardProp(['_hasC3Address']),
})<IContainer>(({ _hasC3Address }) => ({
  fontFamily: 'Bricolage Grotesque',
  fontSize: _hasC3Address ? '40px' : '18px',
  fontWeight: 500,
  marginBottom: 10,
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

export const InputContainer = styled('div')(() => ({
  width: '538px',
  height: '56px',
}));

export const SearchContainer = styled('div')(() => ({
  width: '144px',
  marginLeft: '16px',
}));
