import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import styles from '../styles/Projects.module.css';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string;
  github?: string;
  status: 'active' | 'complete' | 'archived';
}

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: '001',
      title: 'Buses Info',
      description: t('projects.items.busesinfo.description'),
      tech: 'C# · HTML · CSS · JavaScript',
      github: 'https://github.com/Jacob-Walton/buses-info',
      status: 'active'
    },
    {
      id: '002',
      title: 'Database Management System',
      description: t('projects.items.nea.description'),
      tech: 'Rust · SQL · Tauri',
      status: 'active'
    },
    {
      id: '003',
      title: 'PackageManager',
      description: t('projects.items.packagemanager.description'),
      tech: 'Go · CLI',
      github: 'https://github.com/Jacob-Walton/packagemanager',
      status: 'complete'
    }
  ];

  return (
    <section id="projects" className={`${styles.projects} section`}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.header}>
            <h2 className={styles.title}>{t('projects.title')}</h2>
            <div className={styles.count}>{projects.length.toString().padStart(2, '0')}</div>
          </div>

          <div className={styles.list}>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className={styles.project}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className={styles.projectHeader}>
                  <span className={styles.projectId}>{project.id}</span>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                </div>

                <motion.div
                  className={styles.projectDetails}
                  animate={{
                    height: hoveredProject === project.id ? 'auto' : 0,
                    opacity: hoveredProject === project.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <p className={styles.projectDescription}>{project.description}</p>
                  <div className={styles.projectMeta}>
                    <span className={styles.projectTech}>{project.tech}</span>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.projectLink}
                      >
                        View Source →
                      </a>
                    )}
                  </div>
                </motion.div>

                <div className={`${styles.projectStatus} ${styles[project.status]}`}>
                  {t(`projects.status.${project.status}`)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;