import { useEffect } from 'react';
import Script from 'next/script';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { LocaleProvider } from '../contexts/LocaleContext';
import AlternativeThemeProvider from '@/providers/AlternativeThemeProvider';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <LocaleProvider>
      <AlternativeThemeProvider>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        <AnimatePresence mode="wait">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AnimatePresence>
      </AlternativeThemeProvider>
    </LocaleProvider>
  );
}

export default MyApp;