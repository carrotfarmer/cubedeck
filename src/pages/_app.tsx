import "@fontsource/staatliches";
import "../styles/globals.css";
import { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Providers } from "../components/ui/Providers";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Providers>
      <NextNProgress
        color="#efd36b"
        startPosition={0.3}
        stopDelayMs={200}
        height={2}
        options={{ showSpinner: false }}
      />
      <Component {...pageProps} />
    </Providers>
  );
}
export default MyApp;
