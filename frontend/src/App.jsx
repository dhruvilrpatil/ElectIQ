import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import TopAppBar from './components/layout/TopAppBar.jsx';
import Sidebar from './components/layout/Sidebar.jsx';
import useUiStore from './store/uiStore.js';

// Lazy load pages for performance
const ChatPage = lazy(() => import('./pages/ChatPage.jsx'));
const AnalysisPage = lazy(() => import('./pages/AnalysisPage.jsx'));

/**
 * Loading fallback for Suspense boundary.
 */
function PageLoader() {
  return (
    <div className="page-loader" aria-live="polite">
      <div className="spinner"></div>
      <span className="sr-only">Loading page...</span>
    </div>
  );
}

/**
 * Root component that sets up the layout, theme, and application routing.
 */
export default function App() {
  const theme = useUiStore((s) => s.theme);

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app-container">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <TopAppBar />
      <div className="app-body">
        <Sidebar />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}
