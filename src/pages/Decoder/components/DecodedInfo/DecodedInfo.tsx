import Grid from '@mui/material/Grid';
import { DecodedMessage } from '../../../../interfaces/interfaces';
import { keyToLabelMapping } from '../../../../utils';
import * as S from './styles';

interface IDecodedInfo {
  decodedMsg?: DecodedMessage;
}

const DecodedInfo = ({ decodedMsg }: IDecodedInfo) => {
  return (
    <S.Container container direction="column">
      <S.Title item>Translation (aka Parsed Text)</S.Title>
      {decodedMsg &&
        Object.entries(decodedMsg).map(([key, value]) => {
          const label = keyToLabelMapping[key as keyof DecodedMessage] || key;
          return (
            <S.Row justifyContent="space-between">
              <Grid item>{label}:</Grid>
              <Grid item>{value}</Grid>
            </S.Row>
          );
        })}
    </S.Container>
  );
};

export default DecodedInfo;
