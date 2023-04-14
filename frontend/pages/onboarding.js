import React, { useEffect } from "react";
import { useAuth } from "../auth-context/auth";
import { EthersAdapter } from "@safe-global/protocol-kit";
import { ethers } from "ethers";
import { SafeFactory } from "@safe-global/protocol-kit";
import SafeApiKit from "@safe-global/api-kit";

const Onboarding = () => {
  const {
    safeAuthKit: safeAuth,
    intializeAuthKit,
    currentUser,
    provider,
    setProvider,
    signer,
    setSigner,
  } = useAuth();

  useEffect(() => {
    if (!safeAuth) {
      intializeAuthKit();
      console.log("Intializing Auth Kit");
    }
  }, []);

  const login = async () => {
    try {
      console.log("Loginigg in ");
      console.log(safeAuth);
      if (!safeAuth) {
        console.log("SafeAuthNot found");
        return;
      }
      const response = await safeAuth.signIn();
      console.log("SIGN IN RESPONSE: ", response);

      setsafeAuthSigninResponse(response);
      const provider = new ethers.providers.Web3Provider(eoaAddress);
      setProvider(provider);
      const signer = provider.getSigner();
      setSigner(signer);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const createSafeWallet = async () => {
    if (!signer) {
      console.log("SignIn/ SignUp");
      return;
    }

    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer,
    });

    const safeFactory = await SafeFactory.create({
      ethAdapter: ethAdapter,
    });

    const safeService = new SafeApiKit({
      txServiceUrl: "https://safe-transaction-goerli.safe.global",
      ethAdapter,
    });

    const owners = [`${await safeAuth.getProvider()}`];
    const threshold = 1;

    const safeAccountConfig = {
      owners,
      threshold,
    };

    /// Will it have gas fees to deploy this safe tx
    const safeSdk = await safeFactory.deploySafe({ safeAccountConfig });

    console.log("Creating and deploying the new safe");

    /// wait for the deployement to be completed
    const newSafeAddress = safeSdk.getAddress();

    console.log(newSafeAddress);

    /// Also check about storing the gnosisSafe address somewhere
    const safes = await safeService.getSafesByOwner(
      await safeAuth.getProvider()
    );
    console.log(safes);
  };

  return (
    <div className="bg-stone-900 w-screen h-screen">
      <div className="justify-center flex flex-col mx-auto">
        <div className="bg-stone-900">
          <div className="mt-48 flex flex-col justify-center ">
            <p className="text-emerald-500 text-center text-4xl">
              Smoood Wallet
            </p>
            <p className="text-white mt-10 text-center">A Mom's wallet</p>
            <button
              onClick={login}
              className="mt-40 text-2xl bg-white mx-auto rounded-2xl px-4 py-3 text-emerald-500"
            >
              Sign In / Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
