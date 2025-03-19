import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/About.module.css';
import { useTranslation } from '../hooks/useTranslation';

const About: React.FC = () => {
    const { t } = useTranslation();
    
    return (
        <section id="about" className={styles.section}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2>{t('about.title')}</h2>
                <div className={styles.content}>
                    <p>{t('about.description')}</p>
                    <div className={styles.highlights}>
                        <div className={styles.highlight}>
                            <h3>{t('about.currentStudies.title')}</h3>
                            <div className={styles.courseList}>
                                <div className={styles.course}>
                                    <span className={styles.courseTitle}>{t('about.currentStudies.computerScience.title')}</span>
                                    <span className={styles.courseDetails}>{t('about.currentStudies.computerScience.details')}</span>
                                </div>
                                <div className={styles.course}>
                                    <span className={styles.courseTitle}>{t('about.currentStudies.mathematics.title')}</span>
                                    <span className={styles.courseDetails}>{t('about.currentStudies.mathematics.details')}</span>
                                </div>
                                <div className={styles.course}>
                                    <span className={styles.courseTitle}>{t('about.currentStudies.physics.title')}</span>
                                    <span className={styles.courseDetails}>{t('about.currentStudies.physics.details')}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.highlight}>
                            <h3>{t('about.technicalFocus.title')}</h3>
                            <div className={styles.techCategories}>
                                <div className={styles.techCategory}>
                                    <span className={styles.categoryTitle}>{t('about.technicalFocus.languages.title')}</span>
                                    <div className={styles.tags}>
                                        <span className={styles.tag}>TypeScript</span>
                                        <span className={styles.tag}>Go</span>
                                        <span className={styles.tag}>C#</span>
                                    </div>
                                </div>
                                <div className={styles.techCategory}>
                                    <span className={styles.categoryTitle}>{t('about.technicalFocus.backend.title')}</span>
                                    <div className={styles.tags}>
                                        <span className={styles.tag}>APIs</span>
                                        <span className={styles.tag}>PostgreSQL</span>
                                        <span className={styles.tag}>.NET</span>
                                    </div>
                                </div>
                                <div className={styles.techCategory}>
                                    <span className={styles.categoryTitle}>{t('about.technicalFocus.tools.title')}</span>
                                    <div className={styles.tags}>
                                        <span className={styles.tag}>Docker</span>
                                        <span className={styles.tag}>Git</span>
                                        <span className={styles.tag}>Azure</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
