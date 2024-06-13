import { useMemo } from 'react';

import DesktopTable from './Desktop/DesktopTable';
import MobileTable from './Mobile/MobileTable';

import { useWindowSize } from '../../../../hooks/useWindowSize';
import { breakpoints } from '../../../../theme';
import { IMarginPool } from './interfaces';
import { usePrices } from '../../../../hooks/usePrices';
import { useGetInstrumentsPools } from '../../../../hooks/useGetInstrumentsPools';
import { orderInstruments } from '../../../../utils';
import { useGlobalContext } from '../../../../contexts/GlobalContext';

const MarginPool = (props: IMarginPool) => {
  const { onChainAppState } = props;
  const { getUSDValue } = usePrices();
  const { getEarnAPR, getBorrowAPR } = useGetInstrumentsPools();
  const { instruments } = useGlobalContext();

  const windowSize = useWindowSize();
  const isMobile = useMemo(
    () => windowSize.width < breakpoints.desktop,
    [windowSize.width]
  );

  const orderedOnChainAppState = onChainAppState
    ? orderInstruments(instruments, onChainAppState)
    : onChainAppState;

  return (
    <>
      {isMobile ? (
        <MobileTable
          onChainAppState={orderedOnChainAppState}
          getUSDValue={getUSDValue}
          getEarnAPR={getEarnAPR}
          getBorrowAPR={getBorrowAPR}
        />
      ) : (
        <DesktopTable
          onChainAppState={orderedOnChainAppState}
          getUSDValue={getUSDValue}
          getEarnAPR={getEarnAPR}
          getBorrowAPR={getBorrowAPR}
        />
      )}
    </>
  );
};

export default MarginPool;
