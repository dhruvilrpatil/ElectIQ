import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import timelineData from '@/data/timelineData';
import styles from './ElectionTimeline.module.css';

function buildCalendarLink(title, dateStr) {
  const params = new URLSearchParams({ text: title, dates: `${dateStr}/${dateStr}`, sf: 'true' });
  return `https://calendar.google.com/calendar/r/eventedit?${params}`;
}

const STATUS_COLORS = { completed: 'var(--md-primary)', active: 'var(--md-tertiary)', upcoming: 'var(--md-outline)' };

function TimelineCard({ item }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`${styles.card} ${styles[item.status]}`}>
      <div className={styles.statusPill} style={{ background: STATUS_COLORS[item.status] + '22', color: STATUS_COLORS[item.status] }}>
        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
      </div>
      <div className={styles.date}>{item.dateRange}</div>
      <div className={styles.title}>{item.title}</div>
      <p className={styles.desc}>{item.description}</p>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={styles.details}
          >
            <p>{item.details}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.actions}>
        <button className={styles.expandBtn} onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
          {expanded ? 'Show less ↑' : 'Learn more ↓'}
        </button>
        <a
          href={buildCalendarLink(item.calendarTitle, item.calendarDate)}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.calBtn}
          aria-label={`Add ${item.title} to Google Calendar`}
        >
          <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" width="14" height="14">
            <rect x="2" y="3" width="14" height="13" rx="2"/>
            <line x1="6" y1="1" x2="6" y2="5"/><line x1="12" y1="1" x2="12" y2="5"/>
            <line x1="2" y1="8" x2="16" y2="8"/>
          </svg>
          Add to Calendar
        </a>
      </div>
    </div>
  );
}

function ElectionTimeline() {
  const completed = timelineData.filter(i => i.status === 'completed').length;
  const progress = Math.round((completed / timelineData.length) * 100);

  return (
    <section className={styles.page} aria-label="Election Timeline">
      <header className={styles.header}>
        <h1 className={styles.heading}>2024 Election Timeline</h1>
        <p className={styles.sub}>Track every key milestone from filing deadlines to Inauguration Day.</p>
        <div className={styles.progressBar} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={`${progress}% of milestones completed`}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          <span className={styles.progressLabel}>{progress}% Complete</span>
        </div>
      </header>

      <div className={styles.timeline} role="list">
        {timelineData.map((item, idx) => (
          <div key={item.id} className={styles.milestone} role="listitem">
            <div className={styles.node} style={{ background: STATUS_COLORS[item.status] }}>
              {item.status === 'active' && <span className={styles.pulse} />}
              <span className={styles.nodeNum}>{idx + 1}</span>
            </div>
            <div className={`${styles.connector} ${item.status === 'completed' ? styles.done : ''}`} />
            <TimelineCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ElectionTimeline;
