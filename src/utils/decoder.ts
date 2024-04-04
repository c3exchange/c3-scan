import { DecodedMessage, OnChainRequestOp } from '../interfaces/interfaces';
import {
  decodeBase64,
  IPackedInfo,
  decodeUint16,
  decodeUint,
  CHAIN_UTILS,
  CHAIN_ID_ALGORAND,
  Instrument,
  InstrumentAmount,
  ServerInstrument,
  convertUint64toInt64,
  getChainNameByChainId,
  ChainId,
  encodeBase16,
  decodeABIValue,
  signedMessageFormat,
} from '@c3exchange/common';
import { ABIValue } from 'algosdk';

export const CREATE_ABI_SELECTOR = '0c5f0186';
export const UPDATE_INSTRUMENT_ABI_SELECTOR = 'd0e96ff3';
export const UPDATE_PARAMETER_ABI_SELECTOR = 'da73965d';
export const POOL_MOVE_ABI_SELECTOR = '6904886c';
export const ADD_ORDER_ABI_SELECTOR = 'e80737cd';
export const SETTLE_ABI_SELECTOR = '05c23896';
export const WITHDRAW_ABI_SELECTOR = '1de3bc55';
export const ACCOUNT_MOVE_ABI_SELECTOR = 'abb4088e';
export const LIQUIDATE_ABI_SELECTOR = '7716a1b3';
export const FUND_MBR_ABI_SELECTOR = 'd1474b5a';
export const CLEAN_ORDERS_ABI_SELECTOR = '6dd96ba8';

export const withdrawFormat = '(byte,uint8,uint64,(uint16,address),uint64,uint64)';
export const poolMoveFormat = '(byte,uint8,uint64)';
export const delegateFormat = '(byte,address,uint64,uint64)';
export const accountMoveFormat = '(byte,address,(uint8,uint64)[],(uint8,uint64)[])';
export const ORDER_OPERATION_STR = '06';
const defaultInstrument = {
  id: '',
  asaId: 0,
  asaName: '',
  asaUnitName: '',
  asaDecimals: 0,
  chains: [],
};

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

export const packABIString = (format: IPackedInfo): string => {
  const internalPackABIString = (format: IPackedInfo): string[] => {
    return Object.entries(format).map(([, type]) => {
      switch (type.type) {
        case 'object':
        case 'hash':
          return '(' + internalPackABIString(type.info) + ')';
        case 'array':
          return internalPackABIString({ value: type.info }) + '[]';
        case 'address':
          return 'address';
        case 'byte':
          return 'byte';
        case 'bytes':
        case 'string':
        case 'base64':
          return 'byte[' + (type.size ?? '') + ']';
        case 'number':
        case 'uint':
          return 'uint' + (type.size ?? 8) * 8;
        case 'fixed':
          if (type.valueHex.length === 2) {
            return 'byte';
          }
          return 'byte[' + type.valueHex.length / 2 + ']';
        default:
          throw new Error(`Type ${type.type} is not supported or recognized`);
      }
    });
  };
  return '(' + internalPackABIString(format).join(',') + ')';
};
export const settleFormat = packABIString(orderDataFormat);

/**
 * Decodes the welcome message.
 *
 * @param {string} encodedMessage - The encoded message.
 * @returns {Object} - An object containing the operation type, user ID, and creation time.
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

export function getInstrumentfromSlotId(
  id: number,
  appState: ServerInstrument[]
): Instrument {
  for (let instrument of appState) {
    if (instrument.slotId === id) {
      return instrument.instrument;
    }
  }
  return defaultInstrument;
}

interface UnpackedData {
  result: Record<string, any>;
  bytesRead: number;
}

export const unpackPartialData = (data: Uint8Array): UnpackedData => {
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
        //value = encodeAddress(data.slice(bytesRead, bytesRead + 32));
        value = CHAIN_UTILS[CHAIN_ID_ALGORAND].getAddressByPublicKey(
          data.slice(bytesRead, bytesRead + 32)
        );
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
    result[key] = value;
  }

  return { result, bytesRead };
};

function decodeWithdraw(operation: Uint8Array, appState: ServerInstrument[]) {
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
  const amount = Number(
    InstrumentAmount.fromContract(
      getInstrumentfromSlotId(instrumentSlotId, appState),
      BigInt(encodedAmount)
    ).toDecimal()
  );
  const instrumentName = getInstrumentfromSlotId(instrumentSlotId, appState).id;
  return { operationType, instrumentName, amount, chain };
}

function decodePoolMove(operation: Uint8Array, appState: ServerInstrument[]) {
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

function decodeSettle(operation: Uint8Array, appState: ServerInstrument[]) {
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
    buyAssetId: buyAsset.id,
    sellAmount,
    buyAmount,
    maxBorrow,
    maxRepay,
  };
}

function decodeDelegate(operation: Uint8Array) {
  const operationType = getEnumKeyByEnumValue(
    OnChainRequestOp,
    OnChainRequestOp.Delegate
  );
  const delegateResult = decodeABIValue(operation, delegateFormat);
  const extractedDelegateAddress = delegateResult[1];
  const delegateAddress = getFirstAndLastChars(extractedDelegateAddress, 8, 8);
  const nonce = Number(delegateResult[2]);
  const extractedExpirationTime = delegateResult[3];
  const expiresOn = new Date(parseInt(extractedExpirationTime) * 1000).toLocaleString();

  const isEphemeralKeyDelegateMsg = nonce === 0;
  return {
    operationType: isEphemeralKeyDelegateMsg ? 'Ephemeral Key Delegate' : operationType,
    delegateAddress,
    expiresOn,
    ...(isEphemeralKeyDelegateMsg ? {} : { nonce }),
  };
}

export const decodeMessage = (
  encodeMessage: string,
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
    const decodedHeader = unpackPartialData(fullMessage);
    const operation = fullMessage.slice(decodedHeader.bytesRead);
    const target: string = getFirstAndLastChars(decodedHeader.result.target, 8, 8);
    switch (operation[0]) {
      case OnChainRequestOp.Withdraw:
        const withdrawDecoded = decodeWithdraw(operation, serverInstruments);
        return { ...withdrawDecoded, target };
      case OnChainRequestOp.PoolMove:
        const poolMoveDecoded = decodePoolMove(operation, serverInstruments);
        return { ...poolMoveDecoded, target };
      case OnChainRequestOp.Settle:
        const settleDecoded = decodeSettle(operation, serverInstruments);
        return { ...settleDecoded, target };
      case OnChainRequestOp.Delegate:
        const delegateDecoded = decodeDelegate(operation);
        return { ...delegateDecoded, target };
      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }
};

interface ITransaction {
  'application-transaction': {
    'application-args': string[];
  };
}
export const decodeMsgFromTxDetails = (
  groupTxs: any,
  onChainC3State: ServerInstrument[]
) => {
  let message;
  const allAppArgs = groupTxs.map((tx: ITransaction) => {
    if (tx['application-transaction']) {
      return tx['application-transaction']['application-args'];
    } else {
      return [];
    }
  });

  for (let i = 0; i < allAppArgs.length; i++) {
    const txArgs = allAppArgs[i];
    if (!txArgs.length) continue;
    const codOp = encodeBase16(decodeBase64(txArgs[0]));

    if (
      codOp === ADD_ORDER_ABI_SELECTOR ||
      codOp === SETTLE_ABI_SELECTOR ||
      codOp === POOL_MOVE_ABI_SELECTOR ||
      codOp === WITHDRAW_ABI_SELECTOR
    ) {
      const signedOperation = decodeBase64(txArgs[2]);
      const abiFormat = packABIString(signedMessageFormat);
      const decodeABIValueVar = decodeABIValue(signedOperation, abiFormat);
      const uintArr = abiValueToUint8Array(decodeABIValueVar, signedMessageFormat);

      if (codOp === ADD_ORDER_ABI_SELECTOR || codOp === SETTLE_ABI_SELECTOR) {
        message = decodeSettle(uintArr[1], onChainC3State);
      } else if (codOp === POOL_MOVE_ABI_SELECTOR) {
        message = decodePoolMove(uintArr[1], onChainC3State);
      } else if (codOp === WITHDRAW_ABI_SELECTOR) {
        message = decodeWithdraw(uintArr[1], onChainC3State);
      }
    }
  }
  return message;
};

export const keyToLabelMapping: { [key in keyof DecodedMessage]?: string } = {
  amount: 'Amount',
  target: 'Destination',
  instrumentName: 'Asset',
  operationType: 'Type',
  userID: 'User ID',
  creationTime: 'Creation Time',
  account: 'Account',
  expiresOn: 'Expiration Time',
  buyAmount: 'Buy Amount',
  buyAssetId: 'Buy Asset',
  maxBorrow: 'Max Borrow',
  maxRepay: 'Max Repay',
  nonce: 'Nonce',
  sellAmount: 'Sell Amount',
  sellAssetId: 'Sell Asset',
  chain: 'Chain',
  delegateAddress: 'Delegate Address',
};

export const getFirstAndLastChars = (
  str: string,
  leftChars: number,
  rightChars: number
) => {
  if (str.length <= leftChars + rightChars) return str;
  return str.slice(0, leftChars) + '...' + str.slice(-rightChars);
};

export const getEnumKeyByEnumValue = (
  enumObj: any,
  enumValue: number
): string | undefined => {
  let keys = Object.keys(enumObj).filter((x) => enumObj[x] === enumValue);
  return keys.length > 0 ? keys[0] : undefined;
};

export const processValue = (value: any) => {
  let primaryValue: string = '';
  let secondaryValue: string = '';
  if (value?.chainId) {
    primaryValue = value?.chainId;
    secondaryValue = ' - ' + value?.chainName;
  } else if (typeof value === 'object') {
    primaryValue = JSON.stringify(value);
  } else {
    primaryValue = value;
  }
  return { primaryValue, secondaryValue };
};

export const urlParamToBase64 = (urlParam: string | null): string => {
  if (!urlParam) return '';

  const welcomeRegex = /^\s*Welcome to C3/;

  if (!welcomeRegex.test(urlParam)) return urlParam.replace(/ /g, '+');
  const finalWordMatcher = /([A-Za-z0-9+/= ]+)\s*$/;
  const match = urlParam.match(finalWordMatcher);
  if (!match) return '';
  const welcomeString = `Welcome to C3:
Click to sign and accept the C3 Terms of Service (https://c3.io/terms)
This request will not trigger a blockchain transaction or cost any gas fees.
`;
  const operation = match[1].trim().replace(/ /g, '+');
  return `${welcomeString}${operation}`;
};

export function abiValueToUint8Array(arr: ABIValue[], format: IPackedInfo): any {
  return arr.map((value: ABIValue, i: number) => {
    const a = format[Object.keys(format)[i]];
    if (a.type === 'object')
      return abiValueToUint8Array(value as Array<ABIValue>, a.info as IPackedInfo);
    if (a.type === 'base64' || a.type === 'bytes' || Array.isArray(value))
      return new Uint8Array(value as Array<number>);
    else return value;
  });
}
