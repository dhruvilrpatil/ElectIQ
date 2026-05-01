import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useChatStore from '@/store/chatStore';

import { trackEvent } from '@/hooks/useAnalytics';
import styles from './Sidebar.module.css';

/* ─── Icons ─────────────────────────────────────────────────────────── */
const Icon = ({ d, size = 22 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width={size} height={size} aria-hidden="true">
    <path d={d} />
  </svg>
);

const Icons = {
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  map: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
  vote: "M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  book: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  settings: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 8v4M12 16h.01",
  chevron: "M9 18l6-6-6-6",
  users: "M12 3v2M9 5h6M7 8h10M4 21v-8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8M8 11v10M16 11v10",
  polling: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 7v6M9 10h6",
  globe: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10",
};

const NAV = [
  { path: '/', label: 'AI Assistant', icon: 'chat' },
  { path: '/assembly', label: 'Parliament', icon: 'users' },
  { path: '/timeline', label: 'Election Timeline', icon: 'calendar' },
  { path: '/state-guide', label: 'State Guide', icon: 'map' },
  { path: '/voting-methods', label: 'Voting Methods', icon: 'vote' },
  { path: '/polling-locator', label: 'Polling Locator', icon: 'polling' },
  { path: '/learn', label: 'Learn', icon: 'book' },
  { path: '/settings', label: 'Settings', icon: 'settings' },
];

import { LANGUAGE_OPTIONS } from '../../utils/constants';

/* Logo mark */
function Logo({ expanded }) {
  return (
    <div className={styles.logoArea}>
      <div className={styles.logoIcon} aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none" width="32" height="32" aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="var(--md-primary)" />
          <rect x="8" y="18" width="16" height="9" rx="2" fill="white" />
          <rect x="10" y="13" width="12" height="6" rx="1" fill="white" opacity="0.8" />
          <rect x="12" y="8" width="8" height="6" rx="1" fill="white" opacity="0.6" />
          <rect x="14" y="4" width="4" height="5" rx="1" fill="white" opacity="0.4" />
          <rect x="11" y="20" width="2" height="5" rx="0.5" fill="var(--md-primary)" />
          <rect x="15" y="20" width="2" height="5" rx="0.5" fill="var(--md-primary)" />
          <rect x="19" y="20" width="2" height="5" rx="0.5" fill="var(--md-primary)" />
        </svg>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            className={styles.logoText}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
          >
            <span className={styles.logoName}>ElectIQ</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Language selector dropdown — appears only when sidebar is expanded.
 */
function LanguageSelector({ expanded }) {
  const { selectedLanguage, setSelectedLanguage } = useChatStore();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = LANGUAGE_OPTIONS.find((l) => l.code === selectedLanguage) || LANGUAGE_OPTIONS[0];

  const handleSelect = (code) => {
    const prevLang = selectedLanguage;
    setSelectedLanguage(code);
    setIsOpen(false);

    // Activate Google Translate for the whole page
    if (typeof window.__electiqSetLang === 'function') {
      window.__electiqSetLang(code);
    }

    // Track language change for analytics
    trackEvent('language_changed', {
      from_lang: prevLang,
      to_lang: code,
    });
  };

  if (!expanded) {
    return (
      <div className={styles.langCollapsed} title={`Language: ${currentLang.native}`}>
        <Icon d={Icons.globe} size={20} />
      </div>
    );
  }

  return (
    <div className={styles.langSelector}>
      <button
        className={styles.langTrigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Selected language: ${currentLang.label}. Click to change.`}
        aria-expanded={isOpen}
        id="language-selector"
      >
        <span className={styles.langFlag}>{currentLang.flag}</span>
        <span className={styles.langLabel}>{currentLang.native}</span>
        <svg className={`${styles.langChevron} ${isOpen ? styles.langChevronOpen : ''}`}
          viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.langDropdown}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
          >
            {LANGUAGE_OPTIONS.map((lang) => (
              <button
                key={lang.code}
                className={`${styles.langOption} ${lang.code === selectedLanguage ? styles.langOptionActive : ''}`}
                onClick={() => handleSelect(lang.code)}
                aria-label={`Switch to ${lang.label}`}
              >
                <span>{lang.flag}</span>
                <span className={styles.langOptionNative}>{lang.native}</span>
                <span className={styles.langOptionLabel}>{lang.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Mobile bottom tab bar */
function MobileNav() {
  const location = useLocation();
  const mobileItems = NAV.slice(0, 5); // only main items
  return (
    <nav className={styles.mobileNav} aria-label="Mobile navigation">
      {mobileItems.map(item => {
        const isActive = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path);
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={`${styles.mobileTab} ${isActive ? styles.mobileTabActive : ''}`}
            aria-label={item.label}
            end={item.path === '/'}
          >
            <Icon d={Icons[item.icon]} size={22} />
            <span className={styles.mobileTabLabel}>{item.label.split(' ')[0]}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

/* Desktop Sidebar */
function DesktopSidebar({ expanded }) {
  const location = useLocation();
  return (
    <aside className={`${styles.sidebar} ${expanded ? styles.sidebarExpanded : ''}`}
      aria-label="App navigation">
      <Logo expanded={expanded} />

      <nav className={styles.nav}>
        {NAV.map((item) => {
          const isActive = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path);
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
              aria-label={item.label}
              end={item.path === '/'}
            >
              {isActive && (
                <motion.span
                  className={styles.activeBar}
                  layoutId="sidebar-active"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <span className={styles.linkIcon}>
                <Icon d={Icons[item.icon]} />
              </span>
              <AnimatePresence>
                {expanded && (
                  <motion.span
                    className={styles.linkLabel}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </nav>

      {/* Language Selector */}
      <LanguageSelector expanded={expanded} />

      <div className={styles.footer}>
        <AnimatePresence>
          {expanded && (
            <motion.span
              className={styles.footerText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              © ECI 2024
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}

/* Root: hover-expand logic on desktop, bottom-nav on mobile */
function Sidebar() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      {/* Desktop */}
      <div
        className={styles.sidebarWrapper}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <DesktopSidebar expanded={hovered} />
      </div>

      {/* Mobile */}
      <MobileNav />
    </>
  );
}

export default Sidebar;
