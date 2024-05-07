import { DecodedMessage } from '../../../../interfaces/interfaces';
import { keyToLabelMapping, processValue } from '../../../../utils';
import * as S from './styles';

interface IDecodedInfo {
  decodedMsg?: DecodedMessage;
  secondDecodedMsg?: DecodedMessage;
}

const DecodedInfo = ({ decodedMsg, secondDecodedMsg }: IDecodedInfo) => {
  const formatValue = (value: any) => {
    const { primaryValue, secondaryValue } = processValue(value);
    return (
      <>
        {primaryValue}
        {secondaryValue && <S.SecondaryValue>{secondaryValue}</S.SecondaryValue>}
      </>
    );
  };

  return (
    <S.Container container direction="column">
      <S.Title item>Translation (aka Parsed Text)</S.Title>
      {decodedMsg &&
        Object.entries(decodedMsg).map(([key, value]) => {
          const label = keyToLabelMapping[key as keyof DecodedMessage] || key;
          if (secondDecodedMsg && key !== 'operationType') {
            return (
              <S.Row key={key}>
                <S.Label item>{label}:</S.Label>
                <S.DoubleValue item>
                  <S.Value item>{formatValue(value)}</S.Value>
                  <S.ValueRight item>
                    {formatValue(secondDecodedMsg[key as keyof DecodedMessage])}
                  </S.ValueRight>
                </S.DoubleValue>
              </S.Row>
            );
          }

          return (
            <S.Row key={key}>
              <S.Label item>{label}:</S.Label>
              <S.Value item>{formatValue(value)}</S.Value>
            </S.Row>
          );
        })}
    </S.Container>
  );
};

export default DecodedInfo;
