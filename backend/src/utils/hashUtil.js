import { createHash } from 'crypto';

/**
 * Generates a SHA-256 hex digest of a sanitised string for caching.
 *

 * @param {string} sanitisedString - The cleaned input to hash.
 * @returns {string} 64-character hex digest.
 */
export function hashPrompt(sanitisedString) {
  return createHash('sha256').update(sanitisedString).digest('hex');
}

export default hashPrompt;
