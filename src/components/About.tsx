import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import styles from '../styles/About.module.css';

const stacks = [
  { key: 'languages', items: 'TypeScript, JavaScript, Go, C#, Python, C' },
  { key: 'frontend', items: 'HTML, CSS, SCSS, React, Next.js, Flutter, Tauri' },
  { key: 'data_cloud', items: 'PostgreSQL, MongoDB, Redis, AWS, Azure, Heroku' },
  { key: 'tools', items: 'Docker, Git, GitHub, VS Code, Figma' },
];

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className={`${styles.about} section`}>
      <div className="container">
        <h2 className={styles.heading}>
          <span className={styles.headingIndex}>02</span>
          {t('about.title')}
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={styles.intro}>{t('about.intro')}</p>

          <dl className={styles.stacks}>
            {stacks.map((stack) => (
              <div key={stack.key} className={styles.stackRow}>
                <dt className={styles.stackLabel}>{t(`about.skills.${stack.key}`)}</dt>
                <dd className={styles.stackItems}>{stack.items}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
