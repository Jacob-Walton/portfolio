import { useState, useEffect } from 'react';

export const useAlternativeTheme = () => {
    const [isAlternativeTime, setIsAlternativeTime] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const checkTime = () => {
            const now = new Date();
            const month = now.getMonth();
            const day = now.getDate();

            // Active from December 1st to December 26th
            const isDecember = month === 11;
            const isBefore27th = day <= 26;

            setIsAlternativeTime(isDecember && isBefore27th);
        };

        checkTime();

        // Check again at midnight in case the date changes
        const now = new Date();
        const msUntilMidnight =
            new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();

        const midnightTimeout = setTimeout(() => {
            checkTime();
        }, msUntilMidnight);

        return () => {
            clearTimeout(midnightTimeout);
        };
    }, []);

    // Prevent hydration mismatch
    if (!mounted) {
        return false;
    }

    return isAlternativeTime;
}