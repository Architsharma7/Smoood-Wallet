import React, { useEffect, useState } from "react";
import QrScanner from "qr-scanner";
import { Router } from "next/router";

const ScanQR = () => {
  const [scanResult, setScanResult] = useState("DONE");
  const [qrCodeData, setqrCodeData] = useState([])

  useEffect(() => {
    scanQR();
  }, []);

  const letGo = () => {
    try {
      Router.push(scanResult);
    } catch (error) {
      console.log(error);
    }
  };

  const scanQR = () => {
    const qrScanner = new QrScanner(document.getElementById("v"), (result) => {
      console.log("decoded qr code:", result);
      setScanResult(result);
      const parsed = result.split(";");
      console.log(parsed);

      const finalData = {
        address: parsed[0],
        amount: parsed[1],
        message: parsed[2],
      };

      console.log(finalData);
      setqrCodeData(finalData);
      
    });
    qrScanner.start();
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <video id="v" className="object-cover h-[80%] w-full"></video>
      <div className="bg-white h-[20%] rounded-3xl">
        <div className="w-full flex items-center justify-between pt-3 px-3">
          <hr className="w-full bg-gray-400" />
          <p className="text-base font-medium leading-4 px-3 text-gray-400">
            OR
          </p>
          <hr className="w-full bg-gray-400" />
        </div>
        <div className="mt-3 flex flex-col  mx-5 ">
          <input type="text" className="bg-slate-200 mt-2 px-2 py-1 rounded-lg text-black border border-black text-2xl" placeholder="Enter Address of Receiver"></input>
          <button className="mt-4 px-3 py-2 rounded-lg text-white bg-emerald-500 text-xl">
            Continue
          </button>
        </div>
      </div>
      {/* <button onClick={() => letGo()}>Go</button> */}
    </div>
  );
};

export default ScanQR;
