import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
// import PinInput from "react-pin-input";
import {
  intiateContractInstance,
  addRecoveryMethod,
} from "../components/contractMethods";
import { useAuth } from "../auth-context/auth";

const Recoverymethod = () => {
  const [recoveryFormData, setrecoveryFormData] = useState({});
  const router = useRouter();

  const { currentUser, safeAddress } = useAuth();

//   const handleChange = () => {
//     // if(recoveryFormData.pin === 4){
//     //     alert("please enter a 4 digit pin")
//     // }
//     router.push("/");
//   };
//   console.log(recoveryFormData);

  const initiate = async () => {
    const { recordContract, recordContractWithSigner } =
      await intiateContractInstance();
    /// SafeAddress, EOA
    console.log(currentUser);
    console.log(safeAddress)

    const data = encode(recoveryFormData)
    addRecoveryMethod(recordContractWithSigner,safeAddress,currentUser,data.q1,data.a1, data.q2, data.a2 );
  };

  const encode = (formData) => {
    const publickey = currentUser
    const encodedq1 = `${publickey.slice(3,6)}${formData.q1}${formData.pin.slice(0,2)}${publickey.slice(-3,-1)}`
    const encodedq2 = `${publickey.slice(3,6)}${formData.q2}${formData.pin.slice(0,2)}${publickey.slice(-3,-1)}`
    const encodeda1 = `${publickey.slice(3,6)}${formData.a1}${formData.pin.slice(0,2)}${publickey.slice(-3,-1)}`
    const encodeda2 = `${publickey.slice(3,6)}${formData.a2}${formData.pin.slice(0,2)}${publickey.slice(-3,-1)}`

    const finalData = {
        q1: btoa(encodedq1),
        a1: btoa(encodeda1),
        q2: btoa(encodedq2),
        a2: btoa(encodeda2)
    }
    console.log(finalData);
    return formData
  }

  return (
    <div className="w-screen h-screen bg-white">
      <div className="flex flex-col justify-center mx-4">
        <div className="mt-10">
          <p className="text-black text-center text-3xl">Add Recovery Method</p>
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
          <p className="text-black text-xl">Set a pin</p>
          {/* <PinInput
            length={4}
            initialValue=""
            secret
            secretDelay={100}
            onChange={(e) => {setrecoveryFormData({...recoveryFormData, pin: e.target.value})}}
            type="numeric"
            inputMode="number"
            style={{ padding: "10px", color: "black" }}
            inputStyle={{ borderColor: "green" }}
            inputFocusStyle={{ borderColor: "blue" }}
            autoSelect={true}
            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
          /> */}
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
        <button
          onClick={()=>initiate()}
          className="px-10 py-2 bg-emerald-500 text-white flex justify-center mx-auto rounded-xl text-xl mb-5"
        >
          Continue
        </button>
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
