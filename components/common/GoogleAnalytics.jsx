import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import * as gtag from "@/components/lib/gtag";

const GoogleAnalytics = () => {
  const router = useRouter();

  const handleRouteChange = (url) => {
    gtag.pageview(url);
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA}`}
        strategy="afterInteractive"
      />

      <Script id="nextjs-google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA}');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
