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

type Skill =
  | { name: string; icon: React.ComponentType<{ size: number }>; isComponent: false }
  | { name: string; icon: string; isComponent: true };

const ReactIcon = (name: string, icon: React.ComponentType<{ size: number }>): Skill => ({
  name,
  icon,
  isComponent: false,
});
const IconifyIcon = (name: string, icon: string): Skill => ({ name, icon, isComponent: true });

const skills: Record<string, Skill[]> = {
  languages: [
    ReactIcon('TypeScript', SiTypescript),
    ReactIcon('JavaScript', SiJavascript),
    ReactIcon('Go', SiGo),
    IconifyIcon('C#', 'devicon:csharp'),
    ReactIcon('Python', SiPython),
    ReactIcon('C', SiC),
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
  data_cloud: [
    ReactIcon('PostgreSQL', SiPostgresql),
    ReactIcon('MongoDB', SiMongodb),
    ReactIcon('Redis', SiRedis),
    ReactIcon('AWS', SiAmazonwebservices),
    IconifyIcon('Azure', 'devicon:azure'),
    ReactIcon('Heroku', SiHeroku),
  ],
  tools: [
    ReactIcon('Docker', SiDocker),
    ReactIcon('Git', SiGit),
    ReactIcon('GitHub', SiGithub),
    IconifyIcon('VS Code', 'devicon:vscode'),
    IconifyIcon('Figma', 'devicon:figma'),
  ],
};

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className={`${styles.about} section`}>
      <div className="container">
        <motion.div
          className={styles.grid}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.index}>
            <span className={styles.indexNumber}>01</span>
            <h2 className={styles.title}>{t('about.title')}</h2>
          </div>

          <div className={styles.body}>
            <p className={styles.lede}>{t('about.lede')}</p>
            <p className={styles.intro}>{t('about.intro')}</p>

            <div className={styles.skills}>
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className={styles.skillCategory}>
                  <h3 className={styles.categoryTitle}>{t(`about.skills.${category}`)}</h3>
                  <ul className={styles.skillList}>
                    {items.map((skill) => (
                      <li key={skill.name} className={styles.skill}>
                        {skill.isComponent ? (
                          <Icon icon={skill.icon} width={14} height={14} />
                        ) : (
                          React.createElement(skill.icon, { size: 14 })
                        )}
                        <span>{skill.name}</span>
                      </li>
                    ))}
                  </ul>
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
