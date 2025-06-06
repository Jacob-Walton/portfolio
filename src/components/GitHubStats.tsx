/**
 * GitHub Statistics Component
 * 
 * Displays real-time GitHub statistics including:
 * - Total number of public repositories
 * - Most used programming language
 * - Latest project information
 * 
 * @component
 */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/GitHubStats.module.css';
import { fetchGitHubStats, GitHubStats as GitHubStatsType } from '../utils/github';
import { useTranslation } from '../hooks/useTranslation';

interface StatItem {
    label: string;
    value: string | number;
    icon: string;
    subtitle?: string;
    link?: string;
}

const GitHubStats: React.FC = () => {
    const [stats, setStats] = useState<GitHubStatsType | null>(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        /**
         * Fetches GitHub statistics from the API
         * Handles loading state and data updates
         */
        const loadStats = async () => {
            const data = await fetchGitHubStats();
            setStats(data);
            setLoading(false);
        };
        loadStats();
    }, []);

    if (loading) {
        return (
            <div className={styles.statsGrid}>
                {[1, 2, 3].map(i => (
                    <motion.div
                        key={i}
                        className={styles.skeleton}
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                ))}
            </div>
        );
    }

    if (!stats) return null;

    const statItems: StatItem[] = [
        {
            label: t('githubStats.totalProjects'),
            value: stats.userData.public_repos,
            icon: "fa-solid fa-cube"
        },
        {
            label: t('githubStats.primaryLanguage'),
            value: stats.mostFrequentLanguage || "N/A",
            icon: "fa-solid fa-code"
        },
        {
            label: t('githubStats.latestProject'),
            value: stats.latestRepo?.name || "N/A",
            subtitle: stats.latestRepo?.date ? new Date(stats.latestRepo.date).toLocaleDateString() : "",
            icon: "fa-solid fa-rocket",
            link: stats.latestRepo?.link
        }
    ];

    return (
        <div className={styles.statsGrid}>
            {statItems.map((item, index) => (
                <motion.div
                    key={item.label}
                    className={styles.statCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => item.link && window.open(item.link, "_blank")}
                >
                    <div className={styles.statIcon}>
                        <i className={item.icon}></i>
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{item.value}</div>
                        <div className={styles.statLabel}>{item.label}</div>
                        {item.subtitle && (
                            <div className={styles.statSubtitle}>{item.subtitle}</div>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default GitHubStats;
