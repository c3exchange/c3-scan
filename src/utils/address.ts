import {
  CHAIN_UTILS,
  SUPPORTED_CHAIN_IDS,
  UserAddress,
  isValidAddress,
  isValidAccountId,
  userAddressToAccountId,
  accountIdToUserAddress,
} from '@c3exchange/common';

const getChainUtilityByAddress = (address: UserAddress) => {
  const chainUtility = SUPPORTED_CHAIN_IDS.map((key) => CHAIN_UTILS[key]).find(
    (utility) => utility.isValidAddress(address)
  );
  if (!chainUtility) {
    throw new Error(`Invalid address: ${address}`);
  }
  return chainUtility;
};

export const getPublicKeyByAddress = (address: UserAddress): Uint8Array => {
  const chainUtility = getChainUtilityByAddress(address);
  return chainUtility.getPublicKey(address);
};

export const getC3Address = (address: UserAddress): [string, string] => {
  if (isValidAccountId(address)) {
    return [address, accountIdToUserAddress(address)];
  }
  if (isValidAddress(address)) {
    const c3Address = userAddressToAccountId(address);
    return [c3Address, accountIdToUserAddress(c3Address)];
  }
  throw new Error(`Invalid address: ${address}`);
};
