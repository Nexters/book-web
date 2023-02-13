import "@/styles/globals.scss";
import GoogleAnalytics from "@/components/common/GoogleAnalytics";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}
