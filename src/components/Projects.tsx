import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import styles from '../styles/Projects.module.css';

const projects = [
  {
    key: 'nea',
    tech: 'Rust · SQL · Tauri',
    href: 'https://github.com/Jacob-Walton/Mono-DB',
  },
  {
    key: 'busesinfo',
    tech: 'C# · HTML · CSS · JavaScript',
    href: 'https://github.com/Jacob-Walton/buses-info',
  },
  {
    key: 'packagemanager',
    tech: 'Go · CLI',
    href: 'https://github.com/Jacob-Walton/packagemanager',
  },
];

const Projects: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className={`${styles.projects} section`}>
      <div className="container">
        <h2 className={styles.heading}>
          <span className={styles.headingIndex}>01</span>
          {t('projects.title')}
        </h2>

        <div className={styles.list}>
          {projects.map((project, index) => (
            <motion.a
              key={project.key}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.row}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.rowMain}>
                <h3 className={styles.title}>{t(`projects.items.${project.key}.title`)}</h3>
                <p className={styles.description}>
                  {t(`projects.items.${project.key}.description`)}
                </p>
                <span className={styles.tech}>{project.tech}</span>
              </div>
              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
