import transakSDK from "@transak/transak-sdk";

import React from "react";

//https://docs.transak.com/docs/visual-customization-and-data-display-options
export const transakRamp = (userAddress) => {
  let transak = new transakSDK({
    apiKey: process.env.NEXT_PUBLIC_TRANSAK_API_KEY, // (Required)
    environment: "STAGING", // (Required)
    // widgetHeight: "500px",
    // widgetWidth: "350px",
    // Examples of some of the customization parameters you can pass
    defaultCryptoCurrency: "USDC",
    // cryptoCurrencyCode: "USDC", // Example 'ETH'
    walletAddress: "0x123b7aAdA4f1f7C54108Bd250030AF21C7587109", // Your customer's wallet address
    fiatCurrency: "INR",
    redirectURL: "/",
    isDisableCrypto: true,
    isFeeCalculationHidden: true,
    disableWalletAddressForm: true,
    network: "ethereum",
    // .....
    // For the full list of customisation options check the link above
  });

  transak.init();

  // To get all the events
  transak.on(transak.ALL_EVENTS, (data) => {
    console.log(data);
  });

  // This will trigger when the user closed the widget
  transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, (orderData) => {
    transak.close();
  });

  // This will trigger when the user marks payment is made
  transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
    console.log(orderData);
    transak.close();
  });
};
