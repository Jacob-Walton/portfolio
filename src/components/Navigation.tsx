import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageToggle from './LanguageToggle';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { useTranslation } from '../hooks/useTranslation';
import styles from '../styles/Navigation.module.css';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollDirection = useScrollDirection();
  const { t } = useTranslation();

  const navItems = [
    { key: 'about', href: '#about' },
    { key: 'projects', href: '#projects' },
    { key: 'contact', href: '#contact' },
  ];

  return (
    <motion.nav
      className={styles.nav}
      initial={{ y: -100 }}
      animate={{ y: scrollDirection === 'up' ? 0 : -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.container}>
        <a href="#" className={styles.logo}>
          <span className={styles.kanji}>和</span>
          <span className={styles.name}>Jacob Walton</span>
        </a>

        <div className={styles.desktop}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.key}>
                <a href={item.href} className={styles.navLink}>
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