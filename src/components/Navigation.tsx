import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageToggle from './LanguageToggle';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { useTranslation } from '../hooks/useTranslation';
import styles from '../styles/Navigation.module.css';

const navItems = [
  { key: 'about', href: '#about', index: '01' },
  { key: 'projects', href: '#projects', index: '02' },
  { key: 'contact', href: '#contact', index: '03' },
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollDirection = useScrollDirection();
  const { t } = useTranslation();

  return (
    <motion.nav
      className={styles.nav}
      initial={{ y: -100 }}
      animate={{ y: scrollDirection === 'up' ? 0 : -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.container}>
        <a href="#" className={styles.logo}>
          <span className={styles.mark} aria-hidden="true" />
          <span className={styles.name}>Jacob Walton</span>
        </a>

        <div className={styles.desktop}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.key}>
                <a href={item.href} className={styles.navLink}>
                  <span className={styles.navIndex}>{item.index}</span>
                  {t(`nav.${item.key}`)}
                </a>
              </li>
            ))}
          </ul>
          <LanguageToggle />
        </div>

        <button
          className={styles.menuToggle}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className={`${styles.bar} ${isOpen ? styles.open : ''}`} />
          <span className={`${styles.bar} ${isOpen ? styles.open : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className={styles.mobileNavList}>
              {navItems.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className={styles.mobileNavLink}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className={styles.navIndex}>{item.index}</span>
                    {t(`nav.${item.key}`)}
                  </a>
                </li>
              ))}
            </ul>
            <div className={styles.mobileLang}>
              <LanguageToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
