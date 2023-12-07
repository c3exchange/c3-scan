import { useMemo } from 'react';

import DesktopTable from './desktop/DesktopTable';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { breakpoints } from '../../../../theme';
import { IDeposit } from './interfaces';
import MobileTable from './mobile/MobileTable';

const Deposit = (props: IDeposit) => {
  const { c3Assets, C3Address, userCash, isLoading } = props;

  const windowSize = useWindowSize();
  const isMobile = useMemo(
    () => windowSize.width < breakpoints.desktop,
    [windowSize.width]
  );

  const totalValueLocked = c3Assets.reduce((acc, { value }) => acc + value, 0);
  const totalAccountValue = userCash.reduce((acc, { value }) => acc + value, 0);

  return (
    <>
      {isMobile ? (
        <MobileTable
          c3Assets={c3Assets}
          C3Address={C3Address}
          userCash={userCash}
          isLoading={isLoading}
          totalValueLocked={totalValueLocked}
          totalAccountValue={totalAccountValue}
        />
      ) : (
        <DesktopTable
          c3Assets={c3Assets}
          C3Address={C3Address}
          userCash={userCash}
          isLoading={isLoading}
          totalValueLocked={totalValueLocked}
          totalAccountValue={totalAccountValue}
        />
      )}
    </>
  );
};

export default Deposit;
