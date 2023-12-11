import { useMemo } from 'react';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { AssetHolding } from '../../../../interfaces/interfaces';
import { IEarn } from './interfaces';
import { breakpoints } from '../../../../theme';
import MobileTable from './Mobile/MobileTable';
import DesktopTable from './Desktop/DesktopTable';

const Earn = (props: IEarn) => {
  const { userPool } = props;

  const loans: AssetHolding[] = userPool.filter((pool) =>
    pool.amount.isGreaterThanZero()
  );
  const isEmpty: boolean = loans.length <= 0;
  const totalLoaned: number = loans.reduce((acc, { value }) => acc + value, 0);

  const windowSize = useWindowSize();
  const isMobile = useMemo(
    () => windowSize.width < breakpoints.desktop,
    [windowSize.width]
  );

  return (
    <>
      {isMobile ? (
        <MobileTable loans={loans} isEmpty={isEmpty} totalLoaned={totalLoaned} />
      ) : (
        <DesktopTable loans={loans} isEmpty={isEmpty} totalLoaned={totalLoaned} />
      )}
    </>
  );
};

export default Earn;
