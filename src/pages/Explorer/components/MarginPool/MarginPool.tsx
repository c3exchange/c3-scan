import { useMemo } from 'react';

import DesktopTable from './Desktop/DesktopTable';
import MobileTable from './Mobile/MobileTable';

import { useWindowSize } from '../../../../hooks/useWindowSize';
import { breakpoints } from '../../../../theme';
import { IMarginPool } from './interfaces';
import { usePrices } from '../../../../hooks/usePrices';

const MarginPool = (props: IMarginPool) => {
  const { onChainAppState } = props;
  const { getUSDValue } = usePrices();

  const windowSize = useWindowSize();
  const isMobile = useMemo(
    () => windowSize.width < breakpoints.desktop,
    [windowSize.width]
  );

  return (
    <>
      {isMobile ? (
        <MobileTable onChainAppState={onChainAppState} getUSDValue={getUSDValue} />
      ) : (
        <DesktopTable onChainAppState={onChainAppState} getUSDValue={getUSDValue} />
      )}
    </>
  );
};

export default MarginPool;
