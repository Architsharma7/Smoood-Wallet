import {
  recoveryModuleABI,
  recoveryModuleContractAddress,
} from "../constants/contractData";
import { ethers } from "ethers";

const RECORDMANAGER_PK = process.env.NEXT_PUBLIC_PRIVATE_KEY;
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

// intialize the contract Instane
export const intiateContractInstance = () => {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const signer = new ethers.Wallet(RECORDMANAGER_PK, provider);

  const recordContract = new ethers.Contract(
    recoveryModuleContractAddress,
    recoveryModuleABI,
    provider
  );

  /// signed Instance of the wallet
  const recordContractWithSigner = recordContract.connect(signer);

  return { recordContract, recordContractWithSigner };
};

/// add recovery method
export const addRecoveryMethod = async (
  recordContractWithSigner,
  safeAddress,
  eoaAddress,
  q1,
  a1,
  q2,
  a2
) => {
  const tx = await recordContractWithSigner.setRecoveryRecords(
    safeAddress,
    eoaAddress,
    q1,
    a1,
    q2,
    a2
  );

  await tx.wait();

  console.log(tx);
  console.log("Recovery Method added in the Wallet");
};

/// Allow the Module to be added first

/// initiate the RecoveryMethod
export const recoverUserWallet = async (
  recordContractWithSigner,
  safeAddress,
  newAddress
) => {
  const tx = await recordContractWithSigner.recoverWallet(
    safeAddress,
    newAddress
  );

  await tx.wait();

  // Wallet recovered with new Owner
  console.log(tx);
};

export const getRecoveryRecord = async (recordContract, safeAddress) => {
  const data = await recordContract.getRecoveryRecord(safeAddress);

  console.log(data);

  // data to be checked in the frontend
  return data;
};
