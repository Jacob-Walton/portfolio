import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from '../styles/Landing.module.css';
import About from './About';
import Projects from './Projects';
import { smoothScroll } from '../utils/smoothScroll';
import GitHubStats from './GitHubStats';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';
import Footer from './Footer';

const devIconSets = [
    ["html5", "css3", "javascript", "typescript", "react", "angular", "vuejs", "nodejs", "express", "nestjs", "sass", "webpack", "gulp", "npm", "yarn", "babel", "bootstrap", "tailwindcss", "jquery", "materialui"],
    ["php", "laravel", "symfony", "codeigniter", "ruby", "rails", "python", "django", "flask", "java", "spring", "dotnetcore", "csharp", "go", "rust", "scala", "kotlin", "swift", "dart", "elixir"],
    ["postgresql", "mysql", "mongodb", "redis", "oracle", "microsoftsqlserver", "sqlite", "mariadb", "couchdb", "cassandra", "elasticsearch", "neo4j", "graphql", "influxdb"],
    ["docker", "kubernetes", "jenkins", "ansible", "terraform", "vagrant", "prometheus", "grafana", "nginx", "apache", "consul", "rancher", "git", "github", "gitlab", "bitbucket"],
    ["amazonwebservices", "googlecloud", "azure", "heroku", "digitalocean", "firebase", "cloudflare", "openstack", "vercel", "netlify", "linux", "ubuntu", "debian", "centos", "fedora", "redhat"],
    ["vscode", "intellij", "phpstorm", "pycharm", "webstorm", "atom", "vim", "bash", "powershell", "jira", "trello", "confluence", "slack", "visualstudio"],
    ["photoshop", "illustrator", "xd", "figma", "sketch", "inkscape", "gimp", "blender", "unity", "unrealengine", "aftereffects"],
    ["chrome", "firefox", "safari", "opera", "androidstudio", "xcode", "eclipse"],
    ["wordpress", "drupal", "magento", "woocommerce", "ghost", "jekyll", "hugo", "gatsby", "nuxtjs", "nextjs", "eleventy"],
    ["jquery", "d3js", "threejs", "electron", "ionic", "xamarin", "flutter"],
    ["cplusplus", "c", "objectivec", "perl", "haskell", "r", "matlab", "fortran", "erlang", "clojure", "fsharp", "ocaml", "julia", "lua"],
    ["raspberrypi", "arduino"]
];

const LandingPage: React.FC = () => {
    const prefersReducedMotion = useReducedMotion();
    const { t } = useTranslation();

    const fadeInUp = {
        initial: {
            opacity: 0,
            y: prefersReducedMotion ? 0 : 20,
            transition: { duration: 0.5 }
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const stagger = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <>
            <div className={styles.container}>
                <LanguageSwitcher />
                <div className={styles.backgroundAnimation}>
                    {devIconSets.map((iconSet, rowIndex) => (
                        <div
                            key={rowIndex}
                            className={styles.iconRow}
                            style={{
                                animationDuration: `${120 + rowIndex * 15}s`,
                                animationDirection: rowIndex % 2 === 0 ? 'normal' : 'reverse',
                                top: `${(rowIndex * 10)}%`
                            }}
                        >
                            {[...iconSet, ...iconSet].map((icon, iconIndex) => (
                                <i
                                    key={`${rowIndex}-${iconIndex}`}
                                    className={`devicon-${icon}-plain colored ${styles.icon}`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <motion.div
                    className={styles.content}
                    initial="initial"
                    animate="animate"
                    variants={stagger}
                >
                    <motion.h1 variants={fadeInUp}>
                        {t<string>('landing.title')}
                    </motion.h1>
                    <motion.p
                        className={styles.subtitle}
                        variants={fadeInUp}
                    >
                        {t<string>('landing.subtitle')}
                    </motion.p>
                    <motion.div
                        className={styles.buttonContainer}
                        variants={fadeInUp}
                    >
                        <motion.a
                            href="https://github.com/Jacob-Walton"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.githubButton}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <i className="devicon-github-original"></i>
                            {String(t('landing.githubButton'))}
                        </motion.a>
                        <motion.a
                            href="https://www.linkedin.com/in/jacob-walton-588764362"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.linkedinButton}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <i className="fab fa-linkedin"></i>
                            LinkedIn
                        </motion.a>
                        <motion.button
                            onClick={() => smoothScroll('about')}
                            className={styles.primaryButton}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {String(t('common.viewWork'))}
                        </motion.button>
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                        <GitHubStats />
                    </motion.div>
                </motion.div>
            </div>
            <About />
            <Projects />
            <Footer />
        </>
    );
};

export default LandingPage;
