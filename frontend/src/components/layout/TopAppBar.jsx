import { NavLink } from 'react-router-dom';
import useUiStore from '../../store/uiStore.js';
import { useTranslation } from '../../hooks/useTranslation.js';
import { SUPPORTED_LANGUAGES } from '../../utils/constants.js';

/**
 * Renders the top application bar including the theme toggle and language selector.
 */
export default function TopAppBar() {
  const sidebarExpanded = useUiStore((s) => s.sidebarExpanded);
  const setSidebarExpanded = useUiStore((s) => s.setSidebarExpanded);
  const toggleTheme = useUiStore((s) => s.toggleTheme);
  const theme = useUiStore((s) => s.theme);
  const { setLanguage, selectedLanguage } = useTranslation();

  return (
    <header className="top-app-bar">
      <div className="top-app-bar__left">
        <button className="icon-button top-app-bar__menu" aria-label={sidebarExpanded ? 'Close menu' : 'Open menu'} aria-expanded={sidebarExpanded} onClick={() => setSidebarExpanded(!sidebarExpanded)}>
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>
        </button>
        <h1 className="top-app-bar__title">ElectIQ</h1>
      </div>
      <div className="top-app-bar__right">
        <div className="language-selector">
          <label htmlFor="language-select" className="sr-only">Select Language</label>
          <select id="language-select" value={selectedLanguage} onChange={(e) => setLanguage(e.target.value)} className="language-selector__select">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.nativeLabel}</option>
            ))}
          </select>
        </div>
        <button className="icon-button theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}
