import { useMemo } from 'react';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { AssetHolding } from '../../../../interfaces/interfaces';
import { IBorrow } from './interfaces';
import { breakpoints } from '../../../../theme';
import MobileTable from './Mobile/MobileTable';
import DesktopTable from './Desktop/DesktopTable';
import { useGlobalContext } from '../../../../contexts/GlobalContext';
import { orderInstruments } from '../../../../utils';

const Borrow = (props: IBorrow) => {
  const { userPool } = props;
  const { instruments } = useGlobalContext();

  const borrows: AssetHolding[] = userPool.filter(
    (pool) => !pool.amount.isGreaterThanZero()
  );
  const isEmpty: boolean = borrows.length <= 0;
  const totalBorrowed: number = borrows.reduce((acc, { value }) => acc + value, 0);
  const orderedBorrows = orderInstruments(instruments, borrows);

  const windowSize = useWindowSize();
  const isMobile = useMemo(
    () => windowSize.width < breakpoints.desktop,
    [windowSize.width]
  );

  return (
    <>
      {isMobile ? (
        <MobileTable
          borrows={orderedBorrows}
          isEmpty={isEmpty}
          totalBorrowed={totalBorrowed}
        />
      ) : (
        <DesktopTable
          borrows={orderedBorrows}
          isEmpty={isEmpty}
          totalBorrowed={totalBorrowed}
        />
      )}
    </>
  );
};

export default Borrow;
