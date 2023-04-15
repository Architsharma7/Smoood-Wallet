import SafeApiKit from "@safe-global/api-kit";
import { EthersAdapter } from "@safe-global/protocol-kit";
import { ethers } from "ethers";

const intializeSafeAPI = (signer) => {
  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: signer,
  });

  const safeSAPIService = new SafeApiKit({
    txServiceUrl: "https://safe-transaction-goerli.safe.global",
    ethAdapter,
  });

  return safeSAPIService;
};

export const getUserSafe = async (signer) => {
  const userAddress = await signer.getAddress();

  const safeService = intializeSafeAPI(signer);

  // console.log(userAddress)
  const safes = await safeService.getSafesByOwner(userAddress);
  // console.log(safes);

  const safeAddress = safes.safes[0];
  // console.log(safeAddress)
  return safeAddress;
};
