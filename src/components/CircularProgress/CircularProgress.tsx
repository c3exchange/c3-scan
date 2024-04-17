import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

interface IUtilCircProgressProps {
  value: number;
}

const UtilizationCircularProgress = ({ value }: IUtilCircProgressProps) => {
  return (
    <Box sx={{ position: 'relative', marginRight: '5px' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: '#574012',
        }}
        size={16}
        thickness={8}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        sx={{
          color: '#f0a200',
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
