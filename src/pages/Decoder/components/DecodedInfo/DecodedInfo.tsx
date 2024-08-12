import {
  DecodedMessage,
  DecodedMessageFieldTypes,
  MultiValueFieldTypes,
} from '../../../../interfaces/interfaces';
import {
  isMultiValue,
  keyToLabelMapping,
  processDecodedMessageValue,
} from '../../../../utils';
import * as S from './styles';

interface IDecodedInfo {
  decodedMsg?: DecodedMessage;
  secondDecodedMsg?: DecodedMessage;
}

const formatValue = (key: string, value: DecodedMessageFieldTypes) => {
  const { primaryValue, secondaryValue } = processDecodedMessageValue(key, value);
  return (
    <>
      {primaryValue}
      {secondaryValue && <S.SecondaryValue>{secondaryValue}</S.SecondaryValue>}
    </>
  );
};

const DecodedInfo = ({ decodedMsg, secondDecodedMsg }: IDecodedInfo) => {
  const combinedKeys = Array.from(
    new Set([...Object.keys(decodedMsg || {}), ...Object.keys(secondDecodedMsg || {})])
  );

  return (
    <S.Container container direction="column">
      <S.Title item>Translation (aka Parsed Text)</S.Title>
      {decodedMsg &&
        combinedKeys &&
        combinedKeys.map((key) => {
          const msgKey = key as keyof DecodedMessage;
          const label = keyToLabelMapping[msgKey] || msgKey;
          const decodedValue = decodedMsg[msgKey];
          if (secondDecodedMsg && key !== 'operationType') {
            return (
              <S.Row key={key}>
                <S.LabelDoubleValue item>{label}:</S.LabelDoubleValue>
                <S.DoubleMsgValues item>
                  <S.FirstMsgValue item>{formatValue(key, decodedValue)}</S.FirstMsgValue>
                  <S.SecondMsgValue item>
                    {formatValue(key, secondDecodedMsg[msgKey])}
                  </S.SecondMsgValue>
                </S.DoubleMsgValues>
              </S.Row>
            );
          }
          if (isMultiValue(key, decodedValue)) {
            const entries = Object.entries(decodedValue as MultiValueFieldTypes);
            return (
              <S.WideRow key={key} _amountValues={entries.length}>
                <S.Label item>{label}:</S.Label>
                <S.MultiValue item>
                  {entries.map(([key, value]) => {
                    return (
                      <S.Value key={key} item>
                        {formatValue(key, value)}
                      </S.Value>
                    );
                  })}
                </S.MultiValue>
              </S.WideRow>
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
