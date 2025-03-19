import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/LanguageSwitcher.module.css';

const LanguageSwitcher: React.FC = () => {
    const router = useRouter();
    const [isHidden, setIsHidden] = useState(false);
    let lastScroll = 0;

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setIsHidden(currentScroll > lastScroll && currentScroll > 100);
            lastScroll = currentScroll;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const switchLanguage = (locale: string) => {
        router.push(router.pathname, router.asPath, { locale });
    };

    return (
        <div className={`${styles.switcher} ${isHidden ? styles.hidden : ''}`}>
            <button
                onClick={() => switchLanguage('en')}
                className={router.locale === 'en' ? styles.active : ''}
            >
                EN
            </button>
            <span>|</span>
            <button
                onClick={() => switchLanguage('ja')}
                className={router.locale === 'ja' ? styles.active : ''}
            >
                日本語
            </button>
        </div>
    );
};

export default LanguageSwitcher;
