import React, { createContext } from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import {
  SafeAuthKit,
  SafeAuthProviderType,
  SafeAuthEvents,
} from "@safe-global/auth-kit";
import { publicPaths } from "../constants/publicpath";
import { ethers } from "ethers";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [safeAuthKit, setSafeAuthKit] = useState();
  const [safeSDK, setSafeSDK] = useState();
  const [safeAddress, setSafeAddress] = useState();
  const [payData, setPayData] = useState();

  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();

  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const authCheck = () => {
      if (!currentUser && !publicPaths.includes(router.asPath.split("?")[0])) {
        setAuthorized(false);
        // dispatch(setRedirectLink({ goto: router.asPath }));
        // void router.push({
        //   pathname: "/onboarding",
        // });
      } else {
        setAuthorized(true);
      }
    };

    authCheck();
    const preventAccess = () => setAuthorized(false);

    router.events.on("routeChangeStart", preventAccess);
    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeStart", preventAccess);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, [router, currentUser, safeAuthKit]);

  const intializeAuthKit = async () => {
    // console.log(process.env.NEXT_PUBLIC_RPC_URL);
    const safeAuthKit = await SafeAuthKit.init(SafeAuthProviderType.Web3Auth, {
      chainId: "0x5",
      authProviderConfig: {
        rpcTarget: process.env.NEXT_PUBLIC_RPC_URL, // Add your RPC e.g. https://goerli.infura.io/v3/<your project id>
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID, // Add your client id. Get it from the Web3Auth dashboard
        network: "testnet" | "mainnet", // The network to use for the Web3Auth modal. Use 'testnet' while developing and 'mainnet' for production use
        theme: "dark", // The theme to use for the Web3Auth modal
        modalConfig: {
          // The modal config is  optional and it's used to customize the Web3Auth modal
          // Check the Web3Auth documentation for more info: https://web3auth.io/docs/sdk/web/modal/whitelabel#initmodal
        },
      },
    });

    safeAuthKit.subscribe(SafeAuthEvents.SIGNED_IN, () => {
      console.log("User is authenticated");
    });

    safeAuthKit.subscribe(SafeAuthEvents.SIGNED_OUT, () => {
      console.log("User is not authenticated");
    });

    setSafeAuthKit(safeAuthKit);
    console.log(safeAuthKit);
    return safeAuthKit;
  };

  const getUser = async () => {
    let safeAuth;
    if (!safeAuthKit) {
      safeAuth = await intializeAuthKit();
    }
    const eoaAddress = safeAuth.getProvider();
    console.log(eoaAddress);
    if (eoaAddress) {
      // setCurrentUser(eoaAddress);

      const provider = new ethers.providers.Web3Provider(eoaAddress);
      setProvider(provider);

      const signer = provider.getSigner();
      setSigner(signer);

      const address = await signer.getAddress()
      console.log(address)

      setCurrentUser(address)
      
      console.log(provider, signer);
      setAuthorized(true);

      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    safeAuthKit,
    intializeAuthKit,
    setProvider,
    provider,
    signer,
    setSigner,
    safeSDK,
    setSafeSDK,
    safeAddress,
    setSafeAddress,
    payData,
    setPayData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
