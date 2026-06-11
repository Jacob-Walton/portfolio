import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../hooks/useTranslation";
import ChristmasTree from "./alt/ChristmasTree";
import styles from "../styles/Hero.module.css";
import { useAlternativeTheme } from "@/hooks/useAlternativeTheme";

const anchors = [
  { key: "about", href: "#about", index: "01" },
  { key: "projects", href: "#projects", index: "02" },
  { key: "contact", href: "#contact", index: "03" },
];

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [time, setTime] = useState<string | null>(null);
  const alternativeTheme = useAlternativeTheme();

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleString("en-GB", {
          timeZone: "Europe/London",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.hero}>
      {alternativeTheme && <ChristmasTree />}

      <div className={styles.rail} aria-hidden="true">
        <span className={styles.railText}>Manchester — 53.48°N 2.24°W</span>
        <span className={styles.railLine} />
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.meta}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className={styles.metaItem}>{t("hero.role")}</span>
          <span className={styles.metaDivider} />
          <span className={styles.metaItem}>{t("hero.location")}</span>
          <span className={styles.metaTime}>{time ?? "--:--"} GMT</span>
        </motion.div>

        <motion.h1
          className={styles.name}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          Jacob
          <span className={styles.lastName}>
            Walton<span className={styles.period}>.</span>
          </span>
        </motion.h1>

        <motion.div
          className={styles.lede}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.seal} aria-hidden="true">
            JW
          </span>
          <p className={styles.subtitle}>{t("hero.subtitle")}</p>
        </motion.div>

        <motion.nav
          className={styles.anchors}
          aria-label="Sections"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
        >
          {anchors.map((anchor) => (
            <a key={anchor.key} href={anchor.href} className={styles.anchor}>
              <span className={styles.anchorIndex}>{anchor.index}</span>
              <span className={styles.anchorLabel}>{t(`nav.${anchor.key}`)}</span>
              <span className={styles.anchorArrow} aria-hidden="true">
                ↓
              </span>
            </a>
          ))}
        </motion.nav>
      </div>
    </section>
  );
};

export default Hero;
