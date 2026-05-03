import axios from 'axios';
import config from '../config/env.js';
import logger from '../utils/logger.js';

/**
 * Translates an array of static UI strings into the specified target language.
 *

 * @param {string[]} strings - Array of English strings to translate.
 * @param {string} targetLang - BCP-47 language code.
 * @returns {Promise<string[]>} Translated strings in the same order.
 */
export async function translateStrings(strings, targetLang) {
  // English to English is a no-op
  if (targetLang === 'en') {
    return strings;
  }

  try {
    const response = await axios.post(
      'https://translation.googleapis.com/language/translate/v2',
      {
        q: strings,
        target: targetLang,
        format: 'text',
      },
      {
        params: { key: config.translateApiKey },
        timeout: 10000,
      }
    );

    const translations = response.data.data.translations || [];
    return translations.map((t) => t.translatedText);
  } catch (err) {
    logger.error('Translation service error', {
      message: err.message?.slice(0, 200),
      status: err.response?.status,
    });
    // On error, return the original English strings as fallback
    return strings;
  }
}

export default { translateStrings };
