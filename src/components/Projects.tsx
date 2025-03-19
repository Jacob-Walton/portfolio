import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Projects.module.css';
import { useTranslation } from '../hooks/useTranslation';
import type { ProjectStatus } from '../types/i18n';

interface Project {
    name: string;
    description: string;
    tech: string[];
    url: string;
    status: ProjectStatus;
}

const projects: Project[] = [
    {
        name: "Bus Info",
        description: "ASP.NET Core web application serving bus information to students of Runshaw College (unofficially).",
        tech: [".NET", "C#", "PostgreSQL", "Redis", "EntityFramework"],
        url: "https://github.com/Jacob-Walton/buses-info",
        status: "inDevelopment" 
    },
    {
        name: "Package Manager",
        description: "Simple CLI-based package manager written in Go",
        tech: ["Go", "CLI"],
        url: "https://github.com/Jacob-Walton/PackageManager",
        status: "complete"
    },
    {
        name: "Language LMC",
        description: "An implementation of the Little Man Computer assembly language",
        tech: ["TypeScript"],
        url: "https://github.com/Jacob-Walton/language-lmc",
        status: "functionallyComplete"
    }
];

const Projects: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section id="projects" className={styles.section}>
            <h2>{t('projects.title')}</h2>
            <div className={styles.grid}>
                {projects.map((project, index) => (
                    <motion.div
                        key={project.name}
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
