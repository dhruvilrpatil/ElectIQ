import axios from 'axios';
import config from '../config/env.js';
import { ECI_SEARCH_SITE, SEARCH_CACHE_TTL_MS } from '../config/constants.js';
import cacheService from './cacheService.js';
import logger from '../utils/logger.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * Queries the Google Custom Search API restricted to site:eci.gov.in.
 *

 * @param {string} query - The search query.
 * @returns {Promise<Array<{title: string, snippet: string, link: string}>>}
 */
export async function searchECI(query) {
  const cacheKey = `search:${query.toLowerCase().trim()}`;

  const cached = cacheService.get(cacheKey);
  if (cached !== undefined) {
    logger.info('Search: cache hit', { query });
    return cached;
  }

  try {
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: config.csApiKey,
        cx: config.csCx,
        q: `${query} ${ECI_SEARCH_SITE}`,
        num: 5,
      },
      timeout: 10000,
    });

    const items = response.data.items || [];
    const results = items.map((item) => ({
      title: item.title,
      snippet: item.snippet,
      link: item.link,
    }));

    cacheService.set(cacheKey, results, SEARCH_CACHE_TTL_MS);
    return results;
  } catch (err) {
    logger.error('Search service error', {
      message: err.message?.slice(0, 200),
      status: err.response?.status,
    });

    if (err.response?.status === 403) {
      throw new AppError('Search API access denied.', 403, 'SEARCH_FORBIDDEN');
    }
    if (err.response?.status === 429) {
      throw new AppError('Search API rate limit exceeded.', 429, 'SEARCH_QUOTA_EXCEEDED');
    }
    throw new AppError('Search service temporarily unavailable.', 503, 'SEARCH_ERROR');
  }
}

export default { searchECI };
