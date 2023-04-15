import React from "react";

const Onramp = () => {
  return (
    <div className="h-screen">
      <iframe
      height="100%"
        title="Transak On/Off Ramp Widget"
        src="https://global-stg.transak.com?apiKey=0bfa1e08-6fb5-48e7-a337-d008d751c771"
        frameborder="yes"
        allowtransparency="true"
        allowfullscreen=""
        style={{display: "block", width: "100%"}}
      ></iframe>
    </div>
  );
};

export default Onramp;
