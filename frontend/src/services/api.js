import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

const apiService = {
  async sendChat(message, context = null, languageCode = 'en') {
    const { data } = await client.post('/api/chat', { message, context, languageCode });
    return data;
  },
  async getStates() {
    const { data } = await client.get('/api/states');
    return data;
  },
  async getState(code) {
    const { data } = await client.get(`/api/states/${code}`);
    return data;
  },
  async healthCheck() {
    const { data } = await client.get('/api/health');
    return data;
  },

  /**
   * Translate text to a target language using Google Translate API v2.
   * @param {string} text - Text to translate
   * @param {string} targetLang - ISO 639-1 target language code (e.g. 'hi', 'bn')
   * @returns {Promise<{translatedText: string, detectedSourceLanguage: string, targetLang: string, cached: boolean}>}
   */
  async translateText(text, targetLang) {
    const { data } = await client.post('/api/translate', { text, targetLang });
    return data;
  },

  /**
   * Get list of supported translation languages.
   * @returns {Promise<{languages: Object}>}
   */
  async getLanguages() {
    const { data } = await client.get('/api/translate/languages');
    return data;
  },

  /**
   * Search official Indian election sources.
   * @param {string} query - Search query
   * @param {string} [lang='en'] - Language hint
   * @returns {Promise<{results: Array, totalResults: string, cached: boolean}>}
   */
  async searchSources(query, lang = 'en') {
    const { data } = await client.get('/api/search', { params: { q: query, lang } });
    return data;
  },

  /**
   * Fetch educational YouTube videos for a topic.
   * @param {string} query
   * @returns {Promise<Array>}
   */
  async getYoutubeVideos(query) {
    const { data } = await client.get('/api/youtube', { params: { q: query } });
    return data;
  },
};

export default apiService;
