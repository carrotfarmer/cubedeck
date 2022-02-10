import { ChakraProvider } from "@chakra-ui/react";

import "@fontsource/fjalla-one";
import "@fontsource/staatliches";

import theme from "../theme";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
