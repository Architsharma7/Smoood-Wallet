import React, { useEffect } from "react";
import { useAuth } from "../auth-context/auth";

const Onboarding = () => {
  const { safeAuthKit: safeAuth, intializeAuthKit,provider,setProvider, signer, setSigner } = useAuth();

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

  return (
    <div className="bg-stone-900 w-screen h-screen">
      <div className="justify-center flex flex-col mx-auto">
        <div className="bg-stone-900">
          <div className="mt-48 flex flex-col justify-center ">
            <p className="text-emerald-500 text-center text-4xl">Smoood Wallet</p>
            <p className="text-white mt-10 text-center">A Mom's wallet</p>
            <button onClick={login} className="mt-40 text-2xl bg-white mx-auto rounded-2xl px-4 py-3 text-emerald-500">Sign In / Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
