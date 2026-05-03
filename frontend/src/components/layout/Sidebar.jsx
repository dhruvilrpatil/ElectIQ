import { NavLink } from 'react-router-dom';
import useUiStore from '../../store/uiStore.js';
import { useTranslation } from '../../hooks/useTranslation.js';

/**
 * Renders the main sidebar navigation menu.
 */
export default function Sidebar() {
  const sidebarExpanded = useUiStore((s) => s.sidebarExpanded);
  const setSidebarExpanded = useUiStore((s) => s.setSidebarExpanded);
  const { t } = useTranslation();

  return (
    <>
      <div className={`sidebar-overlay ${sidebarExpanded ? 'sidebar-overlay--visible' : ''}`} onClick={() => setSidebarExpanded(false)} aria-hidden="true" />
      <aside className={`sidebar ${sidebarExpanded ? 'sidebar--expanded' : ''}`} aria-label="Main navigation">
        <nav className="sidebar__nav">
          <NavLink to="/" end className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`} onClick={() => setSidebarExpanded(false)}>
            <span className="sidebar__icon" aria-hidden="true">💬</span>
            <span className="sidebar__label">{t('Chat Assistant')}</span>
          </NavLink>
          <NavLink to="/analysis" className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`} onClick={() => setSidebarExpanded(false)}>
            <span className="sidebar__icon" aria-hidden="true">📊</span>
            <span className="sidebar__label">{t('Seat Analysis')}</span>
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
