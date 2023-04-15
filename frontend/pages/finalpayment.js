import React from "react";
import { useAuth } from "../auth-context/auth";

const Finalpayment = () => {
  const { payData } = useAuth();
  return (
    <div className="w-screen bg-white h-screen">
      <div className="flex flex-col mx-auto justify-center">
        <div className="mt-20 mx-3">
          <div className="bg-emerald-500 px-10 py-4 rounded-xl">
            <div className="flex flex-col text-center mt-5">
              <p className="text-white text-xl">Paying to</p>
              <p className="text-black text-2xl mt-2">{payData.address}</p>
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
              <div class="inline-flex rounded-md shadow-sm" role="group">
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
            <button className="text-white text-center bg-emerald-500 px-14 py-3 rounded-xl border text-xl hover:scale-110 duration-300 hover:bg-white hover:border-emerald-500 hover:text-emerald-500">Pay</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finalpayment;
