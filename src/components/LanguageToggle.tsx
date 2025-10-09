import type React from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '../contexts/LocaleContext';
import styles from '../styles/LanguageToggle.module.css';

const LanguageToggle: React.FC = () => {
  const { locale, setLocale } = useLocale();

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ja' : 'en';
    setLocale(newLocale);
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