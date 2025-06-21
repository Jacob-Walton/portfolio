import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import styles from '../styles/Contact.module.css';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const londonTime = now.toLocaleString('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
      });
      setCurrentTime(londonTime);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" className={`${styles.contact} section`}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <div className={styles.invitation}>
            <h2 className={styles.title}>{t('contact.title')}</h2>
            <p className={styles.message}>{t('contact.subtitle')}</p>
          </div>

          <div className={styles.presence}>
            <div className={styles.location}>
              <span className={styles.detail}>Manchester, UK</span>
              <span className={styles.time}>{currentTime}</span>
            </div>
            
            <div className={styles.connections}>
              <motion.a 
                href="mailto:jacob-walton@konpeki.co.uk" 
                className={styles.link}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <span className={styles.linkText}>jacob-walton@konpeki.co.uk</span>
                <span className={styles.linkType}>email</span>
              </motion.a>
              
              <motion.a 
                href="https://github.com/Jacob-Walton" 
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <span className={styles.linkText}>github.com/Jacob-Walton</span>
                <span className={styles.linkType}>code</span>
              </motion.a>
              
              <motion.a 
                href="https://www.linkedin.com/in/jacob-walton-588764362" 
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <span className={styles.linkText}>linkedin.com/in/jacob-walton</span>
                <span className={styles.linkType}>network</span>
              </motion.a>
            </div>
          </div>

          <div className={styles.signature}>
            <div className={styles.mark}>和</div>
            <p className={styles.copyright}>© {new Date().getFullYear()}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;