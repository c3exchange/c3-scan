import {
  CHAIN_UTILS,
  SUPPORTED_CHAIN_IDS,
  UserAddress,
  encodeAccountId,
  decodeAccountId,
  C3_ACCOUNT_ID_LENGTH,
  isValidAddress,
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
  if (address.length === C3_ACCOUNT_ID_LENGTH) {
    const publicKey = decodeAccountId(address);
    return encodeAccountId(publicKey);
  }
  if (isValidAddress(address)) {
    const publicKey = getPublicKeyByAddress(address);
    return encodeAccountId(publicKey);
  }
  throw new Error(`Invalid address: ${address}`);
};
