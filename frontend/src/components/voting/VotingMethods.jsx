import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import votingMethodsData from '@/data/votingMethodsData';
import styles from './VotingMethods.module.css';

function AccordionItem({ method }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.accordion}>
      <button
        className={styles.accordionTrigger}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`panel-${method.id}`}
        id={`trigger-${method.id}`}
      >
        <span className={styles.accordionTitle}>{method.method}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className={styles.chevron} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`panel-${method.id}`}
            role="region"
            aria-labelledby={`trigger-${method.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className={styles.accordionBody}>
              <ol className={styles.steps}>
                {method.steps.map((s) => (
                  <li key={s.num} className={styles.step}>
                    <div className={styles.stepNum}>{s.num}</div>
                    <div>
                      <div className={styles.stepTitle}>{s.title}</div>
                      <div className={styles.stepDetail}>{s.detail}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function VotingMethods() {
  return (
    <section className={styles.page} aria-label="Voting Methods Guide">
      <header className={styles.header}>
        <h1 className={styles.heading}>How to Vote</h1>
        <p className={styles.sub}>Compare voting methods and follow step-by-step instructions for each.</p>
      </header>

      {/* Comparison Table */}
      <div className={styles.tableWrapper} role="region" aria-label="Voting methods comparison table" tabIndex={0}>
        <table className={styles.table}>
          <thead>
            <tr>
              {['Method', 'When Available', 'How to Request', 'Key Deadline', 'Best For', 'Availability'].map((h) => (
                <th key={h} scope="col">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {votingMethodsData.map((m, i) => (
              <tr key={m.id} className={i % 2 === 1 ? styles.altRow : ''}>
                <td className={styles.methodCell}>{m.method}</td>
                <td>{m.when}</td>
                <td>{m.howToRequest}</td>
                <td>{m.keyDeadline}</td>
                <td>{m.bestFor}</td>
                <td>{m.availability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Step-by-step accordions */}
      <div className={styles.accordionsSection} aria-label="Step-by-step voting guides">
        <h2 className={styles.accordionsHeading}>Step-by-Step Guides</h2>
        <div className={styles.accordions}>
          {votingMethodsData.map((m) => <AccordionItem key={m.id} method={m} />)}
        </div>
      </div>
    </section>
  );
}

export default VotingMethods;
