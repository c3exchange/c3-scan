import { useMemo } from 'react';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { breakpoints } from '../../../../theme';

import * as S from './styles';

const TVLChart = () => {
  const windowSize = useWindowSize();
  const isMobile = useMemo(
    () => windowSize.width < breakpoints.desktop,
    [windowSize.width]
  );

  return (
    <>
      {isMobile ? (
        <S.TVLChartContainerMobile item mobile={12}>
          <S.TVLChartTitleMobile item>Total Value Locked Chart</S.TVLChartTitleMobile>
          <S.TVLChartMobile>
            <iframe
              width="100%"
              height="360px"
              src="https://defillama.com/chart/protocol/c3-exchange?tvl=true&denomination=USD&theme=dark"
              title="C3"
              frameBorder="0"
            ></iframe>
          </S.TVLChartMobile>
        </S.TVLChartContainerMobile>
      ) : (
        <S.TVLChartContainerDesktop item mobile={12}>
          <S.TVLChartTitleDesktop item>Total Value Locked Chart</S.TVLChartTitleDesktop>
          <S.TVLChartDesktop>
            <iframe
              width="100%"
              height="360px"
              src="https://defillama.com/chart/protocol/c3-exchange?tvl=true&denomination=USD&theme=dark"
              title="C3"
              frameBorder="0"
            ></iframe>
          </S.TVLChartDesktop>
        </S.TVLChartContainerDesktop>
      )}
    </>
  );
};

export default TVLChart;
