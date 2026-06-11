import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import styles from '../styles/Contact.module.css';

const Contact: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className={`${styles.contact} section`}>
      <div className="container">
        <h2 className={styles.heading}>
          <span className={styles.headingIndex}>03</span>
          {t('contact.title')}
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={styles.subtitle}>{t('contact.subtitle')}</p>

          <a href="mailto:jacob-walton@konpeki.co.uk" className={styles.email}>
            jacob-walton@konpeki.co.uk
          </a>

          <div className={styles.links}>
            <a
              href="https://github.com/Jacob-Walton"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a
              href="https://www.linkedin.com/in/jacob-walton-588764362"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
        </motion.div>

        <footer className={styles.footer}>
          <span>© {new Date().getFullYear()} Jacob Walton</span>
          <span>{t('contact.footer.legal')}</span>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
