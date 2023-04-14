import React, { createContext } from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import {
  SafeAuthKit,
  SafeAuthProviderType,
  SafeAuthEvents,
} from "@safe-global/auth-kit";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [safeAuthKit, setSafeAuthKit] = useState();

  const userInfo = useRef();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const authCheck = () => {
      if (!user && !publicPaths.includes(router.asPath.split("?")[0])) {
        setAuthorized(false);
        // dispatch(setRedirectLink({ goto: router.asPath }));
        void router.push({
          pathname: "/hello",
        });
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
  }, [router, router.events, currentUser]);

  const intializeAuthKit = async () => {
    const safeAuthKit = await SafeAuthKit.init(SafeAuthProviderType.Web3Auth, {
      chainId: "0x5",
      authProviderConfig: {
        rpcTarget:
          "https://polygon-mumbai.g.alchemy.com/v2/bZFiL-IFAMe4QAh9Q30gDQ7m1vxEss4u", // Add your RPC e.g. https://goerli.infura.io/v3/<your project id>
        clientId:
          "BI2SkFVRuQr8TqLoicvYRQivxyw8HL7FtfKok4VQXKhQ4V38pop3yLJhFQEphRfee3bGNG5u_wqfwePZsijnpcg", // Add your client id. Get it from the Web3Auth dashboard
        network: "testnet" | "mainnet", // The network to use for the Web3Auth modal. Use 'testnet' while developing and 'mainnet' for production use
        theme: "light" | "dark", // The theme to use for the Web3Auth modal
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
  };

  const getUser = async () => {
    if (!safeAuthKit) {
      await intializeAuthKit();
    }
    const eoaAddress = safeAuthKit.getProvider();
    if (eoaAddress) {
      setCurrentUser(eoaAddress);
      setAuthorized(true);
    }
  };

  useEffect(() => {
    // (async () => {
    //   const safeAuthKit = await SafeAuthKit.init(
    //     SafeAuthProviderType.Web3Auth,
    //     {
    //       chainId: "0x5",
    //       authProviderConfig: {
    //         rpcTarget:
    //           "https://polygon-mumbai.g.alchemy.com/v2/bZFiL-IFAMe4QAh9Q30gDQ7m1vxEss4u", // Add your RPC e.g. https://goerli.infura.io/v3/<your project id>
    //         clientId:
    //           "BI2SkFVRuQr8TqLoicvYRQivxyw8HL7FtfKok4VQXKhQ4V38pop3yLJhFQEphRfee3bGNG5u_wqfwePZsijnpcg", // Add your client id. Get it from the Web3Auth dashboard
    //         network: "testnet" | "mainnet", // The network to use for the Web3Auth modal. Use 'testnet' while developing and 'mainnet' for production use
    //         theme: "light" | "dark", // The theme to use for the Web3Auth modal
    //         modalConfig: {
    //           // The modal config is  optional and it's used to customize the Web3Auth modal
    //           // Check the Web3Auth documentation for more info: https://web3auth.io/docs/sdk/web/modal/whitelabel#initmodal
    //         },
    //       },
    //     }
    //   );

    //   safeAuthKit.subscribe(SafeAuthEvents.SIGNED_IN, () => {
    //     console.log("User is authenticated");
    //   });

    //   safeAuthKit.subscribe(SafeAuthEvents.SIGNED_OUT, () => {
    //     console.log("User is not authenticated");
    //   });

    //   setSafeAuthKit(safeAuthKit);
    //   console.log(safeAuthKit);
    // })();

    intializeAuthKit();
  }, []);

  const value = {
    safeAuthKit,
    intializeAuthKit,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
