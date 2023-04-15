import React, { useEffect, useState } from "react";
import styles from "../styles/scroll.module.css";
import { BsQrCodeScan } from "react-icons/bs";
import { useRouter } from "next/router";
import { transakRamp } from "../components/transak";
// import { addRecord } from "../components/firebase";

const Secondhalf = () => {
  const router = useRouter();

  return (
    <div className={styles.overlay} aria-hidden="false">
      <div
        className="bg-white w-screen rounded-t-3xl h-screen mt-96 py-3 flex flex-col"
        style={{ marginTop: "360px" }}
        id="second-half"
      >
        <div
          className="bg-blue-500 flex justify-center mx-auto w-screen rounded-xl"
          style={{ height: "6px", width: "100px" }}
        ></div>
        <div className="mt-10 flex flex-col">
          <div className="flex justify-between mx-3 align-middle items-center">
            <button className="border border-black bg-emerald-500 rounded-2xl h-16 px-7">
              <p className="text-white">Swap</p>
            </button>
            <div className="flex flex-col">
              <button
                className="px-6 py-6 rounded-full border border-black flex flex-col"
                onClick={() => console.log("clicked")}
              >
                <BsQrCodeScan className="text-black text-6xl" />
              </button>
              {/* <p className="text-black text-center text-2xl mt-1">Pay</p> */}
            </div>
            {/* <a href=`https://global-stg.transak.com?apiKey=0bfa1e08-6fb5-48e7-a337-d008d751c771&walletAddress=${userAddress}&defaultCryptoCurrency=ETH&fiatCurrency=INR`> */}
            <button
              className="px-7 border border-black rounded-xl h-16"
              onClick={() => transakRamp()} // need to pass the userAddress
            >
              <p className="text-black">ADD</p>
            </button>
            {/* </a> */}
          </div>
          <div className="grid mt-10 grid-flow-col grid-cols-2 mx-3 gap-x-4">
            <button
              className="border border-black rounded-2xl text-black py-4"
              onClick={() => router.push("./history")}
            >
              History
            </button>
            <button className="border border-black rounded-2xl text-black py-4">
              Settings
            </button>
          </div>
          <div className="flex flex-col mt-10">
            <p className="text-black justify-start mx-4">Recent Transactions</p>
            <div className="flex flex-col w-screen">
              <div className="mx-3 shadow-2xl px-3 py-3 fex flex-col justify-center mt-5 rounded-xl">
                <div className="flex flex-row justify-between">
                  <p className="text-black">0x8d7....1D37</p>
                  <p className="text-black">14:36, 12 April 2023</p>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="flex flex-row justify-between">
                  <p className="text-black text-2xl">-$323.7</p>
                  <div className="px-3 py-1 bg-slate-100 rounded-lg">
                    <p className="text-black">Food</p>
                  </div>
                </div>
              </div>

              <div className="mx-3 shadow-2xl px-3 py-3 fex flex-col justify-center mt-5 rounded-xl">
                <div className="flex flex-row justify-between">
                  <p className="text-black">0x8d7....1D37</p>
                  <p className="text-black">14:36, 12 April 2023</p>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="flex flex-row justify-between">
                  <p className="text-black text-2xl">-$323.7</p>
                  <div className="px-3 py-1 bg-slate-100 rounded-lg">
                    <p className="text-black">Food</p>
                  </div>
                </div>
              </div>

              <div className="mx-3 shadow-2xl px-3 py-3 fex flex-col justify-center mt-5 rounded-xl">
                <div className="flex flex-row justify-between">
                  <p className="text-black">0x8d7....1D37</p>
                  <p className="text-black">14:36, 12 April 2023</p>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="flex flex-row justify-between">
                  <p className="text-black text-2xl">-$323.7</p>
                  <div className="px-3 py-1 bg-slate-100 rounded-lg">
                    <p className="text-black">Food</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Secondhalf;
