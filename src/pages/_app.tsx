import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { motion, AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={router.route}
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={{
          pageInitial: {
            opacity: 0
          },
          pageAnimate: {
            opacity: 1
          },
          pageExit: {
            opacity: 0
          }
        }}
      >
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  )
}

export default MyApp