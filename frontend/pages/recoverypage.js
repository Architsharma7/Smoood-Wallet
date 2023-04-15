import React from "react";

const Recoverypage = () => {
  return (
    <div className="w-screen h-screen bg-white">
      <div className="flex flex-col justify-center mx-4">
        <div className="mt-10">
          <p className="text-black text-center text-3xl">Recover Your Wallet</p>
        </div>
        <div  className="mt-10 flex flex-col">
            <p className="text-black text-xl">What's your safe address?</p>
            <input
            className="px-4 py-2 text-black bg-white mt-3 rounded-xl border border-black"></input>
        </div>
        <div  className="mt-10 flex flex-col">
            <p className="text-black text-xl">What's your EOA address?</p>
            <input
            className="px-4 py-2 text-black bg-white mt-3 rounded-xl border border-black"></input>
        </div>
        <div className="mt-10 flex flex-col">
          <select
            className="text-black text-xl bg-white px-2 flex justify-start"
            onChange={(e) =>
              setrecoveryFormData({ ...recoveryFormData, q1: e.target.value })
            }
          >
            <option value="petname">What is your pet's name?</option>
            <option value="schoolname">What is your school name?</option>
            <option value="housename">What is your house's name?</option>
            <option value="nickname">What is your nickname?</option>
          </select>
          <input
            className="px-4 py-2 text-black bg-white mt-3 rounded-xl border border-black"
            onChange={(e) =>
              setrecoveryFormData({ ...recoveryFormData, a1: e.target.value })
            }
          ></input>
        </div>
        <div className="mt-10 flex flex-col">
          <select
            className="text-black text-xl bg-white px-2 flex justify-start"
            onChange={(e) =>
              setrecoveryFormData({ ...recoveryFormData, q2: e.target.value })
            }
          >
            <option value="fruitname">What is your favourite fruit?</option>
            <option value="animalname">What is your favourite animal?</option>
            <option value="moviename">What is your favourite movie?</option>
            <option value="flowername">What is your favourite flower?</option>
          </select>
          <input
            className="px-4 py-2 text-black bg-white mt-3 rounded-xl border border-black"
            onChange={(e) =>
              setrecoveryFormData({ ...recoveryFormData, a2: e.target.value })
            }
          ></input>
        </div>
        <div className="mt-10 flex flex-col">
          <p className="text-black text-xl">What's the pin</p>
          <input
            type="text"
            className="px-4 py-2 text-black bg-white mt-3 rounded-xl border border-black"
            onChange={(e) =>
              setrecoveryFormData({ ...recoveryFormData, pin: e.target.value })
            }
          ></input>
        </div>
      </div>
      <div className="mx-auto mt-20 flex justify-center">
        <button className="px-10 py-2 bg-emerald-500 text-white flex justify-center mx-auto rounded-xl text-xl mb-5">
          Recover
        </button>
      </div>
    </div>
  );
};

export default Recoverypage;
