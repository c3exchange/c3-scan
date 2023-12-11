import { useMemo } from 'react';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { AssetHolding } from '../../../../interfaces/interfaces';
import { IBorrow } from './interfaces';
import { breakpoints } from '../../../../theme';
import MobileTable from './Mobile/MobileTable';
import DesktopTable from './Desktop/DesktopTable';

const Borrow = (props: IBorrow) => {
  const { userPool } = props;

  const borrows: AssetHolding[] = userPool.filter(
    (pool) => !pool.amount.isGreaterThanZero()
  );
  const isEmpty: boolean = borrows.length <= 0;
  const totalBorrowed: number = borrows.reduce((acc, { value }) => acc + value, 0);

  const windowSize = useWindowSize();
  const isMobile = useMemo(
    () => windowSize.width < breakpoints.desktop,
    [windowSize.width]
  );

  return (
    <>
      {isMobile ? (
        <MobileTable borrows={borrows} isEmpty={isEmpty} totalBorrowed={totalBorrowed} />
      ) : (
        <DesktopTable borrows={borrows} isEmpty={isEmpty} totalBorrowed={totalBorrowed} />
      )}
    </>
  );
};

export default Borrow;
