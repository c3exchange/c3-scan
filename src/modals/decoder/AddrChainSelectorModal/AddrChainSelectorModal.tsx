import { memo, useState } from 'react';
import Grid from '@mui/material/Grid';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { DecodedMessage, ChainAddressInfo } from '../../../interfaces/interfaces';
import { keyToLabelMapping } from '../../../utils';

import * as S from './styles';

interface IChainSelectorModalProps {
  onSubmit: (
    addressesToCheck: Partial<DecodedMessage>,
    messageDecoded: DecodedMessage
  ) => void;
  addressesToCheck: DecodedMessage;
  messageDecoded: DecodedMessage;
}

const AddrChainSelectorModal = (props: IChainSelectorModalProps) => {
  const { onSubmit: onConfirm, addressesToCheck, messageDecoded } = props;
  const chainAddressEntries = Object.entries(addressesToCheck);

  const [selectedChains, setChains] = useState<string[]>(
    Array(chainAddressEntries.length).fill(null)
  );

  const handleChainSelection = (index: number, newChain: string) => {
    const newChains: string[] = [...selectedChains];
    if (newChain !== null) {
      newChains[index] = newChain;
      setChains(newChains);
    }
  };

  const handleConfirm = () => {
    selectedChains.forEach((selectedChain, index) => {
      if (selectedChain === null) return;
      const key = chainAddressEntries[index][0] as keyof DecodedMessage;
      const initialValues: any = addressesToCheck[key];
      addressesToCheck[key] = initialValues.map((chainAddress: any) => {
        chainAddress.selected = chainAddress.chainName === selectedChain;
        return chainAddress;
      });
    });
    onConfirm(addressesToCheck, messageDecoded);
  };

  return (
    <S.ModalContainer>
      <S.Title>Select a Chain for each Addres</S.Title>
      <S.Separator />
      <S.ValueContainer container>
        <Grid item mobile>
          <S.Description>
            Some addresses can belong to multiple blockchain networks. Please select a
            blockchain network for each address to proceed.
          </S.Description>
        </Grid>
      </S.ValueContainer>
      {chainAddressEntries.map(([param, chains], index) => (
        <S.SelectorContainer container key={index}>
          <S.SelectorTitle item mobile="auto">
            {keyToLabelMapping[param as keyof DecodedMessage] || param}
          </S.SelectorTitle>
          <Grid item>
            <S.ButtonGroup
              value={selectedChains[index]}
              onChange={(event, value) => handleChainSelection(index, value)}
              exclusive
              aria-label="Select blockchain network for the address"
              size="small"
            >
              {chains.map((addressChain: ChainAddressInfo, index: number) => {
                return (
                  <S.Button
                    key={index}
                    value={addressChain.chainName}
                    aria-label={`Select ${addressChain.chainName} network`}
                  >
                    {addressChain.chainName}
                  </S.Button>
                );
              })}
            </S.ButtonGroup>
          </Grid>
        </S.SelectorContainer>
      ))}
      <S.ValueContainer container>
        <CustomButton
          disabled={selectedChains.some((x) => x === null)}
          onClick={handleConfirm}
        >
          Confirm Selection
        </CustomButton>
      </S.ValueContainer>
    </S.ModalContainer>
  );
};

export default memo(AddrChainSelectorModal);
