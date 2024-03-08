import { DecodedMessage, OnChainRequestOp } from '../interfaces/interfaces';
import {
  decodeBase64,
  IPackedInfo,
  decodeUint16,
  decodeUint,
  decodeABIValue,
  CHAIN_UTILS,
  CHAIN_ID_ALGORAND,
  Instrument,
  InstrumentAmount,
  ServerInstrument,
  convertUint64toInt64,
} from '@c3exchange/common';

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
  const amount = Number(
    InstrumentAmount.fromContract(
      getInstrumentfromSlotId(instrumentSlotId, appState),
      BigInt(encodedAmount)
    ).toDecimal()
  );
  const instrumentName = getInstrumentfromSlotId(instrumentSlotId, appState).id;
  return { operationType, instrumentName, amount };
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
  const expiresOn = new Date(parseInt(settleResult[3]) * 1000).toLocaleString();
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
      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }
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
