import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import styles from '../styles/Projects.module.css';

interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  tech: string[];
  github?: string;
  status: 'active' | 'complete' | 'archived';
}

const projects: Project[] = [
  {
    id: '01',
    titleKey: 'projects.items.nea.title',
    descriptionKey: 'projects.items.nea.description',
    tech: ['Rust', 'SQL', 'Tauri'],
    github: 'https://github.com/Jacob-Walton/Mono-DB',
    status: 'active',
  },
  {
    id: '02',
    titleKey: 'projects.items.busesinfo.title',
    descriptionKey: 'projects.items.busesinfo.description',
    tech: ['C#', 'HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/Jacob-Walton/buses-info',
    status: 'active',
  },
  {
    id: '03',
    titleKey: 'projects.items.packagemanager.title',
    descriptionKey: 'projects.items.packagemanager.description',
    tech: ['Go', 'CLI'],
    github: 'https://github.com/Jacob-Walton/packagemanager',
    status: 'complete',
  },
];

const Projects: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className={`${styles.projects} section`}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.indexNumber}>02</span>
          <h2 className={styles.title}>{t('projects.title')}</h2>
          <span className={styles.count}>
            {projects.length.toString().padStart(2, '0')}
          </span>
        </motion.div>

        <div className={styles.list}>
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className={styles.project}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className={styles.projectId} aria-hidden="true">
                {project.id}
              </span>

              <div className={styles.projectBody}>
                <div className={styles.projectHeader}>
                  <h3 className={styles.projectTitle}>{t(project.titleKey)}</h3>
                  <span className={`${styles.status} ${styles[project.status]}`}>
                    <span className={styles.statusDot} aria-hidden="true" />
                    {t(`projects.status.${project.status}`)}
                  </span>
                </div>

                <p className={styles.projectDescription}>{t(project.descriptionKey)}</p>

                <div className={styles.projectFooter}>
                  <ul className={styles.tech}>
                    {project.tech.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      {t('projects.viewCode')}
                      <span aria-hidden="true"> ↗</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
