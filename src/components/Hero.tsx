import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../hooks/useTranslation";
import LanguageToggle from "./LanguageToggle";
import ChristmasTree from "./alt/ChristmasTree";
import styles from "../styles/Hero.module.css";
import { useAlternativeTheme } from "@/hooks/useAlternativeTheme";

const sections = [
  { key: "projects", href: "#projects" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#contact" },
];

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const alternativeTheme = useAlternativeTheme();

  return (
    <header className={styles.hero}>
      {alternativeTheme && <ChristmasTree />}

      <div className={styles.inner}>
        <div className={styles.topbar}>
          <nav className={styles.links} aria-label="Sections">
            {sections.map((section) => (
              <a key={section.key} href={section.href} className={styles.link}>
                {t(`nav.${section.key}`)}
              </a>
            ))}
          </nav>
          <LanguageToggle />
        </div>

        <div className={styles.spacer} />

        <motion.p
          className={styles.intro}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.h1
          className={styles.name}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Jacob
          <span>Walton</span>
        </motion.h1>

        <div className={styles.rule} />

        <div className={styles.meta}>
          <span>{t("hero.role")}</span>
          <span>{t("hero.location")}</span>
        </div>
      </div>
    </header>
  );
};

export default Hero;
