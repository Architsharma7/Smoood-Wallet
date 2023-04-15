import React from "react";
import { ethers } from "ethers";
import {
  GelatoRelayAdapter,
  MetaTransactionOptions,
} from "@safe-global/relay-kit";
import Safe from "@safe-global/safe-core-sdk";
import {
  MetaTransactionData,
  OperationType,
} from "@safe-global/safe-core-sdk-types";

const GELATO_RELAY_API_KEY = process.env.NEXT_PUBLIC_GELATO_RELAY_API_KEY;

const Pay = () => {
  const {} = useAuth();

  const [safeAddress, setSafeAddress] = useState();
  const chainId = 5;
  const options = {
    gasLimit: ethers.BigNumber.from(gasLimit),
    isSponsored: true,
  };

  const prepareTransactionData = () => {};

  /// Building the tx
  const sendTransaction1Balance = async () => {
    const relayAdapter = new GelatoRelayAdapter(GELATO_RELAY_API_KEY);

    // we need to get the encoded tx data
    const relayTransaction = {
      target: targetContractAddress,
      encodedTransaction: encodedTx,
      chainId,
      options,
    };
    const response = await relayAdapter.relayTransaction(relayTransaction);

    console.log(
      `Relay Transaction Task ID: https://relay.gelato.digital/tasks/status/${response.taskId}`
    );
  };

  const sendTransactionSyncFee = async () => {
    const relayAdapter = new GelatoRelayAdapter();

    // we need to get the encoded tx data
    const relayTransaction = {
      target: targetContractAddress,
      encodedTransaction: encodedTx,
      chainId,
    };
    const response = await relayAdapter.relayTransaction(relayTransaction);

    console.log(
      `Relay Transaction Task ID: https://relay.gelato.digital/tasks/status/${response.taskId}`
    );
  };
  return (
    <div className="h-screen w-screen bg-white">
      <div className="flex flex-col h-[75%]">
        <div className="mt-14">
          <p className="text-black text-center text-xl">0x25836202..63337</p>
          <p className="text-black text-center mt-28 text-lg">You are paying</p>
          <input
            className="bg-slate-50 border flex justify-center mx-auto px-5 py-7 rounded-xl mt-3 text-black text-2xl"
            type="number"
          ></input>
          <input
            className="mt-10 bg-slate-50 flex justify-center mx-auto px-4 py-3 border rounded-xl text-black text-center"
            type="text"
            placeholder="Add message"
          ></input>
          <input
            className="mt-10 bg-slate-50 flex justify-center mx-auto px-1 py-1 border rounded-xl text-black text-center"
            type="text"
            placeholder="Add tag"
          ></input>
        </div>
      </div>
      <div className="flex flex-col h-[25%] border border-slate-400 rounded-t-3xl">
        <div className="mt-10 flex flex-col justify-center mx-auto text-center">
          <label className="text-black">Choose currency</label>
          <select>
            <option>Please choose a level</option>
            <option value="basic">like a noob</option>
            <option value="medium">like an intermediate </option>
            <option value="high">like an expert</option>
          </select>
        </div>
        <div className="w-full">
          <div className="mx-5">
            <button className="mt-10 px-40 py-3 rounded-lg text-white bg-emerald-500 text-2xl">
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
