import Script from "next/script";

const GoogleAnalytics = () => {
  // GA라는 환경변수가 있을 때에만 아래의 jsx 엘리먼트들을 호출하고, 그렇지 않으면 호출하지 않도록 설정
  if (!process.env.GA) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA}`}
        strategy="afterInteractive"
      />

      <Script id="nextjs-google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.GA}');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
