import { useEffect, useState } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import { AssetHolding, Price } from '../interfaces/interfaces';
import {
  CoreUserState,
  InstrumentAmount,
  ServerInstrument,
  decodeAccountId,
  parseCoreUserState,
} from '@c3exchange/common';
/**
 * Retrieves both cash and principal positions for a user's account.
 * @param {CoreUserState} userPositions - User positions mapping slot IDs to position details.
 * @param {ServerInstrument[]} serverInstruments - Array of instruments available on the server.
 * @returns An object containing arrays of cash and principal accounts with non-zero positions.
 */
const retrieveNonZeroPositions = (
  userPositions: CoreUserState,
  serverInstruments: ServerInstrument[],
  assetPrices: Price[]
): { cash: AssetHolding[]; pool: AssetHolding[] } => {
  const cashAccounts = [];
  const principalAccounts = [];
  for (const [slotId, positionDetail] of userPositions.entries()) {
    const matchingInstrument = serverInstruments.find(
      (instrument) => instrument.slotId === slotId
    );

    if (matchingInstrument) {
      const instrumentPrice =
        assetPrices.find((price) => price.id === matchingInstrument?.instrument.id)
          ?.price || 0;
      const cashAmount = positionDetail.cash;
      const principalAmount = positionDetail.principal;
      if (cashAmount !== 0n) {
        const amount = InstrumentAmount.fromContract(
          matchingInstrument.instrument,
          cashAmount
        );
        cashAccounts.push({
          instrument: matchingInstrument.instrument,
          amount,
          value: Number(amount.toDecimal()) * instrumentPrice,
        });
      }

      if (principalAmount !== 0n) {
        const amount = InstrumentAmount.fromContract(
          matchingInstrument.instrument,
          principalAmount
        );
        principalAccounts.push({
          instrument: matchingInstrument.instrument,
          amount,
          value: Number(amount.toDecimal()) * instrumentPrice,
        });
      }
    }
  }

  return {
    cash: cashAccounts,
    pool: principalAccounts,
  };
};

export const useGetAddressState = (
  address: string,
  onChainC3State: ServerInstrument[]
) => {
  const [userCash, setUserCash] = useState<AssetHolding[]>([]);
  const [userPool, setUserPool] = useState<AssetHolding[]>([]);
  const { coreAppId, algoClient } = useGlobalContext();
  const { assetPrices } = useGlobalContext();

  const getAddressOnCainState = async (address: string, coreAppId: number) => {
    try {
      const decodedAddress = decodeAccountId(address);
      const rawCoreAccountState = await algoClient
        .getApplicationBoxByName(coreAppId, decodedAddress)
        .do();
      const parsedUserData = await parseCoreUserState(rawCoreAccountState.value);
      const { cash, pool } = await retrieveNonZeroPositions(
        parsedUserData,
        onChainC3State,
        assetPrices
      );
      setUserCash(cash);
      setUserPool(pool);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!coreAppId) return;
    getAddressOnCainState(address, coreAppId);
  }, [address, coreAppId]);

  return { userCash, userPool };
};
