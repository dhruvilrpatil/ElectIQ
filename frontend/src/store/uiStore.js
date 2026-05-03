import { create } from 'zustand';

/**
 * Zustand store for managing global UI state such as sidebar visibility and theme.
 */
const useUiStore = create((set) => ({
  sidebarExpanded: false,
  theme: localStorage.getItem('electiq-theme') || 'light',

  setSidebarExpanded: (expanded) => set({ sidebarExpanded: expanded }),

  setTheme: (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('electiq-theme', theme);
    set({ theme });
  },

  toggleTheme: () => {
    set((state) => {
      const next = state.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('electiq-theme', next);
      return { theme: next };
    });
  },
}));

export default useUiStore;
