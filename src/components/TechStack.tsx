import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/TechStack.module.css';
import { useTranslation } from '../hooks/useTranslation';

interface TechCategory {
  name: string;
  techs: Tech[];
}

interface Tech {
  name: string;
  icon: string;
}

const TechStack: React.FC = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>('languages');
  const tabsRef = useRef<HTMLDivElement>(null);
  
  // Scroll active tab into view on mobile
  useEffect(() => {
    if (tabsRef.current && window.innerWidth <= 480) {
      const activeTab = tabsRef.current.querySelector(`.${styles.active}`);
      if (activeTab) {
        const container = tabsRef.current;
        const tabRect = activeTab.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Calculate scroll position to center the active tab
        const scrollLeft = activeTab.scrollLeft + (tabRect.left - containerRect.left) - 
                           (containerRect.width / 2) + (tabRect.width / 2);
                           
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeCategory]);

  const categories: TechCategory[] = [
    {
      name: 'languages',
      techs: [
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'JavaScript', icon: 'javascript' },
        { name: 'Go', icon: 'go' },
        { name: 'C#', icon: 'csharp' },
        { name: 'Python', icon: 'python' },
        { name: 'C++', icon: 'cplusplus' },
        { name: 'C', icon: 'c' },
        { name: 'Dart', icon: 'dart' },
      ]
    },
    {
      name: 'frontend',
      techs: [
        { name: 'HTML5', icon: 'html5' },
        { name: 'CSS3', icon: 'css3' },
        { name: 'SCSS', icon: 'sass' },
        { name: 'Next.js', icon: 'nextjs' },
        { name: 'Flutter', icon: 'flutter' },
      ]
    },
    {
      name: 'backend',
      techs: [
        { name: '.NET', icon: 'dot-net' },
        { name: 'Node.js', icon: 'nodejs' },
      ]
    },
    {
      name: 'databases',
      techs: [
        { name: 'PostgreSQL', icon: 'postgresql' },
        { name: 'MongoDB', icon: 'mongodb' },
        { name: 'Redis', icon: 'redis' },
      ]
    },
    {
      name: 'devops',
      techs: [
        { name: 'Docker', icon: 'docker' },
        { name: 'Git', icon: 'git' },
        { name: 'AWS', icon: 'amazonwebservices' },
        { name: 'Azure', icon: 'azure' },
        { name: 'Heroku', icon: 'heroku' },
      ]
    },
    {
      name: 'tools',
      techs: [
        { name: 'VS Code', icon: 'vscode' },
        { name: 'Visual Studio', icon: 'visualstudio' },
        { name: 'GitHub', icon: 'github' },
      ]
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.categoryTabs} ref={tabsRef}>
        {categories.map((category) => (
          <button
            key={category.name}
            className={`${styles.categoryTab} ${activeCategory === category.name ? styles.active : ''}`}
            onClick={() => setActiveCategory(category.name)}
          >
            {String(t(`about.techStack.categories.${category.name}`))}
          </button>
        ))}
      </div>

      <motion.div 
        className={styles.techIcons}
        key={activeCategory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {categories.find(c => c.name === activeCategory)?.techs.map((tech) => (
          <motion.div 
            key={tech.name} 
            className={styles.techItem}
            whileHover={{ scale: 1.05, y: -3 }}
          >
            <i className={`devicon-${tech.icon}-plain colored`}></i>
            <span className={styles.techName}>{tech.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechStack;
