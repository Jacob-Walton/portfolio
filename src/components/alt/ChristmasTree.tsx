// Credit: Adapted from https://codepen.io/BlackStar1991/pen/xbKXEdQ

import React, { useEffect, useState, useCallback } from 'react';
import styles from '@/styles/alt/ChristmasTree.module.css';

interface TreeRow {
  chars: string[];
  glowIndices: Set<number>;
}

const ChristmasTree: React.FC = () => {
  const treeLengths = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21];
  const trunkLengths = [3, 3];
  
  const generateRow = useCallback((length: number, glowProbability = 0.15): TreeRow => {
    const chars = Array.from({ length }, () => Math.random() < 0.5 ? '0' : '1');
    const glowIndices = new Set<number>();
    
    chars.forEach((_, i) => {
      if (Math.random() < glowProbability) {
        glowIndices.add(i);
      }
    });
    
    return { chars, glowIndices };
  }, []);

  const [treeRows, setTreeRows] = useState<TreeRow[]>(() => 
    treeLengths.map(len => generateRow(len))
  );
  
  const [trunkRows, setTrunkRows] = useState<TreeRow[]>(() => 
    trunkLengths.map(len => generateRow(len, 0))
  );

  // Animate the tree
  useEffect(() => {
    const interval = setInterval(() => {
      setTreeRows(prev => prev.map((row, i) => {
        // Randomly decide whether to update this row
        if (Math.random() > 0.3) return row;
        
        const newChars = row.chars.map(char => 
          Math.random() < 0.1 ? (char === '0' ? '1' : '0') : char
        );
        
        const newGlowIndices = new Set<number>();
        newChars.forEach((_, idx) => {
          if (Math.random() < 0.12) {
            newGlowIndices.add(idx);
          }
        });
        
        return { chars: newChars, glowIndices: newGlowIndices };
      }));
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container} aria-hidden="true">
      {/* Star topper */}
      <div className={styles.star}>✦</div>
      
      {/* Tree body */}
      <div className={styles.tree}>
        {treeRows.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.chars.map((char, charIndex) => (
              <span
                key={charIndex}
                className={`${styles.char} ${row.glowIndices.has(charIndex) ? styles.glow : ''}`}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>
      
      {/* Trunk */}
      <div className={styles.trunk}>
        {trunkRows.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.chars.map((char, charIndex) => (
              <span key={charIndex} className={styles.trunkChar}>
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChristmasTree;