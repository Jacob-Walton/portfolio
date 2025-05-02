import React from 'react';
import styles from '../styles/Footer.module.css';
import { useTranslation } from '../hooks/useTranslation';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.leftSection}>
            <h3>{t('footer.contactMe')}</h3>
            <div className={styles.contactItem}>
              <i className="fas fa-envelope"></i>
              <a href="mailto:jacob-walton@konpeki.co.uk">{t('footer.email')}</a>
            </div>
          </div>
          
          <div className={styles.rightSection}>
            <h3>{t('footer.followMe')}</h3>
            <div className={styles.socialLinks}>
              <motion.a 
                href="https://github.com/Jacob-Walton" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="GitHub"
              >
                <i className="devicon-github-original"></i>
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/jacob-walton-588764362"
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </motion.a>
            </div>
          </div>
        </div>
        
        <div className={styles.copyright}>
          &copy; {currentYear} {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;