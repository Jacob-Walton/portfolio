import { useEffect } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { LocaleProvider } from '../contexts/LocaleContext';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <LocaleProvider>
      <AnimatePresence mode="wait">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AnimatePresence>
    </LocaleProvider>
  );
}

export default MyApp;