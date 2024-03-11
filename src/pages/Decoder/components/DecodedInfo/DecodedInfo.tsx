import { DecodedMessage } from '../../../../interfaces/interfaces';
import { keyToLabelMapping, processValue } from '../../../../utils';
import * as S from './styles';

interface IDecodedInfo {
  decodedMsg?: DecodedMessage;
}

const DecodedInfo = ({ decodedMsg }: IDecodedInfo) => {
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
          return (
            <S.Row justifyContent="space-between">
              <S.Label item>{label}:</S.Label>
              <S.Value item>{formatValue(value)}</S.Value>
            </S.Row>
          );
        })}
    </S.Container>
  );
};

export default DecodedInfo;
