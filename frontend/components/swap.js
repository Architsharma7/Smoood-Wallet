import React, { useEffect, useState } from "react";
import {
  FusionSDK,
  NetworkEnum,
  QuoteParams,
  PrivateKeyProviderConnector,
} from "@1inch/fusion-sdk";

/// 1inch Fusion Swap method
// '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
// '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC

const swap = async (userAddress, signer) => {
  const [fromAddress, setFromAddress] = useState();
  const [toAddress, setToAddress] = useState();
  const [amount, setAmount] = useState();

  /// How to go around the blockchain provider field
  /// Maybe it is the signer , which can be directly used
  const blockchainProvider = new PrivateKeyProviderConnector(
    makerPrivateKey,
    new Web3(nodeUrl)
  );

  const sdk = new FusionSDK({
    url: "https://fusion.1inch.io",
    network: NetworkEnum.ETHEREUM,
    blockchainProvider,
  });

  const getOrderQuote = () => {
    //   const params = {
    //     fromTokenAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
    //     toTokenAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    //     amount: "1000000000000000000000",
    //   };
    //   const quote = await sdk.getQuote(params);
    //   console.log(quote);
  };

  const getOrderHistory = async () => {
    const orders = await sdk.getOrdersByMaker({
      page: 1,
      limit: 2,
      address: "0xfa80cd9b3becc0b4403b0f421384724f2810775f",
    });

    console.log(orders);
  };

  const placeNewOrder = () => {
    sdk
      .placeOrder({
        fromTokenAddress: fromAddress, // WETH
        toTokenAddress: toAddress, // USDC
        amount: amount, // 0.05 ETH
        walletAddress: userAddress,
        // fee is an optional field
        // fee: {
        //   takingFeeBps: 100, // 1% as we use bps format, 1% is equal to 100bps
        //   takingFeeReceiver: "0x0000000000000000000000000000000000000000", //  fee receiver address
        // },
      })
      .then(console.log);
  };

  const placeFusionOrder = () => {
    const order = new FusionOrder(
      {
        makerAsset: fromAddress,
        takerAsset: toAddress,
        makingAmount: amount,
        takingAmount: takerAmount,
        maker: userAddress,
      },
      salt,
      suffix
    );

    order.build();
  };
};

export default swap;
