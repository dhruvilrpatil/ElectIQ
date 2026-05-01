import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ui/ThemeToggle';
import styles from './TopAppBar.module.css';

const NAV_ITEMS = [
  { path: '/', label: 'Home', exact: true },
  { path: '/timeline', label: 'Timeline' },
  { path: '/state-guide', label: 'State Guide' },
  { path: '/voting-methods', label: 'Voting Methods' },
  { path: '/learn', label: 'Learn' },
];

function TopAppBar({ onMenuClick }) {
  const location = useLocation();

  return (
    <header className={styles.bar} role="banner">
      <div className={styles.inner}>
        {/* Left: Logo */}
        <div className={styles.left}>
          <button
            className={styles.menuBtn}
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            id="menu-toggle-btn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="24" height="24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </button>

          <NavLink to="/" className={styles.brand} aria-label="ElectIQ Home">
            <svg viewBox="0 0 32 32" fill="none" width="32" height="32" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="var(--md-primary)"/>
              <rect x="8" y="18" width="16" height="9" rx="2" fill="white"/>
              <rect x="10" y="13" width="12" height="6" rx="1" fill="white" opacity="0.8"/>
              <rect x="12" y="8" width="8" height="6" rx="1" fill="white" opacity="0.6"/>
              <rect x="14" y="4" width="4" height="5" rx="1" fill="white" opacity="0.4"/>
              <rect x="11" y="20" width="2" height="5" rx="0.5" fill="var(--md-primary)"/>
              <rect x="15" y="20" width="2" height="5" rx="0.5" fill="var(--md-primary)"/>
              <rect x="19" y="20" width="2" height="5" rx="0.5" fill="var(--md-primary)"/>
            </svg>
            <span className={styles.wordmark}>ElectIQ</span>
          </NavLink>
        </div>

        {/* Center: Nav Tabs */}
        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    className={styles.indicator}
                    layoutId="nav-indicator"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className={styles.right}>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default TopAppBar;
