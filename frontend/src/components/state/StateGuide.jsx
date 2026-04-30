import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { stateData, allStates } from '@/data/stateData';
import styles from './StateGuide.module.css';

const SVG = {
  Map: () => <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>,
  Building: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight:'4px', verticalAlign:'text-bottom'}}><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-4h6v4"/><path d="M9 11h6"/><path d="M9 15h6"/></svg>,
  Calendar: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight:'6px', verticalAlign:'text-bottom'}}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
};

function StatCard({ code, state }) {
  const calLink = `https://calendar.google.com/calendar/r/eventedit?text=Voter+Registration+Reminder+(${encodeURIComponent(state.name)})&sf=true`;
  const nsvpLink = `https://voters.eci.gov.in`;

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
      aria-label={`Election guide for ${state.name}`}
    >
      {/* Header */}
      <div className={styles.cardHeader}>
        <div>
          <h2 className={styles.stateName}>{state.name}</h2>
          <span className={styles.capital}><SVG.Building />Capital: {state.capital}</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.verifiedBadge}>✓ ECI Verified</span>
          <span className={styles.turnoutBadge}>2024 Turnout: {state.turnout2024}</span>
        </div>
      </div>

      {/* Stats row */}
      <div className={styles.statsRow}>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{state.lsSeats}</div>
          <div className={styles.statLabel}>Lok Sabha Seats</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{state.assemblySeats}</div>
          <div className={styles.statLabel}>Assembly Seats</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{state.scSeats}</div>
          <div className={styles.statLabel}>SC Reserved</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{state.stSeats}</div>
          <div className={styles.statLabel}>ST Reserved</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{state.registered}</div>
          <div className={styles.statLabel}>Registered Voters</div>
        </div>
      </div>

      {/* Info grid */}
      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <div className={styles.infoLabel}>Voter ID Requirement</div>
          <div className={styles.infoValue}>{state.voterIdLabel}</div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.infoLabel}>Registration Deadline</div>
          <div className={styles.infoValue}>{state.registrationDeadline}</div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.infoLabel}>Postal Ballot</div>
          <div className={styles.infoValue}>
            {state.postalBallot ? `✓ ${state.postalBallotLabel}` : '✗ Not available'}
          </div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.infoLabel}>Polling Hours</div>
          <div className={styles.infoValue}>{state.pollingHours}</div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.infoLabel}>Last Assembly Election</div>
          <div className={styles.infoValue}>{state.lastElection}</div>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.cardActions}>
        <a href={state.officialSite} target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
          Official CEO Website ↗
        </a>
        <a href={nsvpLink} target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
          Register / Check Roll (NVSP)
        </a>
        <a href={calLink} target="_blank" rel="noopener noreferrer" className={styles.tertiaryBtn}>
          <SVG.Calendar /> Set Reminder
        </a>
      </div>
    </motion.article>
  );
}

export default function StateGuide() {
  const [selected, setSelected] = useState('');
  const state = stateData[selected];

  return (
    <section className={styles.page} aria-label="Indian State Election Guide">
      <header className={styles.header}>
        <h1 className={styles.heading}>State Election Guide</h1>
        <p className={styles.sub}>
          Select your state to see Lok Sabha seats, assembly info, voter registration, polling hours, and official links.
        </p>
      </header>

      <div className={styles.selectWrapper}>
        <label htmlFor="state-select" className={styles.selectLabel}>Select your state / UT</label>
        <select
          id="state-select"
          className={styles.select}
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          aria-label="Choose state"
        >
          <option value="">— Select a state —</option>
          {allStates.map((s) => (
            <option key={s.code} value={s.code}>{s.name}</option>
          ))}
        </select>
      </div>

      <AnimatePresence mode="wait">
        {selected && state ? (
          <StatCard key={selected} code={selected} state={state} />
        ) : selected && !state ? (
          <motion.div
            key="placeholder"
            className={styles.placeholder}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className={styles.placeholderIcon}><SVG.Map /></div>
            <h3>Data for {allStates.find(s => s.code === selected)?.name} is being compiled</h3>
            <p>Visit the official sources for now:</p>
            <div className={styles.placeholderLinks}>
              <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>NVSP Voter Portal</a>
              <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>ECI Official Site</a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
