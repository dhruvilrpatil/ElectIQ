import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import Skeleton from '@/components/ui/Skeleton';
import { useAnalytics } from '@/hooks/useAnalytics';

const ChatInterface    = lazy(() => import('@/components/chat/ChatInterface'));
const AssemblySeats    = lazy(() => import('@/components/assembly/AssemblySeats'));
const ElectionTimeline = lazy(() => import('@/components/timeline/ElectionTimeline'));
const StateGuide       = lazy(() => import('@/components/state/StateGuide'));
const VotingMethods    = lazy(() => import('@/components/voting/VotingMethods'));
const LearnPage        = lazy(() => import('@/components/learn/LearnPage'));
const SettingsPage     = lazy(() => import('@/components/settings/SettingsPage'));
const PollingLocator   = lazy(() => import('@/components/polling/PollingLocator'));

function PageSkeleton() {
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Skeleton height={40} variant="rectangular" />
      <Skeleton height={20} variant="text" width="50%" />
      <Skeleton height={220} variant="rectangular" />
      <Skeleton height={140} variant="rectangular" />
    </div>
  );
}

const variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.2, 0, 0, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.18 } },
};

function Page({ children }) {
  return (
    <motion.div variants={variants} initial="initial" animate="animate" exit="exit"
      style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  // Initialize GA4 analytics — auto-tracks page_view on route change
  useAnalytics();

  useEffect(() => {
    const titles = {
      '/':                'ElectIQ India — AI Assistant',
      '/assembly':        'ElectIQ India — Parliament Composition',
      '/timeline':        'ElectIQ India — Election Timeline',
      '/state-guide':     'ElectIQ India — State Guide',
      '/voting-methods':  'ElectIQ India — Voting Methods',
      '/learn':           'ElectIQ India — Learn',
      '/settings':        'ElectIQ India — Settings',
      '/polling-locator': 'ElectIQ India — Polling Locator',
    };
    document.title = titles[location.pathname] ?? 'ElectIQ India';
  }, [location.pathname]);

  return (
    <div className="app-layout">
      {/* Accessibility: Skip to Content */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Sidebar — hover-expands on desktop, bottom-tab on mobile */}
      <div className="app-sidebar-area">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="app-main" id="main-content" tabIndex={-1}>
        <AnimatePresence mode="wait">
          <Suspense fallback={<PageSkeleton />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Page><ChatInterface /></Page>} />
              <Route path="/assembly" element={<Page><div className="app-main-content"><div className="page-inner"><AssemblySeats /></div><Footer /></div></Page>} />
              <Route path="/timeline" element={<Page><div className="app-main-content"><div className="page-inner"><ElectionTimeline /></div><Footer /></div></Page>} />
              <Route path="/state-guide" element={<Page><div className="app-main-content"><div className="page-inner"><StateGuide /></div><Footer /></div></Page>} />
              <Route path="/voting-methods" element={<Page><div className="app-main-content"><div className="page-inner"><VotingMethods /></div><Footer /></div></Page>} />
              <Route path="/learn" element={<Page><div className="app-main-content"><div className="page-inner"><LearnPage /></div><Footer /></div></Page>} />
              <Route path="/settings" element={<Page><div className="app-main-content"><div className="page-inner"><SettingsPage /></div><Footer /></div></Page>} />
              <Route path="/polling-locator" element={<Page><div className="app-main-content"><div className="page-inner"><PollingLocator /></div><Footer /></div></Page>} />
              <Route path="*" element={
                <Page>
                  <div style={{ padding: '80px 32px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '64px', fontWeight: 300, color: 'var(--md-primary)' }}>404</h1>
                    <p style={{ marginBottom: '24px', color: 'var(--md-on-surface-variant)' }}>Page not found.</p>
                    <a href="/" style={{ color: 'var(--md-primary)', fontWeight: 500 }}>← Back to Chat</a>
                  </div>
                </Page>
              } />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
    </div>
  );
}
