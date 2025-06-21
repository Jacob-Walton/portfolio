import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import styles from '../styles/About.module.css';

import {
  SiTypescript,
  SiJavascript,
  SiGo,
  SiPython,
  SiC,
  SiHtml5,
  SiCss3,
  SiSass,
  SiNextdotjs,
  SiFlutter,
  SiTauri,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiGit,
  SiAmazonwebservices,
  SiHeroku,
  SiGithub,
  SiReact,
} from 'react-icons/si';
import { Icon } from '@iconify/react';

const About: React.FC = () => {
  const { t } = useTranslation();

  // Helper functions
  const ReactIcon = (name: string, icon: React.ComponentType<{size: number}>) => ({ name, icon, isComponent: false });
  const IconifyIcon = (name: string, icon: string) => ({ name, icon, isComponent: true });

  const skills = {
    languages: [
      ReactIcon('TypeScript', SiTypescript),
      ReactIcon('JavaScript', SiJavascript),
      ReactIcon('Go', SiGo),
      IconifyIcon('C#', 'devicon:csharp'),
      ReactIcon('Python', SiPython),
      ReactIcon('C', SiC)
    ],
    frontend: [
      ReactIcon('HTML5', SiHtml5),
      ReactIcon('CSS3', SiCss3),
      ReactIcon('SCSS', SiSass),
      ReactIcon('React', SiReact),
      ReactIcon('Next.js', SiNextdotjs),
      ReactIcon('Flutter', SiFlutter),
      ReactIcon('Tauri', SiTauri),
    ],
    'data & cloud': [
      ReactIcon('PostgreSQL', SiPostgresql),
      ReactIcon('MongoDB', SiMongodb),
      ReactIcon('Redis', SiRedis),
      ReactIcon('AWS', SiAmazonwebservices),
      IconifyIcon('Azure', 'devicon:azure'),
      ReactIcon('Heroku', SiHeroku)
    ],
    tools: [
      ReactIcon('Docker', SiDocker),
      ReactIcon('Git', SiGit),
      ReactIcon('GitHub', SiGithub),
      IconifyIcon('VS Code', 'devicon:vscode'),
      IconifyIcon('Figma', 'devicon:figma'),
    ]
  };

  return (
    <section id="about" className={`${styles.about} section`}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>{t('about.title')}</h2>
          
          <div className={styles.content}>
            <div className={styles.bio}>
              <p>
                {t('about.intro')}
              </p>
            </div>

            <div className={styles.skills}>
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className={styles.skillCategory}>
                  <h3 className={styles.categoryTitle}>
                    {t(`about.skills.${category.replace(' & ', '_').replace(' ', '_')}`)}
                  </h3>
                  <div className={styles.skillList}>
                    {items.map((skill) => (
                      <span key={skill.name} className={styles.skill}>
                        {skill.isComponent ? (
                          <Icon icon={skill.icon as string} width={14} height={14} />
                        ) : (
                          React.createElement(skill.icon as React.ComponentType<{size: number}>, { size: 14 })
                        )}
                        <span className={styles.skillName}>{skill.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;