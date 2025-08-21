import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import styles from '../styles/Hero.module.css';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date());
    };
    
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    return time.toLocaleString('en-GB', {
      timeZone: 'Europe/London',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <motion.div 
            className={styles.header}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.timestamp}>
              {formatTime()}
            </div>
            <h1 className={styles.name}>
              <span className={styles.firstName}>Jacob</span>
              <span className={styles.lastName}>Walton</span>
            </h1>
          </motion.div>

          <motion.div
            className={styles.info}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className={styles.role}>{t('hero.role')}</p>
            <p className={styles.subtitle}>{t('hero.subtitle')}</p>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.nav}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a href="#about" className={styles.navLink}>{t('nav.about')}</a>
          <a href="#projects" className={styles.navLink}>{t('nav.projects')}</a>
          <a href="#contact" className={styles.navLink}>{t('nav.contact')}</a>
        </motion.div>
      </div>

      <div className={styles.decoration}>
        <div className={styles.line} />
      </div>
    </section>
  );
};

export default Hero;