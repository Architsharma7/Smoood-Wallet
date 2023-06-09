import React, { useEffect, useState } from "react";
import { useAuth } from "../auth-context/auth";
import { EthersAdapter } from "@safe-global/protocol-kit";
import { ethers } from "ethers";
import Safe,{ SafeFactory } from "@safe-global/protocol-kit";
import SafeApiKit from "@safe-global/api-kit";
// import { Audio } from "react-loader-spinner";
import Confetti from "react-confetti";
import { SiProtocolsdotio } from "react-icons/si";
import { useRouter } from "next/router";
import { enableModule, getUserSafe } from "../components/safeMethods";
import { recoveryModuleContractAddress } from "../constants/contractData";

const Onboarding = ({ type, color }) => {
  const {
    safeAuthKit: safeAuth,
    intializeAuthKit,
    currentUser,
    setCurrentUser,
    provider,
    setProvider,
    signer,
    setSigner,
    safeSDK,
    setSafeSDK,
    safeAddress,
    setSafeAddress,
  } = useAuth();

  useEffect(() => {
    if (!safeAuth) {
      intializeAuthKit();
      console.log("Intializing Auth Kit");
    }
  }, []);

  useEffect(() => {
    if (provider) {
      setIsLoggedIn(true);
    }
  }, [provider]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [safeSetupComplete, setsafeSetupComplete] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const router = useRouter();

  const login = async () => {
    try {
      setisLoading(true);
      console.log("Loginigg in ");
      console.log(safeAuth);
      if (!safeAuth) {
        console.log("SafeAuthNot found");
        return;
      }
      const response = await safeAuth.signIn();
      console.log("SIGN IN RESPONSE: ", response);

      // setsafeAuthSigninResponse(response);
      const provider = new ethers.providers.Web3Provider(
        safeAuth.getProvider()
      );
      setProvider(provider);
      const signer = provider.getSigner();
      setSigner(signer);
      const eoa = await signer.getAddress();
      console.log(eoa);
      setCurrentUser(eoa);
      setIsLoggedIn(true);
      setisLoading(false);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };

  const createSafeWallet = async () => {
    try {
      setisLoading(true);
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

      const owners = [`${await signer.getAddress()}`];
      const threshold = 1;

      const safeAddress =await getUserSafe(signer);
      console.log(safeAddress)
      if(safeAddress){
        const safeSDK = await Safe.create({ethAdapter, safeAddress});

        await enableModule(safeSDK,recoveryModuleContractAddress)
        setSafeSDK(safeSDK)
        setSafeAddress(safeAddress)
        setsafeSetupComplete(true)
        setisLoading(false)

        return;
      }

      const safeAccountConfig = {
        owners,
        threshold,
      };
      console.log(safeAccountConfig);
      // / Will it have gas fees to deploy this safe tx
      const safeSdk = await safeFactory.deploySafe({ safeAccountConfig });

      console.log("Creating and deploying the new safe");

      // const newSafeAddress = "0x2c4ed5ea89D8231C4E64F02f0da4E5ffcE4263D9";

      // / wait for the deployement to be completed
      const newSafeAddress = safeSdk.getAddress();

      console.log(newSafeAddress);

      if (newSafeAddress) {
        setsafeSetupComplete(true);
        setisLoading(false);
      }

      setSafeSDK(safeSdk);
      setSafeAddress(newSafeAddress);

      enableModule(safeSDK, newSafeAddress);

      /// On Continue, direct to the home page
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };

  return (
    <div className="bg-stone-900 w-screen h-screen">
      <div className="justify-center flex flex-col mx-auto">
        <div className="bg-stone-900">
          <div className="mt-32 flex flex-col justify-center ">
            <div className="flex justify-center mx-auto text-9xl">
              <SiProtocolsdotio/>
            </div>
            <p className="text-emerald-500 text-center text-5xl mt-10">
              Smoood Wallet
            </p>
            <p className="text-white mt-5 text-center text-2xl">A wallet even Grandma uses</p>
            {isLoading ? (
              <div className="w-screen flex flex-col justify-center mx-auto mt-10 text-center">
                <svg
                  className="w-8 h-8 text-gray-200 animate-spin fill-white mx-auto"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <p className="text-white mt-5 text-center flex mx-auto justify-center text-2xl">Creating Your Wallet...</p>
              </div>
            ) : (
              <>
                {" "}
                {safeSetupComplete ? (
                  <div className="w-screen flex flex-col">
                    <Confetti/>
                    <div className="w-screen mx-auto">
                      <div className="mt-10 bg-white border border-white px-7 flex flex-col py-4 mx-10 rounded-xl h-80">
                        <p className="text-emerald-500 text-4xl text-center mt-10">Congratulations</p>
                        <p className="text-emerald-500 text-3xl text-center mt-10">Your payment experience is gonna be smoood.</p>
                      </div>
                      <button className="px-10 py-2 bg-emerald-500 text-white flex justify-center mt-10 mx-auto rounded-xl text-xl mb-5" onClick={() => router.push("/recoverymethod")}>
                        Continue
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {!isLoggedIn ? (
                      <button
                        onClick={login}
                        className="mt-20 text-2xl bg-white mx-auto rounded-2xl px-4 py-3 text-emerald-500 flex justify-center"
                      >
                        Sign In / Sign Up
                      </button>
                    ) : (
                      <button
                        className="mt-20 text-2xl bg-white mx-auto rounded-2xl px-4 py-3 text-emerald-500 flex justify-center"
                        onClick={createSafeWallet}
                      >
                        Let me in
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
