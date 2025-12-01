import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/alt/Snowfall.module.css';

type SnowflakeType = 'soft' | 'crisp' | 'distant';

interface Snowflake {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  type: SnowflakeType;
  drift: number;
}

const Snowfall: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Fewer flakes on mobile
    const count = isMobile ? 25 : 50;
    
    const flakes: Snowflake[] = Array.from({ length: count }, (_, i) => {
      const rand = Math.random();
      let type: SnowflakeType;
      let size: number;
      
      if (isMobile) {
        type = 'distant';
        size = Math.random() * 3 + 2;
      } else if (rand < 0.55) {
        type = 'distant';
        size = Math.random() * 3 + 1;
      } else if (rand < 0.9) {
        type = 'soft';
        size = Math.random() * 4 + 2;
      } else {
        type = 'crisp';
        size = Math.random() * 5 + 4;
      }

      return {
        id: i,
        x: Math.random() * 100,
        size,
        duration: type === 'crisp' 
          ? Math.random() * 10 + 10 
          : type === 'soft' 
            ? Math.random() * 15 + 15 
            : Math.random() * 25 + 20,
        delay: Math.random() * 20,
        opacity: type === 'distant' ? 0.25 : type === 'soft' ? 0.5 : 0.75,
        type,
        drift: (Math.random() - 0.5) * (type === 'distant' ? 2 : 5),
      };
    });
    
    setSnowflakes(flakes);
  }, [isMobile]);

  return (
    <div className={styles.snowfall} aria-hidden="true">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className={`${styles.snowflake} ${styles[flake.type]}`}
          initial={{
            x: `${flake.x}vw`,
            y: '-2vh',
          }}
          animate={{
            y: '102vh',
            x: [
              `${flake.x}vw`,
              `${flake.x + flake.drift}vw`,
              `${flake.x + flake.drift * 0.5}vw`,
              `${flake.x + flake.drift * 1.2}vw`,
              `${flake.x + flake.drift * 0.3}vw`,
            ],
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: 'linear',
            x: {
              duration: flake.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.25, 0.5, 0.75, 1],
            },
          }}
          style={{
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default Snowfall;