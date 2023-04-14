import React, { useEffect } from "react";
import { useAuth } from "../auth-context/auth";

const Onboarding = () => {
  const { safeAuthKit: safeAuth, intializeAuthKit } = useAuth();

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
      setProvider(safeAuth.getProvider());
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    console.log(safeAuth);
    if (!safeAuth) {
      console.log("SafeAuthNot found");
      return;
    }

    await safeAuth.signOut();

    setProvider(null);
    setsafeAuthSigninResponse(null);
  };

  return (
    <div className="bg-stone-900 w-screen h-screen">
      <div className="justify-center flex flex-col mx-auto">
        <div className="bg-stone-900">
          <div className="mt-20 flex justify-center text-4xl">
            <p className="text-emerald-500">Smooth Wallet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
