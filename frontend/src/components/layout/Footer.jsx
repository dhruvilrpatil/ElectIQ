import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.branding}>
            <svg viewBox="0 0 24 24" fill="none" width="20" height="20" stroke="currentColor" strokeWidth="2" aria-label="ElectIQ logo" role="img">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span style={{ fontWeight: 600, color: 'var(--md-primary)' }}>ElectIQ India</span>
          </div>

          <div className={styles.badges}>
            <span className={styles.badge}>WCAG 2.1 AA</span>
            <span className={styles.badge}>Material Design 3</span>
          </div>
        </div>

        <div className={styles.sitemap}>
          <h3 className={styles.sitemapTitle}>Site Map</h3>
          <div className={styles.sitemapGrid}>
            <Link to="/" className={styles.sitemapLink}>AI Assistant (Chat)</Link>
            <Link to="/assembly" className={styles.sitemapLink}>Parliament Composition</Link>
            <Link to="/timeline" className={styles.sitemapLink}>Election Timeline</Link>
            <Link to="/state-guide" className={styles.sitemapLink}>State Guide</Link>
            <Link to="/voting-methods" className={styles.sitemapLink}>Voting Methods</Link>
            <Link to="/learn" className={styles.sitemapLink}>Learn & Resources</Link>
            <Link to="/settings" className={styles.sitemapLink}>Settings</Link>
          </div>
        </div>

        <div className={styles.links}>
          <a href="#" onClick={(e) => e.preventDefault()} className={styles.link}>Privacy Policy</a>
          <span className={styles.sep} aria-hidden="true">·</span>
          <a href="#" onClick={(e) => e.preventDefault()} className={styles.link}>Terms of Service</a>
          <span className={styles.sep} aria-hidden="true">·</span>
          <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer" className={styles.link}>Accessibility Statement</a>
          <span className={styles.sep} aria-hidden="true">·</span>
          <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" className={styles.link}>Contact ECI</a>
        </div>

        <div id="google_translate_element" className={styles.translate} aria-label="Language selection" />

        <p className={styles.disclaimer}>
          ElectIQ India provides general election information for educational purposes. Always verify with the official Election Commission of India (ECI) at eci.gov.in. Information may vary — check official sources before Election Day.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
