import { useCallback } from 'react';
import useLanguageStore from '../store/languageStore.js';
import { getCachedTranslation } from '../utils/translationCache.js';

/**
 * Provides translation functions and language state management.
 * @returns {Object} An object containing the translation function, selected language, and setter.
 */
export function useTranslation() {
  const selectedLanguage = useLanguageStore((s) => s.selectedLanguage);
  const setLanguage = useLanguageStore((s) => s.setLanguage);

  /**
   * Translates a string, returning the cached translation or original if not available.
   * @param {string} original - English source string.
   * @returns {string} The translated string or original.
   */
  const t = useCallback(
    (original) => {
      if (selectedLanguage === 'en') return original;
      return getCachedTranslation(selectedLanguage, original) || original;
    },
    [selectedLanguage]
  );

  return { t, selectedLanguage, setLanguage };
}

export default useTranslation;
