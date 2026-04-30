import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useTheme from '@/hooks/useTheme';
import styles from './SettingsPage.module.css';

const SVG = {
  Gear: () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
  Palette: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px', verticalAlign: 'text-bottom' }}><circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>,
  Moon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>,
  Sun: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>,
  Bell: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px', verticalAlign: 'text-bottom' }}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
  Info: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px', verticalAlign: 'text-bottom' }}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
};

function Section({ title, children }) {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange, label, id }) {
  return (
    <label className={styles.toggleLabel} htmlFor={id}>
      <span>{label}</span>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        className={`${styles.toggle} ${checked ? styles.toggleOn : ''}`}
        onClick={() => onChange(!checked)}
      >
        <motion.span
          className={styles.toggleThumb}
          animate={{ x: checked ? 22 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
    </label>
  );
}

function SettingsPage() {
  const { isDark, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(() => localStorage.getItem('electiq-notif') !== 'false');
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerIcon} aria-hidden="true"><SVG.Gear /></div>
        <div>
          <h1 className={styles.heading}>Settings</h1>
          <p className={styles.sub}>Personalise your ElectIQ India experience</p>
        </div>
      </header>

      {/* ─── Appearance ─── */}
      <Section title={<><SVG.Palette />Appearance</>}>
        <div className={styles.card}>
          <div className={styles.rowLabel}>Theme Mode</div>
          <div className={styles.themeRow}>
            {['Light', 'Dark'].map((mode) => (
              <button
                key={mode}
                type="button"
                className={`${styles.themeBtn} ${(mode === 'Dark') === isDark ? styles.themeBtnActive : ''
                  }`}
                onClick={() => setTheme(mode === 'Dark' ? 'dark' : 'light')}
                aria-pressed={(mode === 'Dark') === isDark}
              >
                <span aria-hidden="true">{mode === 'Dark' ? <SVG.Moon /> : <SVG.Sun />}</span>
                <span>{mode}</span>
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── Notifications / Preferences ─── */}
      <Section title={<><SVG.Bell />Preferences</>}>
        <div className={styles.card}>
          <Toggle
            id="notif-toggle"
            label="Election deadline reminders"
            checked={notifications}
            onChange={(v) => { setNotifications(v); localStorage.setItem('electiq-notif', v); }}
          />
        </div>
      </Section>

      {/* ─── About ─── */}
      <Section title={<><SVG.Info />About</>}>
        <div className={styles.card}>
          <div className={styles.aboutRow}><span>Version</span><strong>1.0.0</strong></div>
          <div className={styles.aboutRow}><span>Data Source</span><a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" className={styles.aboutLink}>Election Commission of India</a></div>
          <div className={styles.aboutRow}><span>Last Updated</span><strong>General Election 2024</strong></div>
          <div className={styles.aboutRow}><span>Disclaimer</span><span style={{ fontSize: '12px', color: 'var(--md-on-surface-variant)' }}>For educational purposes only. Always verify with ECI official sources.</span></div>
        </div>
      </Section>

      <button type="button" className={styles.saveBtn} onClick={handleSave} aria-live="polite">
        {saved ? '✓ Saved!' : 'Save Settings'}
      </button>
    </div>
  );
}

export default SettingsPage;
