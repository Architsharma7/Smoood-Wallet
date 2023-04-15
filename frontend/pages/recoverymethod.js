import React from "react";
import { useState } from "react";
import PinInput from "react-pin-input";

const Recoverymethod = () => {
  const [recoveryFormData, setrecoveryFormData] = useState({});
  return (
    <div className="w-screen h-screen bg-white">
      <div className="flex flex-col justify-center mx-4">
        <div className="mt-10">
          <p className="text-black text-center text-3xl">Add Recovery Method</p>
        </div>
        <div className="mt-10 flex flex-col">
          <select className="text-black text-xl bg-white px-2 flex justify-start">
            <option>What is your pet's name?</option>
            <option>What is your school name?</option>
            <option>What is your house's name?</option>
            <option>What is your nickname?</option>
          </select>
          <input className="px-4 py-2 text-black bg-white mt-3 rounded-xl border border-black"></input>
        </div>
        <div className="mt-10 flex flex-col">
          <select className="text-black text-xl bg-white px-2 flex justify-start">
            <option>What is your favourite fruit?</option>
            <option>What is your favourite animal?</option>
            <option>What is your favourite movie?</option>
            <option>What is your favourite flower?</option>
          </select>
          <input className="px-4 py-2 text-black bg-white mt-3 rounded-xl border border-black"></input>
        </div>
        <div className="mt-10 flex flex-col">
          <p className="text-black text-xl">Set a pin</p>
          <PinInput
            length={4}
            initialValue=""
            secret
            secretDelay={100}
            onChange={(value, index) => {}}
            type="numeric"
            inputMode="number"
            style={{ padding: "10px", color: "black" }}
            inputStyle={{ borderColor: "green" }}
            inputFocusStyle={{ borderColor: "blue" }}
            onComplete={(value, index) => {}}
            autoSelect={true}
            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
          />
        </div>
      </div>
    </div>
  );
};

export default Recoverymethod;

// q1: "",
//         a1: "",
//         q2: "",
//         a2: "",
//         pin: 0
