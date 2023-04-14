import React, { createContext } from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { SafeAuthKit, SafeAuthProviderType } from '@safe-global/auth-kit';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
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

  const value = {
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}