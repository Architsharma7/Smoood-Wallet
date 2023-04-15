import { ethers } from "ethers";
import { GelatoRelayAdapter } from "@safe-global/relay-kit";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { OperationType } from "@safe-global/safe-core-sdk-types";
import { erc20abi } from "../constants/abi";

const GELATO_RELAY_API_KEY = process.env.NEXT_PUBLIC_GELATO_RELAY_API_KEY;

const chainId = 5;
const gasLimit = 100000;
const options = {
  gasLimit: ethers.BigNumber.from(gasLimit),
  isSponsored: true,
};

export const intializeSDK = async (signer, safeAddress) => {
  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: signer,
  });

  const safeSDK = await Safe.create({
    ethAdapter,
    safeAddress,
  });

  return safeSDK;
};

// txData =  "0x" in case of Native
export const prepareSendNativeTransactionData = async (
  destinationAddress,
  withdrawAmount,
  safeSDK
) => {
  const safeTransactionData = {
    to: destinationAddress,
    data: "0x", // leave blank for native token transfers
    value: withdrawAmount,
    operation: OperationType.Call,
  };

  const safeTransaction = await safeSDK.createTransaction({
    safeTransactionData,
  });

  const signedSafeTx = await safeSDK.signTransaction(safeTransaction);

  const encodedTx = safeSDK
    .getContractManager()
    .safeContract.encode("execTransaction", [
      signedSafeTx.data.to,
      signedSafeTx.data.value,
      signedSafeTx.data.data,
      signedSafeTx.data.operation,
      signedSafeTx.data.safeTxGas,
      signedSafeTx.data.baseGas,
      signedSafeTx.data.gasPrice,
      signedSafeTx.data.gasToken,
      signedSafeTx.data.refundReceiver,
      signedSafeTx.encodedSignatures(),
    ]);

  return encodedTx;
};

export const prepareSendTokenTransactionData = async (
  safeAddress,
  destinationAddress,
  withdrawAmount,
  safeSDK
) => {
  const abiInterface = new ethers.utils.Interface(erc20abi);

  const encodedData = abiInterface.encodeFunctionData(
    `transfer`,
    safeAddress,
    destinationAddress,
    withdrawAmount
  );

  const safeTransactionData = {
    to: destinationAddress,
    data: encodedData, // leave blank for native token transfers
    operation: OperationType.Call,
  };

  const safeTransaction = await safeSDK.createTransaction({
    safeTransactionData,
  });

  const signedSafeTx = await safeSDK.signTransaction(safeTransaction);

  const encodedTx = safeSDK
    .getContractManager()
    .safeContract.encode("execTransaction", [
      signedSafeTx.data.to,
      signedSafeTx.data.value,
      signedSafeTx.data.data,
      signedSafeTx.data.operation,
      signedSafeTx.data.safeTxGas,
      signedSafeTx.data.baseGas,
      signedSafeTx.data.gasPrice,
      signedSafeTx.data.gasToken,
      signedSafeTx.data.refundReceiver,
      signedSafeTx.encodedSignatures(),
    ]);

  return encodedTx;
};

/// Building the tx
export const sendTransaction1Balance = async (targetAddress, encodedTx) => {
  const relayAdapter = new GelatoRelayAdapter(GELATO_RELAY_API_KEY);

  // we need to get the encoded tx data
  const relayTransaction = {
    target: targetAddress,
    encodedTransaction: encodedTx,
    chainId,
    options,
  };

  const response = await relayAdapter.relayTransaction(relayTransaction);

  console.log(
    `Relay Transaction Task ID: https://relay.gelato.digital/tasks/status/${response.taskId}`
  );
};

export const sendTransactionSyncFee = async (targetAddress, encodedTx) => {
  const relayAdapter = new GelatoRelayAdapter();

  // we need to get the encoded tx data
  const relayTransaction = {
    target: targetAddress,
    encodedTransaction: encodedTx,
    chainId,
  };
  const response = await relayAdapter.relayTransaction(relayTransaction);

  console.log(
    `Relay Transaction Task ID: https://relay.gelato.digital/tasks/status/${response.taskId}`
  );
};
