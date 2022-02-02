import { ChakraProvider } from "@chakra-ui/react";
import { initializeApp } from "firebase/app";

import theme from "../theme";
import { AppProps } from "next/app";
import { FirebaseConfig } from "../firebase.config";

function MyApp({ Component, pageProps }: AppProps) {
  initializeApp(FirebaseConfig);

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
