import React from "react";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { SiProtocolsdotio } from "react-icons/si";
import { useState } from "react";
import copy from "copy-to-clipboard";
import styles from "../styles/scroll.module.css";
import { useAuth } from "../auth-context/auth";
import { useRouter } from "next/router";

const Firsthalf = () => {
  const copyToClipboard = () => {
    copy(copyText);
    alert(`You have copied "${copyText}"`);
  };

  const router = useRouter();

  const { safeAuthKit: safeAuth,setProvider,setSigner} = useAuth();

  const logout = async () => {
    console.log(safeAuth);
    if (!safeAuth) {
      console.log("SafeAuthNot found");
      return;
    }

    await safeAuth.signOut();

    setProvider(null);
    // safeAuthSigninResponse(null);
    router.push("/onboarding")
  };

  return (
    <div className={styles.firsthalf}>
      <div className="bg-stone-900 w-screen">
        <div className="justify-center flex flex-col mx-auto">
          <div className="bg-stone-900">
            <div className="flex flex-row justify-between mx-5 mt-2">
              <MdOutlineNotificationsActive className="text-3xl" />
              <div className="flex flex-col text-center">
                <p className="text-white">Archit.eth</p>
                <p className="text-white mt-1">0x8d7....1D37</p>
              </div>
              <SiProtocolsdotio className="text-3xl" onClick={logout}/>
            </div>
            <div className="mt-14 mx-auto flex flex-col justify-center text-center">
              <p className="text-gray-400">Current Balance</p>
              <p className="text-cyan-500 text-3xl mt-2">$100012</p>
            </div>
            <div className="mt-10 mx-auto flex flex-col justify-center text-center">
              <p className="text-white">Assets</p>
              <div className="w-screen mt-4">
                <div className="bg-gray-700 rounded-xl mx-7 py-3">
                  <div className="flex justify-between mx-3">
                    <p>Ethereum</p>
                    <p>1.010</p>
                  </div>
                </div>
                <div className="bg-gray-700 rounded-xl mx-7 py-3 mt-3">
                  <div className="flex justify-between mx-3">
                    <p>USDC</p>
                    <p>10000.010</p>
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

export default Firsthalf;