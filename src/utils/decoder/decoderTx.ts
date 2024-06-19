import { AccountWithModifier, DecodedMessage } from '../../interfaces/interfaces';
import {
  decodeBase64,
  IPackedInfo,
  ServerInstrument,
  encodeBase16,
  encodeBase64,
  decodeABIValue,
  signedMessageFormat,
  encodeAccountId,
  C3_ACCOUNT_TYPES,
  C3_ACCOUNT_TYPE_UTILS,
  CHAIN_ID_TO_ACCOUNT_TYPE,
  C3AccountType,
  SupportedChainId,
} from '@c3exchange/common';
import { ABIValue } from 'algosdk';
import { truncateText } from '../utils';
import { getEnumKeyByEnumValue, packABIString } from './decoderUtils';
import { decodePoolMove, decodeSettle, decodeWithdraw } from './decoderMessage';

const POOL_MOVE_ABI_SELECTOR = '6904886c';
const ADD_ORDER_ABI_SELECTOR = 'e80737cd';
const SETTLE_ABI_SELECTOR = '05c23896';
const WITHDRAW_ABI_SELECTOR = '1de3bc55';
const validABISelectors = [
  POOL_MOVE_ABI_SELECTOR,
  ADD_ORDER_ABI_SELECTOR,
  SETTLE_ABI_SELECTOR,
  WITHDRAW_ABI_SELECTOR,
];

/**
 * Decodes the signed messages from the details of the transactions from the group.
 *
 * @param groupTxs - The group of transactions.
 * @param onChainC3State - The on-chain C3 state.
 * @param queryAccountId - The query account ID.
 * @returns - An array containing the decoded messages of a group of transactions.
 */
export const decodeMsgFromTxDetails = (
  groupTxs: any,
  onChainC3State: ServerInstrument[],
  queryAccountId: string | null
): DecodedMessage[] | undefined => {
  try {
    let messages: DecodedMessage[] = [];
    const allTransactionsArgs = groupTxs.map((tx: any) => {
      return tx['application-transaction']
        ? tx['application-transaction']['application-args']
        : [];
    });

    for (let i = 0; i < allTransactionsArgs.length; i++) {
      const txArgs = allTransactionsArgs[i];
      if (!txArgs.length) continue;
      const opCode = encodeBase16(decodeBase64(txArgs[0]));

      if (!validABISelectors.includes(opCode)) continue;

      const signedOperation = decodeBase64(txArgs[2]);
      const signedOpABIFormat = packABIString(signedMessageFormat);
      const decodedSignedOp = decodeABIValue(signedOperation, signedOpABIFormat);
      const signedOpUintArray = mapABIArraytoUintArray(
        decodedSignedOp,
        signedMessageFormat
      );

      const delegationChain = decodeBase64(txArgs[3]);
      const delegChainABIFormat = packABIString(signedMessageFormat) + '[]';
      const decodedDelegChain = decodeABIValue(delegationChain, delegChainABIFormat);
      const delegChainUintArray = decodedDelegChain.map((deleg: any) =>
        mapABIArraytoUintArray(deleg, signedMessageFormat)
      );

      const accountId = getTxAccountId(signedOpUintArray, delegChainUintArray);
      let account: string | AccountWithModifier = truncateText(accountId, [9, 4], true);

      const operation = signedOpUintArray[1];
      let decodedMessage;
      switch (opCode) {
        case ADD_ORDER_ABI_SELECTOR:
        case SETTLE_ABI_SELECTOR:
          decodedMessage = decodeSettle(operation, onChainC3State);
          if (queryAccountId && queryAccountId === accountId)
            account = { account, modifier: ' (you)' };
          break;
        case POOL_MOVE_ABI_SELECTOR:
          decodedMessage = decodePoolMove(operation, onChainC3State);
          break;
        case WITHDRAW_ABI_SELECTOR:
          decodedMessage = decodeWithdraw(operation, onChainC3State);
          break;
        default:
          break;
      }
      messages.push({ ...decodedMessage, account });
    }
    return messages;
  } catch (error) {
    console.error(error);
  }
};

export function mapABIArraytoUintArray(abiArray: ABIValue[], format: IPackedInfo): any {
  return abiArray.map((value: ABIValue, i: number) => {
    const [, elemFormat] = Object.entries(format)[i];

    switch (elemFormat.type) {
      case 'object':
        return mapABIArraytoUintArray(
          value as Array<ABIValue>,
          elemFormat.info as IPackedInfo
        );
      case 'string':
      case 'bytes':
      case 'base64':
      case 'address':
        return new Uint8Array(value as Array<number>);
      default:
        return value;
    }
  });
}

/**
 * Takes the prefix of a signed message.
 * Returns the account type of the target of the signed message.
 *
 * @param prefix - The prefix of the signed message.
 * @param dataLength - The length of the encoded signed data.
 * @returns - The account type of the target of the signed message.
 */
const prefixToAccountType = (prefix: string, dataLength: number): C3AccountType => {
  const accountTypes = C3_ACCOUNT_TYPES.filter((accType) => {
    const checkPrefix = C3_ACCOUNT_TYPE_UTILS[accType].getDataPrefix(dataLength);
    return encodeBase64(checkPrefix) === prefix;
  });
  return accountTypes.length > 0 ? accountTypes[0] : -1;
};

const accountTypeToChainId = (accType: number) => {
  const chainId = getEnumKeyByEnumValue(CHAIN_ID_TO_ACCOUNT_TYPE, accType);
  return chainId ? parseInt(chainId) : -1;
};

/**
 * Returns the account ID of the target of the signed message.
 *
 * @param signedOpUintArray - The signed operation uint array.
 * @param delegChainUintArray - The delegation chain uint array.
 * @returns - The account ID of the target of the signed message.
 */
const getTxAccountId = (signedOpUintArray: any, delegChainUintArray: any) => {
  // If there is no delegation chain, the account ID corresponds to the target of the signed operation.
  // Otherwise, the account ID corresponds to the target of the first delegation in the chain.
  let signedMessage: any = signedOpUintArray;
  if (delegChainUintArray.length > 0) signedMessage = delegChainUintArray[0];

  const prefix = encodeBase64(signedMessage[6]);
  const encodedSignedData = signedMessage[2];
  const accountType = prefixToAccountType(prefix, encodedSignedData.length);
  const chainId = accountTypeToChainId(accountType);
  return encodeAccountId(signedMessage[0][0], chainId as SupportedChainId);
};
