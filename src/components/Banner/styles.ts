import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';

export const Container = styled(Grid)(({ theme }) => ({
  fontFamily: 'Manrope',
  background: theme.palette.background.default,
  width: '100%',
  borderRadius: 8,
  height: '304px',
  paddingLeft: 16,
  paddingRight: 16,
  paddingBottom: 24,
  paddingTop: 40,
  borderTop: `1px solid ${theme.palette.secondary.main}`,
  position: 'relative',
  '&:before, &:after': {
    content: '""',
    position: 'absolute',
    top: 2,
    bottom: 0,
    width: '1px',
    background: `linear-gradient(to bottom, ${theme.palette.secondary.main}, rgba(0,0,0,0))`,
  },
  '&:before': {
    left: 0,
  },
  '&:after': {
    right: 0,
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

export const TextContainer = styled('div')(({ theme }) => ({
  marginTop: '8px',
  width: '204px',
  color: theme.palette.text.primary,
  fontWeight: 500,
  lineHeight: '130%',
  letterSpacing: '0.32px',
}));
