import { useEffect } from 'react';
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

  return (
    <LocaleProvider>
      <AlternativeThemeProvider>
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