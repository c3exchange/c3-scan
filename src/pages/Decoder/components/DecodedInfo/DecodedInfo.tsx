import { DecodedMessage } from '../../../../interfaces/interfaces';
import { keyToLabelMapping, processDecodedMessageValue } from '../../../../utils';
import * as S from './styles';

interface IDecodedInfo {
  decodedMsg?: DecodedMessage;
  secondDecodedMsg?: DecodedMessage;
}

const DecodedInfo = ({ decodedMsg, secondDecodedMsg }: IDecodedInfo) => {
  const formatValue = (key: string, value: any) => {
    const { primaryValue, secondaryValue } = processDecodedMessageValue(key, value);
    return (
      <>
        {primaryValue}
        {secondaryValue && <S.SecondaryValue>{secondaryValue}</S.SecondaryValue>}
      </>
    );
  };

  const combinedEntries = Array.from(
    new Set([...Object.keys(decodedMsg || {}), ...Object.keys(secondDecodedMsg || {})])
  );

  return (
    <S.Container container direction="column">
      <S.Title item>Translation (aka Parsed Text)</S.Title>
      {decodedMsg &&
        combinedEntries &&
        combinedEntries.map((key) => {
          const msgKey = key as keyof DecodedMessage;
          const label = keyToLabelMapping[msgKey] || msgKey;
          const decodedValue = decodedMsg[msgKey];
          if (secondDecodedMsg && key !== 'operationType') {
            return (
              <S.Row key={key}>
                <S.LabelDoubleValue item>{label}:</S.LabelDoubleValue>
                <S.DoubleValue item>
                  <S.Value item>{formatValue(key, decodedValue)}</S.Value>
                  <S.ValueRight item>
                    {formatValue(key, secondDecodedMsg[msgKey])}
                  </S.ValueRight>
                </S.DoubleValue>
              </S.Row>
            );
          }

          return (
            <S.Row key={key}>
              <S.Label item>{label}:</S.Label>
              <S.Value item>{formatValue(key, decodedValue)}</S.Value>
            </S.Row>
          );
        })}
    </S.Container>
  );
};

export default DecodedInfo;
