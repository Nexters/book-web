import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          property="og:title"
          content="세상에서 제일 쉬운 독서기록, 책조각"
        />
        <meta property="og:url" content="https://pieceofbook.com" />
        <meta property="og:image" content="/images/og-image.png" />

        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
