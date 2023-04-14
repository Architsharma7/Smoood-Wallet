import React, { useEffect, useState } from "react";
import QrScanner from "qr-scanner";  
import { Router } from "next/router";

const ScanQR = () => {
  const [scanResult, setScanResult] = useState("DONE");

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
    const qrScanner = new QrScanner(document.getElementById("v"), (result) =>{
        console.log("decoded qr code:", result)
        setScanResult(result)
        const parsed = result.split(';')
        console.log(parsed)

        const finalData = {
            "address":  parsed[0],
            "amount": parsed[1],
            "message": parsed[2]
        }

        console.log(finalData)
    }
    );
    qrScanner.start();
  };

  return (
    <div>
      {scanResult && <p>{scanResult}</p>}

      <video id="v"></video>

      <button onClick={() => letGo()}>Go</button>
    </div>
  );
};

export default ScanQR;