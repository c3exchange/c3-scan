import { useMemo } from 'react';

import DesktopTable from './Desktop/DesktopTable';
import MobileTable from './Mobile/MobileTable';

import { useWindowSize } from '../../../../hooks/useWindowSize';
import { breakpoints } from '../../../../theme';
import { IMarginPool } from './interfaces';

const MarginPool = (props: IMarginPool) => {
  const { onChainAppState } = props;

  const windowSize = useWindowSize();
  const isMobile = useMemo(
    () => windowSize.width < breakpoints.desktop,
    [windowSize.width]
  );

  return (
    <>
      {isMobile ? (
        <MobileTable onChainAppState={onChainAppState} />
      ) : (
        <DesktopTable onChainAppState={onChainAppState} />
      )}
    </>
  );
};

export default MarginPool;
