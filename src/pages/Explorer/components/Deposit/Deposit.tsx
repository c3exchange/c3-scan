import { useMemo } from 'react';

import DesktopTable from './desktop/DesktopTable';
import MobileTable from './mobile/MobileTable';

import { useWindowSize } from '../../../../hooks/useWindowSize';
import { useGlobalContext } from '../../../../contexts/GlobalContext';
import { breakpoints } from '../../../../theme';
import { IDeposit } from './interfaces';
import { usePrices } from '../../../../hooks/usePrices';
import { orderInstruments } from '../../../../utils';

const Deposit = (props: IDeposit) => {
  const { c3Assets, C3Address, userCash, isLoading } = props;
  const { getUSDPrice } = usePrices();
  const { instruments } = useGlobalContext();

  const windowSize = useWindowSize();
  const isMobile = useMemo(
    () => windowSize.width < breakpoints.desktop,
    [windowSize.width]
  );

  const totalValueLocked = c3Assets?.reduce((acc, { value }) => acc + value, 0);
  const totalAccountValue = userCash.reduce((acc, { value }) => acc + value, 0);

  const orderedC3Assets = c3Assets ? orderInstruments(instruments, c3Assets) : c3Assets;
  const orderedUserCash = orderInstruments(instruments, userCash);

  return (
    <>
      {isMobile ? (
        <MobileTable
          c3Assets={orderedC3Assets}
          C3Address={C3Address}
          userCash={orderedUserCash}
          isLoading={isLoading}
          totalValueLocked={totalValueLocked}
          totalAccountValue={totalAccountValue}
          getUSDPrice={getUSDPrice}
        />
      ) : (
        <DesktopTable
          c3Assets={orderedC3Assets}
          C3Address={C3Address}
          userCash={orderedUserCash}
          isLoading={isLoading}
          totalValueLocked={totalValueLocked}
          totalAccountValue={totalAccountValue}
          getUSDPrice={getUSDPrice}
        />
      )}
    </>
  );
};

export default Deposit;
