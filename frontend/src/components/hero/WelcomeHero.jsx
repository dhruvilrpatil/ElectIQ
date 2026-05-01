
import { motion } from 'framer-motion';
import styles from './WelcomeHero.module.css';

const SVG = {
  Box: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>,
  Clipboard: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>,
  MapPin: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
};

const CHIPS = [
  'How do I register as a voter?',
  'What is an EPIC card?',
  'How does EVM work?',
  'What is NOTA?',
  'Lok Sabha vs Rajya Sabha?',
  'What is Model Code of Conduct?',
  'Where is my polling booth?',
  'How are votes counted?',
  'What is VVPAT?',
  'What ID do I need to vote?',
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0, 0, 1] } },
};

function WelcomeHero({ onQuestionClick }) {
  return (
    <motion.section
      className={styles.hero}
      variants={container}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      aria-label="Welcome to ElectIQ India"
    >
      {/* Animated logo */}
      <motion.div className={styles.logoWrap} variants={item} aria-hidden="true">
        <div className={styles.logoCircle}>
          <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
            <circle cx="40" cy="40" r="40" fill="#FF6B35" opacity="0.15"/>
            <circle cx="40" cy="40" r="28" fill="white"/>
            <circle cx="40" cy="40" r="20" fill="#1A56DB" opacity="0.12"/>
            <circle cx="40" cy="40" r="7" fill="#1A56DB"/>
            {/* 24-spoke Ashoka Chakra */}
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * 360) / 24;
              const rad = (angle * Math.PI) / 180;
              return (
                <line key={i}
                  x1={40 + 9 * Math.cos(rad)} y1={40 + 9 * Math.sin(rad)}
                  x2={40 + 20 * Math.cos(rad)} y2={40 + 20 * Math.sin(rad)}
                  stroke="#1A56DB" strokeWidth="1.2" opacity="0.6"
                />
              );
            })}
          </svg>
        </div>
        <div className={styles.tricolourStrip} aria-hidden="true">
          <span style={{ background: '#FF6B35' }} />
          <span style={{ background: '#FFFFFF', borderTop:'1px solid #ddd', borderBottom:'1px solid #ddd' }} />
          <span style={{ background: '#138808' }} />
        </div>
      </motion.div>

      <motion.h1 className={styles.headline} variants={item}>
        Namaskar! Your AI Guide to <span className={styles.accent}>Indian Elections</span>
      </motion.h1>

      <motion.p className={styles.subhead} variants={item}>
        Ask anything about voter registration, EVMs, Lok Sabha, State elections, MCC, and more — powered by Election Commission of India data.
      </motion.p>

      {/* Feature cards */}
      <motion.div className={styles.cards} variants={item}>
        {[
          { icon: <SVG.Box />, title: 'EVM + VVPAT', desc: 'How India votes electronically with verified paper trail.' },
          { icon: <SVG.Clipboard />, title: 'Voter Registration', desc: 'Register at NVSP in minutes — EPIC card made easy.' },
          { icon: <SVG.MapPin />, title: 'All 543 Seats', desc: 'State-specific rules, deadlines, and polling info.' },
        ].map((c) => (
          <div key={c.title} className={styles.card}>
            <div className={styles.cardEmoji} aria-hidden="true">{c.icon}</div>
            <div className={styles.cardTitle}>{c.title}</div>
            <div className={styles.cardDesc}>{c.desc}</div>
          </div>
        ))}
      </motion.div>

      {/* Quick chips */}
      <motion.div className={styles.chipRow} variants={item}>
        <div className={styles.chipLabel}>Try asking:</div>
        <div className={styles.chips}>
          {CHIPS.map((q) => (
            <button
              key={q}
              type="button"
              className={styles.chip}
              onClick={() => onQuestionClick(q)}
              aria-label={`Ask: ${q}`}
            >
              {q}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}

export default WelcomeHero;
