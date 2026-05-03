const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Generic fetch wrapper with error handling.
 * @param {string} url
 * @param {RequestInit} options
 * @returns {Promise<any>}
 */
async function request(url, options = {}) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${url}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  } catch {
    throw new Error('Network error. Check your connection.');
  }

  if (!response.ok) {
    let errorMessage = 'An error occurred.';
    try {
      const body = await response.json();
      errorMessage = body.error || errorMessage;
    } catch {
      /* use default */
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

/**
 * Sends a message to the ElectIQ chat endpoint.
 * @param {string} message - Sanitised user message.
 * @param {Array} history - Conversation history.
 * @param {string} language - BCP-47 language code.
 * @param {AbortSignal} [signal] - Optional abort signal.
 * @returns {Promise<{response: string}>}
 */
export async function sendChatMessage(message, history, language, signal) {
  return request('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ message, history, language }),
    signal,
  });
}

/**
 * Searches ECI documents via Google Custom Search.
 * @param {string} query - Search term.
 * @param {AbortSignal} [signal] - Optional abort signal.
 * @returns {Promise<{results: Array<{title, snippet, link}>}>}
 */
export async function searchECIDocuments(query, signal) {
  return request(`/api/search?q=${encodeURIComponent(query)}`, { signal });
}

/**
 * Fetches educational YouTube videos for a topic.
 * @param {string} topic - Topic keyword.
 * @param {AbortSignal} [signal] - Optional abort signal.
 * @returns {Promise<{quotaExceeded: boolean, results: Array}>}
 */
export async function fetchYoutubeVideos(topic, signal) {
  return request(`/api/youtube?topic=${encodeURIComponent(topic)}`, { signal });
}

/**
 * Translates UI strings via the backend translation endpoint.
 * @param {string[]} strings - English strings to translate.
 * @param {string} targetLang - Target language code.
 * @param {AbortSignal} [signal] - Optional abort signal.
 * @returns {Promise<{translations: string[]}>}
 */
export async function translateUIStrings(strings, targetLang, signal) {
  return request('/api/translate', {
    method: 'POST',
    body: JSON.stringify({ strings, targetLang }),
    signal,
  });
}

export default { sendChatMessage, searchECIDocuments, fetchYoutubeVideos, translateUIStrings };
