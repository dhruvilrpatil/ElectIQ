import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TypingIndicator.module.css';

const TEXTS = [
  "Evaluating Response",
  "Finding Answers",
  "Understanding Terminologies",
  "Framing Sentences",
  "Attaching Links"
];

function TypingIndicator() {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % TEXTS.length);
    }, 1800); // cycle every 1.8s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.wrapper} role="status" aria-label="ElectIQ is typing">
      <div className={styles.avatar} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
          <path d="M12 8V4H8" />
          <rect x="4" y="8" width="16" height="12" rx="2" ry="2" />
          <path d="M2 14h2" />
          <path d="M20 14h2" />
          <path d="M15 13v2" />
          <path d="M9 13v2" />
        </svg>
      </div>
      <motion.div layout className={styles.bubble} transition={{ duration: 0.3, ease: "easeOut" }}>
        <div className={styles.dots}>
          <span className={styles.dot} style={{ animationDelay: '0ms' }} />
          <span className={styles.dot} style={{ animationDelay: '150ms' }} />
          <span className={styles.dot} style={{ animationDelay: '300ms' }} />
        </div>
        <div className={styles.textContainer}>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={textIndex}
              layout
              className={styles.textLabel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.2 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
            >
              {TEXTS[textIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default TypingIndicator;
