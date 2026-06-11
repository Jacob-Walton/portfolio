import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import styles from '../styles/Contact.module.css';

const links = [
  {
    href: 'mailto:jacob-walton@konpeki.co.uk',
    label: 'jacob-walton@konpeki.co.uk',
    type: 'email',
    external: false,
  },
  {
    href: 'https://github.com/Jacob-Walton',
    label: 'github.com/Jacob-Walton',
    type: 'github',
    external: true,
  },
  {
    href: 'https://www.linkedin.com/in/jacob-walton-588764362',
    label: 'linkedin.com/in/jacob-walton',
    type: 'linkedin',
    external: true,
  },
];

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleString('en-GB', {
          timeZone: 'Europe/London',
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" className={`${styles.contact} section`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.header}>
            <span className={styles.indexNumber}>03</span>
            <h2 className={styles.title}>{t('contact.title')}</h2>
          </div>

          <p className={styles.invitation}>{t('contact.subtitle')}</p>

          <div className={styles.links}>
            {links.map((link) => (
              <a
                key={link.type}
                href={link.href}
                className={styles.link}
                {...(link.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <span className={styles.linkType}>{link.type}</span>
                <span className={styles.linkText}>{link.label}</span>
                <span className={styles.linkArrow} aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </div>

          <footer className={styles.footer}>
            <span>© {new Date().getFullYear()} Jacob Walton</span>
            <span className={styles.footerPlace}>
              {t('contact.footer.legal')}
              {currentTime ? ` — ${currentTime}` : ''}
            </span>
          </footer>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
