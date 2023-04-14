import React, { createContext } from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const userInfo = useRef();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const value = {
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}