import axios from 'axios';
import config from '../config/env.js';
import {
  YOUTUBE_CACHE_TTL_MS,
  OFFICIAL_YT_CHANNEL_IDS,
  OFFICIAL_YT_CHANNEL_KEYWORDS,
} from '../config/constants.js';
import cacheService from './cacheService.js';
import logger from '../utils/logger.js';

/**
 * Checks whether a video's channel is an official government channel.
 * @param {Object} snippet - YouTube API snippet object.
 * @returns {boolean} True if the channel is considered official.
 */
function isOfficialChannel(snippet) {
  if (OFFICIAL_YT_CHANNEL_IDS.includes(snippet.channelId)) {
    return true;
  }
  const title = (snippet.channelTitle || '').toLowerCase();
  return OFFICIAL_YT_CHANNEL_KEYWORDS.some((kw) => title.includes(kw.toLowerCase()));
}

/**
 * Searches YouTube for educational election content from official channels and caches results.
 *

 * @param {string} topic - The topic keyword extracted from AI response.
 * @returns {Promise<{quotaExceeded: boolean, results: Array<{videoId: string, title: string, thumbnail: string, channelTitle: string}>}>}
 */
export async function searchVideos(topic) {
  const cacheKey = `yt:${topic.toLowerCase().trim()}`;

  const cached = cacheService.get(cacheKey);
  if (cached !== undefined) {
    logger.info('YouTube: cache hit', { topic });
    return cached;
  }

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: config.youtubeApiKey,
        part: 'snippet',
        type: 'video',
        maxResults: 6, // fetch more to filter
        q: `${topic} Indian election`,
        safeSearch: 'strict',
      },
      timeout: 10000,
    });

    const items = response.data.items || [];

    // Filter to official channels, then take top 3
    let filtered = items.filter((item) => isOfficialChannel(item.snippet));
    if (filtered.length === 0) {
      // Fallback: return top 3 from any channel if no official matches
      filtered = items.slice(0, 3);
    } else {
      filtered = filtered.slice(0, 3);
    }

    const results = filtered.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.medium?.url || '',
      channelTitle: item.snippet.channelTitle,
    }));

    const payload = { quotaExceeded: false, results };
    cacheService.set(cacheKey, payload, YOUTUBE_CACHE_TTL_MS);
    return payload;
  } catch (err) {
    logger.error('YouTube service error', {
      message: err.message?.slice(0, 200),
      status: err.response?.status,
    });

    // On 403 quota error, return graceful degradation payload
    if (err.response?.status === 403) {
      return { quotaExceeded: true, results: [] };
    }

    return { quotaExceeded: false, results: [] };
  }
}

export default { searchVideos };
