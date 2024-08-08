import {
  DecodedMessage,
  OnChainRequestOp,
  ChainAddressInfo,
  ChainAddressInfoMap,
} from '../../interfaces/interfaces';
import {
  decodeBase64,
  IPackedInfo,
  decodeUint16,
  decodeUint,
  CHAIN_UTILS,
  CHAIN_ID_ETH,
  CHAIN_ID_SOLANA,
  CHAIN_ID_ALGORAND,
  InstrumentAmount,
  ServerInstrument,
  convertUint64toInt64,
  getChainNameByChainId,
  decodeABIValue,
  ChainId,
  ChainName,
  SupportedChainId,
  isEVMChain,
  isChainId,
} from '@c3exchange/common';
import { truncateText } from '../utils';
import {
  getEnumKeyByEnumValue,
  getInstrumentfromSlotId,
  packABIString,
} from './decoderUtils';
import { decodeAddress } from 'algosdk';

export const withdrawFormat = '(byte,uint8,uint64,(uint16,address),uint64,uint64)';
export const poolMoveFormat = '(byte,uint8,uint64)';
export const delegateFormat = '(byte,address,uint64,uint64)';
export const accountMoveFormat = '(byte,address,(uint8,uint64)[],(uint8,uint64)[])';
export const ORDER_OPERATION_STR = '06';

const orderDataFormat: IPackedInfo = {
  operation: { type: 'fixed', valueHex: ORDER_OPERATION_STR },
  account: { type: 'base64', size: 32 },
  nonce: { type: 'number' },
  expiresOn: { type: 'number' },
  sellSlotId: { type: 'byte' },
  sellAmount: { type: 'uint' },
  maxBorrow: { type: 'uint' },
  buySlotId: { type: 'byte' },
  buyAmount: { type: 'uint' },
  maxRepay: { type: 'uint' },
};

export const settleFormat = packABIString(orderDataFormat);

/**
 * Decodes the welcome message.
 *
 * @param encodedMessage - The encoded message.
 * @returns - An object containing the operation type, user ID, and creation time.
 */
const decodeWelcomeMessage = (encodedMessage: string) => {
  const finalWordMatcher = /([A-Za-z0-9+/=]+)\s*$/;
  const match = encodedMessage.match(finalWordMatcher);
  if (!match) return;
  const operation = match[1];
  const decodedNonce = Buffer.from(operation, 'base64').toString();
  const parts = decodedNonce.split('-');
  if (parts.length < 2) return;
  const userID = parts[0];
  const extractedCreationTime = parts[1];
  const creationTime = new Date(parseInt(extractedCreationTime)).toLocaleString();
  const operationType = getEnumKeyByEnumValue(OnChainRequestOp, OnChainRequestOp.Login);
  return { operationType, userID, creationTime };
};

interface UnpackedData {
  result: Record<string, any>;
  bytesRead: number;
}

/**
 * Decodes the partial data of the header of a signed message.
 *
 * @param data - The data to decode.
 * @param accountChain - The account chain.
 * @returns - An object containing the result and the number of bytes read.
 */
export const unpackPartialData = (
  data: Uint8Array,
  accountChain: string | null
): UnpackedData => {
  const formatOpt: IPackedInfo = {
    target: { type: 'address' },
    lease: { type: 'bytes', size: 32 },
    lastValid: { type: 'number' },
  };
  let bytesRead = 0;
  const result: Record<string, any> = {};
  for (const [key, packedInfo] of Object.entries(formatOpt)) {
    if (bytesRead >= data.length) {
      throw new Error(
        `Unpack data length was not enough for the format provided. Data: ${data}, format: ${JSON.stringify(
          formatOpt
        )}`
      );
    }
    let value;
    switch (packedInfo.type) {
      case 'address':
        const publicKeyAddr = data.slice(bytesRead, bytesRead + 32);
        const possibleChainAddresses = getChainAddresses(publicKeyAddr);
        const chainAddresses = filterBySelectedChain(
          possibleChainAddresses,
          accountChain
        );
        const recordChainAddresses = toObjectChainAddresses('account', chainAddresses);
        result['accountAddresses'] = recordChainAddresses;
        bytesRead += 32;
        break;
      case 'bytes': {
        let size: number;
        if (packedInfo.size === undefined) {
          size = decodeUint16(data.slice(bytesRead, bytesRead + 2));
          bytesRead += 2;
        } else {
          size = packedInfo.size;
        }
        value = new Uint8Array(data.slice(bytesRead, bytesRead + size));
        bytesRead += size;
        break;
      }
      case 'number': {
        const length = packedInfo.size ?? 8;
        value = Number(decodeUint(data.slice(bytesRead, bytesRead + length), length));
        bytesRead += length;
        break;
      }
      default:
        throw new Error(`Unknown decode type: ${packedInfo}`);
    }
    if (value !== null && value !== undefined) result[key] = value;
  }

  return { result, bytesRead };
};

export function decodeWithdraw(operation: Uint8Array, appState: ServerInstrument[]) {
  const withdrawResult = decodeABIValue(operation, withdrawFormat);
  const operationType = getEnumKeyByEnumValue(
    OnChainRequestOp,
    OnChainRequestOp.Withdraw
  );
  const instrumentSlotId = Number(withdrawResult[1]);
  const encodedAmount = withdrawResult[2];
  const chainId = Number(withdrawResult[3][0]);
  const chainName = getChainNameByChainId(chainId as ChainId);
  const chain = { chainId, chainName };
  const encodedMaxBorrow = withdrawResult[4];

  // The decodeABIValue function retrieves the value of the 'address' field of withdrawFormat, which corresponds
  // to a public key of a wallet. Then it converts it into an Algorand address and returns this address.
  // However, this public key may be from another chain, so we need to extract the public key from
  // the address and calculate the correct address for the target chain.
  const algorandAddress = withdrawResult[3][1];
  const publicKey = decodeAddress(algorandAddress).publicKey;
  const target =
    CHAIN_UTILS[chainId as SupportedChainId].getAddressByPublicKey(publicKey);

  const amount = Number(
    InstrumentAmount.fromContract(
      getInstrumentfromSlotId(instrumentSlotId, appState),
      BigInt(encodedAmount)
    ).toDecimal()
  );
  const instrumentName = getInstrumentfromSlotId(instrumentSlotId, appState).id;
  const maxBorrow = Number(
    InstrumentAmount.fromContract(
      getInstrumentfromSlotId(instrumentSlotId, appState),
      BigInt(encodedMaxBorrow)
    ).toDecimal()
  );

  const withdrawDecoded: DecodedMessage = {
    operationType,
    target,
    chain,
    instrumentName,
    amount,
  };
  if (maxBorrow > 0) withdrawDecoded.maxBorrow = maxBorrow;
  return withdrawDecoded;
}

export function decodePoolMove(operation: Uint8Array, appState: ServerInstrument[]) {
  const poolResult = decodeABIValue(operation, poolMoveFormat);
  const instrumentSlotId = Number(poolResult[1]);
  const encodedAmount = convertUint64toInt64(poolResult[2]);
  const instrumentAmount = InstrumentAmount.fromContract(
    getInstrumentfromSlotId(instrumentSlotId, appState),
    encodedAmount
  );
  const amount = Number(
    (instrumentAmount.isZeroOrLess()
      ? instrumentAmount.neg()
      : instrumentAmount
    ).toDecimal()
  );
  const operationType = encodedAmount > 0 ? 'Subscribe' : 'Redeem';
  const instrumentName = getInstrumentfromSlotId(instrumentSlotId, appState).id;
  return { operationType, instrumentName, amount };
}

export function decodeSettle(operation: Uint8Array, appState: ServerInstrument[]) {
  const settleResult = decodeABIValue(operation, settleFormat);
  const operationType = getEnumKeyByEnumValue(OnChainRequestOp, OnChainRequestOp.Settle);
  const nonce = Number(settleResult[2]);
  const extractedExpirationTime = settleResult[3];
  const expiresOn = new Date(parseInt(extractedExpirationTime) * 1000).toLocaleString();
  const sellSlotId = settleResult[4];
  const sellAsset = getInstrumentfromSlotId(sellSlotId, appState);
  const sellAmount = Number(
    InstrumentAmount.fromContract(sellAsset, settleResult[5]).toDecimal()
  );
  const maxBorrow = Number(
    InstrumentAmount.fromContract(sellAsset, settleResult[6]).toDecimal()
  );
  const buySlotId = settleResult[7];
  const buyAsset = getInstrumentfromSlotId(buySlotId, appState);
  const buyAmount = Number(
    InstrumentAmount.fromContract(buyAsset, settleResult[8]).toDecimal()
  );
  const maxRepay = Number(
    InstrumentAmount.fromContract(buyAsset, settleResult[9]).toDecimal()
  );

  return {
    operationType,
    nonce,
    expiresOn,
    sellAssetId: sellAsset.id,
    sellAmount,
    buyAssetId: buyAsset.id,
    buyAmount,
    maxBorrow,
    maxRepay,
  };
}

function decodeDelegate(operation: Uint8Array, delegationChain: string | null) {
  const operationType = getEnumKeyByEnumValue(
    OnChainRequestOp,
    OnChainRequestOp.Delegate
  );
  const delegateResult = decodeABIValue(operation, delegateFormat);
  const extractedDelegateAddress = delegateResult[1];
  const delegateAddress = truncateText(extractedDelegateAddress, [8, 8]);
  const nonce = Number(delegateResult[2]);
  const extractedExpirationTime = delegateResult[3];
  const expiresOn = new Date(parseInt(extractedExpirationTime) * 1000).toLocaleString();

  // This has a similar problem to the one in decodeWithdraw
  // The value of extractedDelegateAddress is an Algorand address. So we need to extract
  // the public key from the address and get the addresses for the every valid chain.
  const publicKeyDelegAddr = decodeAddress(extractedDelegateAddress).publicKey;
  const possibleChainAddresses = getChainAddresses(publicKeyDelegAddr);
  const chainAddresses = filterBySelectedChain(possibleChainAddresses, delegationChain);
  const recordChainAddresses = toObjectChainAddresses('delegateAddress', chainAddresses);

  const isEphemeralKeyDelegateMsg = nonce === 0;
  return {
    operationType: isEphemeralKeyDelegateMsg ? 'Ephemeral Key Delegate' : operationType,
    ...(isEphemeralKeyDelegateMsg
      ? { delegateAddress }
      : { delegatedAddresses: recordChainAddresses }),
    expiresOn,
    ...(isEphemeralKeyDelegateMsg ? {} : { nonce }),
  };
}

export type AddressesChains = {
  accountChain: string | null;
  delegationChain: string | null;
};
/**
 * Decodes a message corresponding to it's operation type.
 *
 * @param encodeMessage - The encoded message.
 * @param serverInstruments - The server instruments.
 * @returns - An object containing the decoded message.
 */
export const decodeMessage = (
  encodeMessage: string,
  addressesChains: AddressesChains,
  serverInstruments: ServerInstrument[]
): DecodedMessage | undefined => {
  try {
    const welcomeRegex = /^\s*Welcome to C3/;
    if (welcomeRegex.test(encodeMessage)) return decodeWelcomeMessage(encodeMessage);
    const byteArray: Uint8Array = new Uint8Array(Buffer.from(encodeMessage, 'utf-8'));
    const buffer: Buffer = Buffer.from(byteArray);
    const bytesToDecode: Uint8Array = decodeBase64(buffer.toString('base64'));
    const decoder = new TextDecoder('utf-8');
    const base64String = decoder.decode(bytesToDecode);
    const bytesArray = Array.from(atob(base64String), (char) => char.charCodeAt(0));
    const fullMessage = new Uint8Array(bytesArray).slice(8);
    const decodedHeader = unpackPartialData(fullMessage, addressesChains.accountChain);
    const operation = fullMessage.slice(decodedHeader.bytesRead);

    const accountAddresses = decodedHeader.result.accountAddresses;
    switch (operation[0]) {
      case OnChainRequestOp.Withdraw:
        const withdrawDecoded = decodeWithdraw(operation, serverInstruments);
        return { ...withdrawDecoded, accountAddresses };
      case OnChainRequestOp.PoolMove:
        const poolMoveDecoded = decodePoolMove(operation, serverInstruments);
        return { ...poolMoveDecoded, accountAddresses };
      case OnChainRequestOp.Settle:
        const settleDecoded = decodeSettle(operation, serverInstruments);
        return { ...settleDecoded, accountAddresses };
      case OnChainRequestOp.Delegate:
        const delegateDecoded = decodeDelegate(
          operation,
          addressesChains.delegationChain
        );
        return { ...delegateDecoded, accountAddresses };
      default:
        throw new Error(`Unknown operation type: ${operation[0]}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Gets all the valid addresses and corresponding chains for a public key.
 *
 * @param publicKey - The public key.
 * @returns - An array containing the chain addresses.
 */
function getChainAddresses(publicKey: Uint8Array): ChainAddressInfo[] {
  const chainAddressesInfo = new Array<ChainAddressInfo>();
  const toChainAddrInfo = (chain: string, address: string): ChainAddressInfo => {
    return { address, chainName: chain };
  };

  if (publicKey.length === 20) {
    const address = CHAIN_UTILS[CHAIN_ID_ETH].getAddressByPublicKey(publicKey);
    chainAddressesInfo.push(toChainAddrInfo('EVM', address));
  }
  if (publicKey.length === 32) {
    const first12Bytes = publicKey.subarray(0, 12);

    if (first12Bytes.every((byte) => byte === 0)) {
      const evmAddress = CHAIN_UTILS[CHAIN_ID_ETH].getAddressByPublicKey(publicKey);
      chainAddressesInfo.push(toChainAddrInfo('EVM', evmAddress));
    } else {
      const algoAddress = CHAIN_UTILS[CHAIN_ID_ALGORAND].getAddressByPublicKey(publicKey);
      chainAddressesInfo.push(toChainAddrInfo('Algorand', algoAddress));
      const solAddress = CHAIN_UTILS[CHAIN_ID_SOLANA].getAddressByPublicKey(publicKey);
      chainAddressesInfo.push(toChainAddrInfo('Solana', solAddress));
    }
  }
  return chainAddressesInfo;
}

const filterBySelectedChain = (
  possibleChainAddresses: ChainAddressInfo[],
  selectedChain: string | null
): ChainAddressInfo[] => {
  if (possibleChainAddresses.length > 1 && selectedChain) {
    if (!isNaN(+selectedChain) && isChainId(+selectedChain))
      selectedChain = getChainNameByChainId(+selectedChain as ChainId);
    if (isEVMChain(selectedChain as ChainName)) selectedChain = 'evm';
    selectedChain = selectedChain.toLowerCase();

    const chains = possibleChainAddresses.map((chainAddress) =>
      chainAddress.chainName.toLowerCase()
    );
    if (!selectedChain || !chains.includes(selectedChain)) return possibleChainAddresses;
    return possibleChainAddresses.filter((chainAddress) => {
      return chainAddress.chainName.toLowerCase() === selectedChain;
    });
  }
  return possibleChainAddresses;
};

const toObjectChainAddresses = (
  paramName: string,
  addresses: ChainAddressInfo[]
): ChainAddressInfoMap => {
  const result: ChainAddressInfoMap = {};
  addresses.forEach((chainAddress) => {
    result[`${paramName}${chainAddress.chainName}`] = {
      ...chainAddress,
      address: truncateText(chainAddress.address, [8, 8]),
    };
  });
  return result;
};
