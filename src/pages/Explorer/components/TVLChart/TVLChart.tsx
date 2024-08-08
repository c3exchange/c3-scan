import * as S from './styles';

const TVLChart = () => {
  return (
    <S.TVLChartContainer item mobile={12}>
      <S.TVLChartTitle item>
        <span>Total Value Locked</span>
        <S.DefiLlamaURL
          href="https://defillama.com/protocol/c3-exchange"
          target="_blank"
          rel="noopener noreferrer"
        >
          C3 DefiLlama page
        </S.DefiLlamaURL>
      </S.TVLChartTitle>
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

export default TVLChart;
