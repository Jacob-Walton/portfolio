import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Projects.module.css';
import { useTranslation } from '../hooks/useTranslation';
import type { ProjectStatus } from '../types/i18n';

interface Project {
    id: string;
    name: string;
    description: string;
    tech: string[];
    url: string;
    status: ProjectStatus;
}

const Projects: React.FC = () => {
    const { t, locale } = useTranslation();
    
    // Get projects from translations
    const projects = t('projects.items') as Project[];

    return (
        <section id="projects" className={styles.section}>
            <h2>{t('projects.title')}</h2>
            <div className={styles.grid}>
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        className={styles.card}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                        <div className={styles.techStack}>
                            {project.tech.map(tech => (
                                <span key={tech} className={styles.tech}>{tech}</span>
                            ))}
                        </div>
                        <div className={styles.status}>
                            {t('common.status')}: {t(`projects.statuses.${project.status}`)}
                        </div>
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                            {t('projects.viewProject')} <i className="fas fa-external-link-alt"></i>
                        </a>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
