import "../styles/globals.css";
import { AuthProvider } from "../auth-context/auth";
import * as React from "react";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
        <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
