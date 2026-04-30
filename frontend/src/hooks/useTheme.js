import { useState, useEffect, useCallback } from 'react';

function getStoredTheme() {
  const stored = localStorage.getItem('electiq-theme');
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('electiq-theme', theme);
}

export default function useTheme() {
  const [theme, setThemeState] = useState(getStoredTheme);

  useEffect(() => { applyTheme(theme); }, [theme]);

  const setTheme = useCallback((t) => {
    setThemeState(t);
    applyTheme(t);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      return next;
    });
  }, []);

  return { theme, isDark: theme === 'dark', setTheme, toggleTheme };
}
