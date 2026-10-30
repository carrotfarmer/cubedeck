import NextDocument, { Html, Head, Main, NextScript } from "next/document";

const themeScript = `try{var theme=localStorage.getItem('cubedeck-theme')||localStorage.getItem('chakra-ui-color-mode');document.documentElement.classList.toggle('dark',theme==='dark')}catch(e){}`;
export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icons/512x512-icon.png" />
          <meta name="theme-color" content="#efd36b" />
        </Head>
        <body>
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
