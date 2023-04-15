import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import {
    intiateContractInstance,
    addRecoveryMethod,
    getRecoveryRecord,
  } from "../components/contractMethods";
  import { useAuth } from "../auth-context/auth";

const Recoverypage = () => {
    const [recoveryFormData, setrecoveryFormData] = useState({});
    const router = useRouter();
    const [eoaAddress, setEoaAddress] = useState()
    const [safeAddress, setSafeAddress] = useState()

    // const { currentUser, safeAddress } = useAuth();

    const recover = async () => {
        try {
            const { recordContract, recordContractWithSigner } =
            await intiateContractInstance()
          /// SafeAddress, EOA
          console.log(eoaAddress);
          console.log(safeAddress)
  
          const record = await getRecoveryRecord(recordContractWithSigner ,safeAddress)
  
          console.log(record);
  
          // encode
          const enteredData = encode(recoveryFormData)
          console.log(enteredData)
  
          // check 
          if(record["a1"] === enteredData.a1 && record["q1"] === enteredData.q1 && record["q2"] === enteredData.q2 && record["a2"] === enteredData.a2 ){
            console.log("Match")
            // recover wallet     
          }else {
            console.log("Not Found")
          }
  
        } catch (error) {
            console.log(error)
        }
       
      };

      const encode = (formData) => {
        const publickey = eoaAddress
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
        return finalData
      }

  return (
    <div className="w-screen h-screen bg-white">
      <div className="flex flex-col justify-center mx-4">
        <div className="mt-10">
          <p className="text-black text-center text-3xl">Recover Your Wallet</p>
        </div>
        <div  className="mt-10 flex flex-col">
            <p className="text-black text-xl">What's your safe address?</p>
            <input
            onChange={(e)=>{setSafeAddress(e.target.value)}}
            className="px-4 py-2 text-black bg-white mt-3 rounded-xl border border-black"></input>
        </div>
        <div  className="mt-10 flex flex-col">
            <p className="text-black text-xl">What's your EOA address?</p>
            <input
            onChange={(e)=>{setEoaAddress(e.target.value)}}
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
        <button onClick={()=>recover()} className="px-10 py-2 bg-emerald-500 text-white flex justify-center mx-auto rounded-xl text-xl mb-5">
          Recover
        </button>
      </div>
    </div>
  );
};

export default Recoverypage;
