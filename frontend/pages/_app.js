import "../styles/globals.css";
import { AuthProvider } from "../auth-context/auth";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
  );
}

export default MyApp;
