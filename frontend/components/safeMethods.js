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

const getUserSafe = async (signer) => {
  const userAddress = signer.getAddress();

  const safeService = await intializeSafeAPI(signer);
  const safes = await safeService.getSafesByOwner(userAddress);
  console.log(safes);

  const safeAddress = safes[0];

  return safeAddress;
};
