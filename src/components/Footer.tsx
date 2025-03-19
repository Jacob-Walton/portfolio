import React from 'react';
import styles from '../styles/Footer.module.css';
import { useTranslation } from '../hooks/useTranslation';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          &copy; {currentYear} {t('footer.copyright')}
        </p>
        <div className={styles.links}>
          <motion.a 
            href="https://github.com/Jacob-Walton/portfolio" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.githubLink}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="devicon-github-original"></i> GitHub
          </motion.a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;