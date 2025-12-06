import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500&family=Inter:wght@300;400;500&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.ico" />
          <meta name="theme-color" content="#faf8f3" />
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-0WL06QEB2L"
            strategy="afterInteractive"
          />
          {/** biome-ignore lint/correctness/useUniqueElementIds: Google tag */}
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Google tag
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-0WL06QEB2L');
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;