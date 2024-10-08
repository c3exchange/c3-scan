import { useEffect, useRef, useState } from 'react';
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
import {
  DEFAULT_ADDR_STATE_RETRY_COUNT,
  DEFAULT_ADDR_STATE_RETRY_INTERVAL_TIME,
} from '../constants/constants';

/**
 * Retrieves both cash and principal positions for a user's account.
 * @param userPositions - User positions mapping slot IDs to position details.
 * @param assetHoldings - Array of asset holdings for the user.
 * @param getUSDPrice - Function to retrieve the USD price of an instrument.
 * @param serverInstruments - Array of instruments available on the server.
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

  const addressRef = useRef(address);
  useEffect(() => {
    addressRef.current = address;
  }, [address]);

  const [addressStateError, setAddrStateError] = useState<string>('');

  const getAddressOnChainState = async (
    addressToSearch: string,
    coreAppId: number,
    retryCount: number = 0
  ) => {
    // In case of asynchronous retries, we want to make sure the hook is still looking for the same address
    if (addressRef.current !== addressToSearch) return;
    try {
      const decodedAddress = decodeAccountId(addressToSearch);
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
      setAddrStateError('');
    } catch (error: any) {
      console.log('Error:', error);
      setUserCash([]);
      setUserPool([]);
      if (retryCount < DEFAULT_ADDR_STATE_RETRY_COUNT) {
        setTimeout(() => {
          getAddressOnChainState(addressToSearch, coreAppId, retryCount + 1);
        }, DEFAULT_ADDR_STATE_RETRY_INTERVAL_TIME);
      }
      if (retryCount === DEFAULT_ADDR_STATE_RETRY_COUNT) {
        if (error.response?.status === 404) {
          setAddrStateError('No data found for this C3 account');
        } else {
          setAddrStateError('Error getting C3 account data Please try again');
        }
      }
    }
  };

  const setClearState = () => {
    setUserCash([]);
    setUserPool([]);
    setAddrStateError('');
  };

  const refreshAddressOnChainState = () => {
    setClearState();
    if (!coreAppId || !address) return;
    getAddressOnChainState(address, coreAppId);
  };

  useEffect(() => {
    setClearState();
    if (!coreAppId || !address) return;
    getAddressOnChainState(address, coreAppId);
  }, [address, coreAppId]);

  return { userCash, userPool, addressStateError, refreshAddressOnChainState };
};
