import {
  CHAIN_UTILS,
  SUPPORTED_CHAIN_IDS,
  UserAddress,
  isValidAddress,
  isValidAccountId,
  userAddressToAccountId,
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

export const getC3Address = (address: UserAddress): string => {
  if (isValidAccountId(address)) {
    return address;
  } else if (isValidAddress(address)) {
    return userAddressToAccountId(address);
  }
  throw new Error(`Invalid address: ${address}`);
};
