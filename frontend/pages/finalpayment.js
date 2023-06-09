import React, { useEffect } from "react";
import { useAuth } from "../auth-context/auth";
import {
  intializeSDK,
  prepareSendNativeTransactionData,
  sendTransaction1Balance,
  sendTransactionSyncFee,
} from "../components/safeRelay";
import { getUserSafe } from "../components/safeMethods";
import { ethers, providers } from "ethers";
import { addRecord } from "../components/firebaseMethods";

const Finalpayment = () => {
  const {
    payData,
    signer,
    provider,
    safeAddress,
    setSafeAddress,
    currentAddress,
  } = useAuth();

  const getSafeAddress = async () => {
    const address = await getUserSafe(signer);
    // console.log(address);
    setSafeAddress(address);
  };

  useEffect(() => {
    // console.log(signer, provider)
    // console.log(currentAddress)
    if (!safeAddress) {
      getSafeAddress();
    }
    console.log(safeAddress);
  }, [safeAddress]);

  /// By 1Balance Method
  const inititateTransactionNativeGasless = async () => {
    try {
      if (!safeAddress && !signer) {
        console.log("Safe SDK Address && signer not found ");
        return;
      }
      if (!payData.address && !payData.amount) {
        console.log("PayData is not Correct");
        return;
      }
      console.log(safeAddress);

      const safeSDK = await intializeSDK(signer, safeAddress);
      const amount = ethers.utils.parseEther(payData.amount);

      //   console.log(amount);

      const encodedTxData = await prepareSendNativeTransactionData(
        payData.address,
        amount,
        safeSDK
      );

      console.log(encodedTxData);

      const txResponse = await sendTransaction1Balance(
        safeAddress,
        encodedTxData
      );
      console.log(txResponse);

      storeTxData(txResponse.taskId);
    } catch (error) {
      console.log(error);
    }
  };

  /// By SyncFee Method
  const inititateTransactionNative = async () => {
    try {
      if (!safeAddress && !signer) {
        console.log("Safe SDK Address && signer not found ");
        return;
      }
      if (!payData.address && !payData.amount) {
        console.log("PayData is not Correct");
        return;
      }
      console.log(safeAddress);

      const safeSDK = await intializeSDK(signer, safeAddress);
      const amount = ethers.utils.parseEther(payData.amount);

      //   console.log(amount);

      const encodedTxData = await prepareSendNativeTransactionData(
        payData.address,
        amount,
        safeSDK
      );

      console.log(encodedTxData);

      const txResponse = await sendTransactionSyncFee(
        safeAddress,
        encodedTxData
      );

      console.log(txResponse);

      storeTxData(txResponse.taskId);
    } catch (error) {
      console.log(error);
    }
  };

  const storeTxData = async (taskId) => {
    // we are storing the taskID , rn , may need to change to txID

    const res = await addRecord(
      safeAddress.toString(),
      taskId.toString(),
      payData.amount,
      payData.message,
      payData.tag
    );

    console.log(res);
  };

  return (
    // <div className="w-full h-full bg-white">
    <div className="w-screen bg-white h-screen">
       <div className="flex flex-col mx-auto justify-center">
        <div className="mt-20 mx-3">
         <div className="bg-emerald-500 px-4 py-4 rounded-xl">
             <div className="flex flex-col text-center mt-5">
              <p className="text-white text-xl">Paying to</p>
              <p className="text-black text-2xl mt-2">{`${payData.address.slice(0,5)}..${payData.address.slice(38,42)}`}</p>
            </div>
            <div className="flex flex-col text-center mt-10">
              <p className="text-white text-xl">Amount</p>
              <p className="text-black text-2xl mt-2 ">${payData.amount}</p>
            </div>
            <div className="flex flex-col text-center mt-10">
              <p className="text-white text-xl">Fees</p>
              <p className="text-black text-2xl mt-2">$1</p>
            </div>
            <div className="flex flex-col text-center mt-10">
              <p className="text-white text-xl">Total Amount</p>
              <p className="text-black text-4xl mt-2 font-semibold">$1.5</p>
            </div>

            <div className="mt-10 flex justify-center mx-auto mb-5">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-white rounded-l-lg hover:scale-105 duration-300 hover:bg-white hover:text-black"
                >
                  No fees
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-white hover:scale-105 duration-300 hover:bg-white hover:text-black"
                >
                  Low fees
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-white rounded-r-lg hover:scale-105 duration-300 hover:bg-white hover:text-black"
                >
                  General
                </button>
              </div>
            </div> 
          </div>
          <div className="mt-20 flex justify-center">
            <button
              onClick={() => storeTxData("x4ed5ea89D8231C4E64F02f0da4E5ffcE4263D9","fe43e775f34acea05e780db19be8c2e53cce4fee43803db73a72455b40fc106",0.5,"for Bus", "Travel")}
              className="text-white text-center bg-emerald-500 px-14 py-3 rounded-xl border text-xl hover:scale-110 duration-300 hover:bg-white hover:border-emerald-500 hover:text-emerald-500"
            >
              Pay
            </button>
          </div>
        </div>
      </div> 
    </div>
    // </div>
  );
};

export default Finalpayment;
