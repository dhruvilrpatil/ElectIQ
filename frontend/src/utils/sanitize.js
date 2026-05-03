import DOMPurify from 'dompurify';

/**
 * Sanitises an HTML string to prevent XSS vulnerabilities before rendering.
 * @param {string} dirty - Raw HTML string (e.g., from AI markdown render).
 * @returns {string} Safe HTML string containing only allowed tags and attributes.
 */
export function sanitizeHTML(dirty) {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'strong', 'em', 'ul', 'ol', 'li', 'p', 'br', 'a', 'code', 'pre', 'h2', 'h3'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    FORBID_ATTR: ['style', 'onerror', 'onclick'],
  });
}

export default sanitizeHTML;
