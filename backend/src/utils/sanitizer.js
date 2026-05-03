/**
 * Sanitises raw user input by stripping HTML tags and collapsing whitespace.
 *

 * @param {string} rawString - The untrusted user input.
 * @returns {string} A cleaned string with no HTML tags and normalised whitespace.
 */
import striptags from 'striptags';

export function sanitizeInput(rawString) {
  if (typeof rawString !== 'string') {
    return '';
  }
  const stripped = striptags(rawString);
  const collapsed = stripped.replace(/\s+/g, ' ');
  return collapsed.trim();
}

export default sanitizeInput;
