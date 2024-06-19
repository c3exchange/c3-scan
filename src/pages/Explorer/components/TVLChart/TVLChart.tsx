import { useMemo } from 'react';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { breakpoints } from '../../../../theme';
import MobileTVLChart from './mobile/MobileTVLChart';
import DesktopTVLChart from './desktop/DesktopTVLChart';

const TVLChart = () => {
  const windowSize = useWindowSize();
  const isMobile = useMemo(
    () => windowSize.width < breakpoints.desktop,
    [windowSize.width]
  );

  return <>{isMobile ? <MobileTVLChart /> : <DesktopTVLChart />}</>;
};

export default TVLChart;
