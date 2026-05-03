import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { translateUIStrings } from '../services/api.js';
import { setCachedTranslation, getCachedTranslation } from '../utils/translationCache.js';

/**
 * Zustand store for managing application language selection and UI string registration.
 */
const useLanguageStore = create(
  persist(
    (set, get) => ({
      selectedLanguage: 'en',

      setLanguage: async (langCode) => {
        set({ selectedLanguage: langCode });
        // Expose globally for chatStore to read
        window.__electiqLanguage = langCode;

        // Don't translate if English
        if (langCode === 'en') return;

        // Translate registered UI strings
        const uiStrings = get()._registeredStrings || [];
        if (uiStrings.length === 0) return;

        // Check cache first
        const uncached = uiStrings.filter(
          (s) => !getCachedTranslation(langCode, s)
        );

        if (uncached.length > 0) {
          try {
            const data = await translateUIStrings(uncached, langCode);
            if (data.translations) {
              uncached.forEach((original, i) => {
                setCachedTranslation(langCode, original, data.translations[i]);
              });
            }
          } catch {
            /* fallback to English */
          }
        }
      },

      /**
       * Register UI strings that should be translated.
       * @param {string[]} strings
       */
      registerStrings: (strings) => {
        set({ _registeredStrings: strings });
      },

      _registeredStrings: [],
    }),
    {
      name: 'electiq-language',
      partialize: (state) => ({ selectedLanguage: state.selectedLanguage }),
    }
  )
);

// Initialize global language reference
if (typeof window !== 'undefined') {
  window.__electiqLanguage = useLanguageStore.getState().selectedLanguage;
}

export default useLanguageStore;
