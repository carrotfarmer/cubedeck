import { ChakraProvider } from "@chakra-ui/react";

import "@fontsource/staatliches";

import theme from "../theme";
import { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <ChakraProvider resetCSS theme={theme}>
        <NextNProgress
          color="#f5df66"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          options={{ showSpinner: false }}
        />

        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
