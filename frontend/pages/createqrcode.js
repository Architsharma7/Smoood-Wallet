/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import QRCode from "qrcode";

// import createQRCode from "/helper.js";

// import { createQRCode } from "../helper";

export default function GenerateQR(props) {
  const [qrUrl, setQrUrl] = useState();
  const [reqId, setReqId] = useState(0);

  useEffect(() => {
    if (props.id) {
      const id = props.id;
      setReqId(id);
      console.log(id);
    }
  }, []);

  const createInQr = () => {
    const link = `payId/${reqId}`;
    QRCode.toDataURL(link, opts).then((url) => {
      console.log(url);
      setQrUrl(url);
    });
  };

    const createQRCode = async () => {
    const opts = {
      errorCorrectionLevel: "H",
      type: "terminal",
      quality: 0.95,
      margin: 1,
      color: {
        dark: "#208698",
        light: "#FFF",
      },
    };

    var segs = [
      { data: '0xqibqcinicnoxz34oqb;', mode: 'byte' },
      { data: '0.5;', mode: 'byte' },
      { data: 'for Snacks', mode: 'byte' },
    ]

    QRCode.toDataURL(segs)
        .then((url) => {
          console.log(url);
          setQrUrl(url);
        //   var img = document.getElementById("image");
        //   console.log(img);
        //   img.src = url;
        })
        .catch((err) => {
          console.error(err);
        });
  };

  return (
    <div className="w-full">
      <div className="relative mb-6 w-full flex justify-around items-start rounded-md border-gray-300 border my-4 py-6 px-4">
        <div className="bg-white w-[140px] mx-auto">
          {qrUrl ? (
            <img src={qrUrl} alt="qr" />
          ) : (
            <div>
              <Image className="my-auto blur-sm" src={''} alt="qr" />
              <div className="mx-2 absolute top-[70px]">
                <button
                  onClick={createQRCode}
                  type="button"
                  className=" w-[120px]  bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md"
                >
                  Show QR
                </button>
              </div>
            </div>
          )}
        </div>
        <span className=" max-w-[150px]">
          Scan the QR using <span className="font-semibold ">SwiftUPI</span> QR
          code scanner
        </span>
      </div>
    </div>
  );
}

const opts = {
  errorCorrectionLevel: "H",
  type: "terminal",
  quality: 0.95,
  margin: 1,
  color: {
    dark: "#208698",
    light: "#FFF",
  },
};

export const createQrCode = (text) => {
  QRCode.toDataURL(text, opts).then((url) => {
    console.log(url);
    return url;
  });
};