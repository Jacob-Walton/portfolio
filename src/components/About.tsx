import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/About.module.css';
import { useTranslation } from '../hooks/useTranslation';
import TechStack from './TechStack';

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
                    <div className={styles.infoCard + ' ' + styles.introCard}>
                        <span className={styles.quoteMarkLeft}>&ldquo;</span>
                        <p>{t('about.description')}</p>
                        <span className={styles.quoteMarkRight}>&rdquo;</span>
                    </div>
                    
                    <div className={styles.mainContent}>
                        {/* Left side: Current Studies */}
                        <div className={styles.columnLeft}>
                            <div className={styles.infoCard}>
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
                        </div>
                        
                        {/* Right side: Tech Stack */}
                        <div className={styles.columnRight}>
                            <div className={styles.infoCard}>
                                <h3>{t('about.techStack.title')}</h3>
                                <TechStack />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
