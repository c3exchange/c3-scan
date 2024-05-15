import { useEffect, useState } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import { AssetHolding } from '../interfaces/interfaces';
import {
  CoreUserState,
  InstrumentAmount,
  ServerInstrument,
  decodeAccountId,
  parseCoreUserState,
} from '@c3exchange/common';
import { usePrices } from './usePrices';
/**
 * Retrieves both cash and principal positions for a user's account.
 * @param {CoreUserState} userPositions - User positions mapping slot IDs to position details.
 * @param {ServerInstrument[]} serverInstruments - Array of instruments available on the server.
 * @returns An object containing arrays of cash and principal accounts with non-zero positions.
 */
const retrieveNonZeroPositions = (
  userPositions: CoreUserState,
  assetHoldings: AssetHolding[],
  getUSDPrice: (instrumentId: string) => number,
  serverInstruments?: ServerInstrument[]
): { cash: AssetHolding[]; pool: AssetHolding[] } => {
  const cashAccounts: AssetHolding[] = [...assetHoldings];
  const principalAccounts = [];
  for (const [slotId, positionDetail] of userPositions.entries()) {
    const matchingInstrument = serverInstruments?.find(
      (instrument) => instrument.slotId === slotId
    );

    if (matchingInstrument) {
      const instrumentPrice = getUSDPrice(matchingInstrument?.instrument.id);
      const cashAmount = positionDetail.cash;
      const principalAmount = positionDetail.principal;
      if (cashAmount !== 0n) {
        const amount = InstrumentAmount.fromContract(
          matchingInstrument.instrument,
          cashAmount
        );
        const index = cashAccounts.findIndex(
          (instrument) => instrument.instrument.id === matchingInstrument.instrument.id
        );
        cashAccounts[index] = {
          instrument: matchingInstrument.instrument,
          amount,
          value: Number(amount.toDecimal()) * instrumentPrice,
        };
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
  onChainC3State?: ServerInstrument[]
) => {
  const { coreAppId, algoClient } = useGlobalContext();
  const { assetHoldings } = useGlobalContext();
  const { getUSDPrice } = usePrices();
  const [userCash, setUserCash] = useState<AssetHolding[]>(assetHoldings);
  const [userPool, setUserPool] = useState<AssetHolding[]>([]);

  const [hadError, setHadError] = useState<boolean>(false);
  const maxRetries = 1;
  const timeBetweenRetries = 2000;

  const getAddressOnChainState = async (
    address: string,
    coreAppId: number,
    retryCount: number = 0
  ) => {
    try {
      const decodedAddress = decodeAccountId(address);
      const rawCoreAccountState = await algoClient
        .getApplicationBoxByName(coreAppId, decodedAddress)
        .do();
      const parsedUserData = await parseCoreUserState(rawCoreAccountState.value);
      const { cash, pool } = await retrieveNonZeroPositions(
        parsedUserData,
        assetHoldings,
        getUSDPrice,
        onChainC3State
      );
      setUserCash(cash);
      setUserPool(pool);
      setHadError(false);
    } catch (error) {
      console.log('Error:', error);
      setUserCash([]);
      setUserPool([]);
      if (retryCount < maxRetries) {
        setTimeout(() => {
          getAddressOnChainState(address, coreAppId, retryCount + 1);
        }, timeBetweenRetries);
      }
      if (retryCount === maxRetries) {
        setHadError(true);
      }
    }
  };

  const setClearState = () => {
    setUserCash([]);
    setUserPool([]);
    setHadError(false);
  };

  const refreshAddressOnChainState = () => {
    setClearState();
    if (!coreAppId || !address) return;
    getAddressOnChainState(address, coreAppId);
  };

  useEffect(() => {
    if (address === '') setClearState();
    if (!coreAppId || !address) return;
    setHadError(false);
    getAddressOnChainState(address, coreAppId);
  }, [address, coreAppId]);

  return { userCash, userPool, error: hadError, refreshAddressOnChainState };
};
