import * as S from './styles';

const MobileTVLChart = () => {
  return (
    <S.TVLChartContainer item mobile={12}>
      <S.TVLChartTitle item>Total Value Locked Chart</S.TVLChartTitle>
      <S.TVLChart>
        <iframe
          width="100%"
          height="360px"
          src="https://defillama.com/chart/protocol/c3-exchange?tvl=true&denomination=USD&theme=dark"
          title="C3"
          frameBorder="0"
        ></iframe>
      </S.TVLChart>
    </S.TVLChartContainer>
  );
};

export default MobileTVLChart;
