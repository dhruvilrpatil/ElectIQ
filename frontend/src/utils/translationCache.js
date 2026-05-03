/**
 * Generates an FNV-1a hex hash for short strings used in cache keys.
 * @param {string} str - The string to hash.
 * @returns {string} The resulting hex hash string.
 */
function fnv1a(str) {
  let hash = 0x811c9dc5; // FNV offset basis
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0; // FNV prime, keep as uint32
  }
  return hash.toString(16);
}

/**
 * Retrieves a cached UI translation from localStorage.
 * @param {string} langCode - Language code.
 * @param {string} originalString - The English source string.
 * @returns {string|null} The cached translation or null if missing.
 */
export function getCachedTranslation(langCode, originalString) {
  const key = `iq_trans_${langCode}_${fnv1a(originalString)}`;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Stores a translated string in localStorage.
 * @param {string} langCode
 * @param {string} originalString
 * @param {string} translated
 */
export function setCachedTranslation(langCode, originalString, translated) {
  const key = `iq_trans_${langCode}_${fnv1a(originalString)}`;
  try {
    localStorage.setItem(key, translated);
  } catch {
    /* localStorage full — silently fail */
  }
}

export default { getCachedTranslation, setCachedTranslation };
