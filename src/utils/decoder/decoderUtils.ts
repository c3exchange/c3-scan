import {
  ChainAddressInfo,
  DecodedMessage,
  DecodedMessageFieldTypes,
} from '../../interfaces/interfaces';
import { IPackedInfo, Instrument, ServerInstrument } from '@c3exchange/common';

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

const defaultInstrument = {
  id: '',
  asaId: 0,
  asaName: '',
  asaUnitName: '',
  asaDecimals: 0,
  chains: [],
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

export const keyToLabelMapping: { [key in keyof DecodedMessage]?: string } = {
  amount: 'Amount',
  target: 'Destination',
  instrumentName: 'Asset',
  operationType: 'Type',
  userID: 'User ID',
  creationTime: 'Creation Time',
  account: 'Account',
  accountAddresses: 'Account',
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
  delegatedAddresses: 'Delegate Address',
};

export const getEnumKeyByEnumValue = (
  enumObj: any,
  enumValue: number
): string | undefined => {
  let keys = Object.keys(enumObj).filter((x) => enumObj[x] === enumValue);
  return keys.length > 0 ? keys[0] : undefined;
};

interface ProcessedMessage {
  primaryValue: string;
  secondaryValue: string;
}

/**
 * Processes the value of a decoded message key to return a primary and secondary value.
 *
 * @param key - The key.
 * @param value - The value.
 * @returns - The primary and secondary values.
 */
export const processDecodedMessageValue = (key: string, value: any): ProcessedMessage => {
  let result: ProcessedMessage = { primaryValue: '', secondaryValue: '' };

  if (typeof value !== 'object') {
    return { primaryValue: value.toString(), secondaryValue: '' };
  }
  switch (key) {
    case 'chain':
      result.primaryValue = value?.chainId;
      result.secondaryValue = ' - ' + value?.chainName;
      break;
    case 'account':
      if (value?.modifier) {
        result.primaryValue = value?.account;
        result.secondaryValue = value?.modifier;
      }
      break;
    case 'delegateAddress':
      if (value?.modifier) {
        result.primaryValue = value?.account;
        result.secondaryValue = value?.modifier;
      }
      break;
    case 'accountEVM':
    case 'accountSolana':
    case 'accountAlgorand':
    case 'delegateAddressEVM':
    case 'delegateAddressSolana':
    case 'delegateAddressAlgorand':
      if (value?.chainName) {
        result.primaryValue = value?.address;
        result.secondaryValue = ` - ${value?.chainName}`;
      }
      break;
    default:
      result.primaryValue = JSON.stringify(value);
  }
  return result;
};

/**
 * Determines if the value of a key is an object that should be displayed as a
 * multi-value object in the decoded message (multiple values in one row).
 *
 * @param key - The key.
 * @param value - The value.
 * @returns - True if the value is a multi-value object, false otherwise.
 */
export const isMultiValue = (key: string, value: DecodedMessageFieldTypes) => {
  if (!value || typeof value !== 'object') return false;
  switch (key) {
    case 'accountAddresses':
    case 'delegatedAddresses':
      const entries = Object.entries(value);
      return !entries.some(
        ([, value]) => !hasProperties<ChainAddressInfo>(value, ['address', 'chainName'])
      );
    default:
      return false;
  }
};

const hasProperties = <T>(obj: any, properties: (keyof T)[]): obj is T => {
  if (typeof obj !== 'object') return false;
  return properties.every((prop) => prop in obj);
};

/**
 * Converts a URL parameter to a base64 encoded string.
 * Replacing certain url characters with their base64 equivalent.
 *
 * @param urlParam - The URL parameter.
 * @returns - The base64 encoded string.
 */
export const urlParamToBase64 = (urlParam: string | null): string => {
  if (!urlParam) return '';
  const welcomeRegex = /^\s*Welcome to C3/;
  if (welcomeRegex.test(urlParam)) return urlWelcomeMsgToBase64(urlParam);
  return urlParam.replace(/ /g, '+');
};

export const urlWelcomeMsgToBase64 = (urlWelcomeMsg: string): string => {
  const finalWordMatcher = /([A-Za-z0-9+/= ]+)\s*$/;
  const match = urlWelcomeMsg.match(finalWordMatcher);
  if (!match) return '';
  const welcomeString = `Welcome to C3:
Click to sign and accept the C3 Terms of Service (https://c3.io/terms)
This request will not trigger a blockchain transaction or cost any gas fees.
`;
  const operation = match[1].trim().replace(/ /g, '+');
  return `${welcomeString}${operation}`;
};
