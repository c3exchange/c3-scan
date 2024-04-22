import { useMemo } from 'react';

import DesktopTable from './Desktop/DesktopTable';
import MobileTable from './Mobile/MobileTable';

import { useWindowSize } from '../../../../hooks/useWindowSize';
import { breakpoints } from '../../../../theme';
import { IMarginPool } from './interfaces';
import { usePrices } from '../../../../hooks/usePrices';
import { useGetInstrumentsPools } from '../../../../hooks/useGetInstrumentsPools';

const MarginPool = (props: IMarginPool) => {
  const { onChainAppState } = props;
  const { getUSDValue } = usePrices();
  const { getEarnAPR } = useGetInstrumentsPools();

  const windowSize = useWindowSize();
  const isMobile = useMemo(
    () => windowSize.width < breakpoints.desktop,
    [windowSize.width]
  );

  return (
    <>
      {isMobile ? (
        <MobileTable
          onChainAppState={onChainAppState}
          getUSDValue={getUSDValue}
          getEarnAPR={getEarnAPR}
        />
      ) : (
        <DesktopTable
          onChainAppState={onChainAppState}
          getUSDValue={getUSDValue}
          getEarnAPR={getEarnAPR}
        />
      )}
    </>
  );
};

export default MarginPool;
