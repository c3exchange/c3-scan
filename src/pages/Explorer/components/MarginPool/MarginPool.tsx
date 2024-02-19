import { useMemo } from 'react';

import DesktopTable from './Desktop/DesktopTable';
import MobileTable from './Mobile/MobileTable';

import { useWindowSize } from '../../../../hooks/useWindowSize';
import { breakpoints } from '../../../../theme';
import { IMarginPool } from './interfaces';
import { usePrices } from '../../../../hooks/usePrices';

const MarginPool = (props: IMarginPool) => {
  const { onChainAppState } = props;
  const { data: assetPrices } = usePrices();

  const windowSize = useWindowSize();
  const isMobile = useMemo(
    () => windowSize.width < breakpoints.desktop,
    [windowSize.width]
  );

  const getValue = (instrument: string, amount: number) => {
    return (assetPrices?.find((price) => price.id === instrument)?.price || 0) * amount;
  };

  return (
    <>
      {isMobile ? (
        <MobileTable onChainAppState={onChainAppState} getValue={getValue} />
      ) : (
        <DesktopTable onChainAppState={onChainAppState} getValue={getValue} />
      )}
    </>
  );
};

export default MarginPool;
