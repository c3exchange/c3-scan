import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import { theme } from '../../theme';

interface IUtilCircProgressProps {
  value: number;
}

const UtilizationCircularProgress = ({ value }: IUtilCircProgressProps) => {
  const backCircProgressOpacity = '49';
  return (
    <Box sx={{ position: 'relative', marginRight: '5px' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: `${theme.palette.secondary.main}${backCircProgressOpacity}`,
        }}
        size={16}
        thickness={8}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        sx={{
          color: theme.palette.secondary.main,
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={16}
        thickness={8}
        value={value}
      />
    </Box>
  );
};

export default UtilizationCircularProgress;
