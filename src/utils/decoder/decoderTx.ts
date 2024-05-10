import { DecodedMessage } from '../../interfaces/interfaces';
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

/**
 * Decodes the signed messages from the details of the transactions from the group.
 *
 * @param {Array} groupTxs - The group of transactions.
 * @param {Array} onChainC3State - The on-chain C3 state.
 * @param {string} queryAccountId - The query account ID.
 * @returns {Array} - An array containing the decoded messages of a group of transactions.
 */
export const decodeMsgFromTxDetails = (
  groupTxs: any,
  onChainC3State: ServerInstrument[],
  queryAccountId: string | null
): DecodedMessage[] | undefined => {
  try {
    let message: DecodedMessage[] = [];
    const allTransactionsArgs = groupTxs.map((tx: any) => {
      if (tx['application-transaction']) {
        return tx['application-transaction']['application-args'];
      } else {
        return [];
      }
    });

    for (let i = 0; i < allTransactionsArgs.length; i++) {
      const txArgs = allTransactionsArgs[i];
      if (!txArgs.length) continue;
      const opCode = encodeBase16(decodeBase64(txArgs[0]));

      if (
        opCode === ADD_ORDER_ABI_SELECTOR ||
        opCode === SETTLE_ABI_SELECTOR ||
        opCode === POOL_MOVE_ABI_SELECTOR ||
        opCode === WITHDRAW_ABI_SELECTOR
      ) {
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
        const account = truncateText(accountId, [9, 4], true);

        const operation = signedOpUintArray[1];
        if (opCode === ADD_ORDER_ABI_SELECTOR || opCode === SETTLE_ABI_SELECTOR) {
          const settleDecoded = decodeSettle(operation, onChainC3State);
          if (queryAccountId && queryAccountId === accountId)
            message.push({ ...settleDecoded, account: { account, modifier: ' (you)' } });
          else message.push({ ...settleDecoded, account });
        }
        if (opCode === POOL_MOVE_ABI_SELECTOR) {
          const poolMoveDecoded = decodePoolMove(operation, onChainC3State);
          message.push({ ...poolMoveDecoded, account });
        }
        if (opCode === WITHDRAW_ABI_SELECTOR) {
          const withdrawDecoded = decodeWithdraw(operation, onChainC3State);
          message.push({ ...withdrawDecoded, account });
        }
      }
    }
    return message;
  } catch (error) {
    console.error(error);
  }
};

export function mapABIArraytoUintArray(abiArray: ABIValue[], format: IPackedInfo): any {
  return abiArray.map((value: ABIValue, i: number) => {
    const [, elemFormat] = Object.entries(format)[i];
    if (elemFormat.type === 'object')
      return mapABIArraytoUintArray(
        value as Array<ABIValue>,
        elemFormat.info as IPackedInfo
      );
    if (
      elemFormat.type === 'base64' ||
      elemFormat.type === 'bytes' ||
      Array.isArray(value)
    )
      return new Uint8Array(value as Array<number>);
    else return value;
  });
}

/**
 * Takes the prefix of a signed message.
 * Returns the account type of the target of the signed message.
 *
 * @param {string} prefix - The prefix of the signed message.
 * @param {number} dataLength - The length of the encoded signed data.
 * @returns {number} - The account type of the target of the signed message.
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
 * @param {Array} signedOpUintArray - The signed operation uint array.
 * @param {Array} delegChainUintArray - The delegation chain uint array.
 * @returns {string} - The account ID of the target of the signed message.
 */
const getTxAccountId = (signedOpUintArray: any, delegChainUintArray: any) => {
  let accountId = '';
  // If there is no delegation chain, the account ID corresponds to the target of the signed operation.
  // Otherwise, the account ID corresponds to the target of the first delegation in the chain.
  if (delegChainUintArray.length === 0) {
    const prefix = encodeBase64(signedOpUintArray[6]);
    const encodedSignedData = signedOpUintArray[2];
    const accountType = prefixToAccountType(prefix, encodedSignedData.length);
    const chainId = accountTypeToChainId(accountType);
    accountId = encodeAccountId(signedOpUintArray[0][0], chainId as SupportedChainId);
  } else {
    const firstDelegUintArray = delegChainUintArray[0];
    const prefix = encodeBase64(firstDelegUintArray[6]);
    const encodedSignedData = firstDelegUintArray[2];
    const accountType = prefixToAccountType(prefix, encodedSignedData.length);
    const chainId = accountTypeToChainId(accountType);
    accountId = encodeAccountId(firstDelegUintArray[0][0], chainId as SupportedChainId);
  }
  return accountId;
};
