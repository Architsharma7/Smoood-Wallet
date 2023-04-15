import React, { useEffect } from "react";

import { useState } from "react";
import { useAuth } from "../auth-context/auth";

const Pay = () => {
  const { setPayData, payData } = useAuth();

  //   useEffect(()=>{
  //     console.log(payData)
  //   },[payData])
  return (
    <div className="h-screen w-screen bg-white">
      <div className="flex flex-col h-[75%]">
        <div className="mt-14">
          <p className="text-black text-center text-xl">{payData.address}</p>
          <p className="text-black text-center mt-28 text-lg">You are paying</p>
          <input
            className="bg-slate-50 border flex justify-center mx-auto px-5 py-7 rounded-xl mt-3 text-black text-2xl text-center"
            type="number"
            value={payData.amount}
            // onChange={(e) => setPrePayData({ address: pa, amount: 0, message: "" , tag: "" })}
            onChange={(e) => {
              setPayData((payData) => ({
                ...payData,
                amount: e.target.value,
              }));
            }}
          ></input>
          <input
            className="mt-10 bg-slate-50 flex justify-center mx-auto px-4 py-3 border rounded-xl text-black text-center"
            type="text"
            placeholder="Add message"
            value={payData.message}
            onChange={(e) => {
              setPayData((payData) => ({
                ...payData,
                message: e.target.value,
              }));
            }}
          ></input>
          <input
            className="mt-10 bg-slate-50 flex justify-center mx-auto px-1 py-1 border rounded-xl text-black text-center"
            type="text"
            placeholder="Add tag"
            onChange={(e) => {
              setPayData((payData) => ({
                ...payData,
                tags: e.target.value,
              }));
            }}
          ></input>
        </div>
      </div>
      <div className="flex flex-col h-[25%] border border-slate-400 rounded-t-3xl">
        {/* <div className="mt-10 flex flex-col justify-center mx-auto text-center">
          <label className="text-black">Choose currency</label>
          <select>
            <option>Please choose a level</option>
            <option value="basic">like a noob</option>
            <option value="medium">like an intermediate </option>
            <option value="high">like an expert</option>
          </select>
        </div> */}
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
