import MUIButton from '@mui/material/Button';
import styled from '@mui/material/styles/styled';
import { ReactComponent as RightArrow } from '../../../../assets/icons/menu-right-arrow.svg';

import { hexToRgba } from '../../../../utils/styles';

export const RightArrowIcon = styled(RightArrow)(() => ({}));

export const Button = styled(MUIButton)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.default,
  borderRadius: '12px',
  marginBottom: '12px',
  color: theme.palette.primary.contrastText,
  textTransform: 'none',
  fontFamily: 'Manrope, sans-serif',
  fontSize: '1rem',
  fontWeight: 500,
  lineHeight: '1.188rem',
  padding: '14px',
  '&:hover': {
    backgroundColor: hexToRgba(theme.palette.background.default, 50),
    cursor: 'pointer',
  },
}));
