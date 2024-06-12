import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';

export const ModalContainer = styled(Grid)(({ theme }) => ({
  maxWidth: '620px',
  [theme.breakpoints.down('laptop')]: {
    maxWidth: '100%',
  },
}));

export const Title = styled(Grid)(({ theme }) => ({
  fontFamily: 'Bricolage Grotesque',
  fontSize: '26px',
  fontWeight: 500,
  lineHeight: '26px',
  textAlign: 'center',
  color: theme.palette.primary.contrastText,
  marginBottom: '22px',
}));

export const Description = styled('div')(({ theme }) => ({
  maxWidth: '480px',
  fontFamily: 'Manrope, sans-serif',
  fontSize: '16px',
  color: '#BABABA',
  marginBottom: '20px',
  [theme.breakpoints.down('laptop')]: {
    maxWidth: '100%',
  },
}));

export const ValueContainer = styled(Grid)(() => ({
  marginBottom: '10px',
  alignItems: 'center',
}));

export const SelectorContainer = styled(Grid)(() => ({
  width: '100%',
  marginBottom: '15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const ButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({}));

export const SelectorTitle = styled(Grid)(({ theme }) => ({
  fontFamily: 'Manrope, sans-serif',
  fontSize: '16px',
  color: '#BABABA',
}));

export const Button = styled(ToggleButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderColor: `${theme.palette.primary.dark} !important`,
  '&:hover': {
    backgroundColor: `${theme.palette.primary.main}DD`,
  },
  '&.Mui-selected': {
    backgroundColor: `${theme.palette.primary.main}BB`,
  },
  '&.Mui-selected:hover': {
    backgroundColor: `${theme.palette.primary.main}BB`,
  },
}));

export const Separator = styled('div')(({ theme }) => ({
  borderTop: `1px solid #333333`,
  width: 'cal(100% + 32px)',
  margin: '20px -32px 10px -32px',
}));
