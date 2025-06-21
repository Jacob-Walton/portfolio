import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import styles from '../styles/LanguageToggle.module.css';

const LanguageToggle: React.FC = () => {
  const router = useRouter();
  const { locale } = router;

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ja' : 'en';
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <motion.button
      className={styles.toggle}
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className={styles.text}>
        {locale === 'en' ? '日本語' : 'English'}
      </span>
    </motion.button>
  );
};

export default LanguageToggle;