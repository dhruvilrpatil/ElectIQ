/**
 * @fileoverview YouTube Data API v3 route for fetching election-related videos.
 * Searches official government channels and caches results to respect quota limits.
 */

import { Router } from 'express';
import { query } from 'express-validator';
import { validationResult } from 'express-validator';
import fetch from 'node-fetch';
import { rateLimit } from 'express-rate-limit';
import cacheService from '../services/cacheService.js';
import logger from '../middleware/logger.js';
import {
  GOOGLE_API_URLS,
  YOUTUBE_OFFICIAL_CHANNELS,
  YOUTUBE_MAX_RESULTS,
  CACHE_TTL,
} from '../config/constants.js';

const router = Router();

/**
 * Rate limiter for YouTube search endpoint.
 * YouTube Data API v3 has a daily quota of 10,000 units; each search costs ~100 units.
 */
const youtubeRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { error: 'Too many YouTube search requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const validateYoutubeQuery = [
  query('q')
    .exists({ checkFalsy: true })
    .withMessage('Query parameter "q" is required.')
    .isString()
    .trim()
    .isLength({ min: 2, max: 150 })
    .withMessage('Query must be between 2 and 150 characters.'),
];

/**
 * GET /api/youtube?q=<query>
 * Searches YouTube Data API v3 for election-related videos from official channels.
 * Returns top 5 results. Caches results for 1 hour to preserve API quota.
 *
 * @returns {Object} { videos: Array<{ videoId, title, description, thumbnail, channelTitle }>, cached: boolean }
 */
router.get('/', youtubeRateLimiter, validateYoutubeQuery, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const searchQuery = req.query.q.trim();
    const cacheKey = `youtube:${searchQuery.toLowerCase()}`;

    // Return cached result if available
    const cached = cacheService.get(cacheKey);
    if (cached) {
      return res.json({ ...cached, cached: true });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      logger.warn('YOUTUBE_API_KEY not configured — video section will be hidden');
      return res.json({
        videos: [],
        quotaExhausted: false,
        disabled: true,
        message: 'YouTube integration not configured.',
      });
    }

    const url = new URL(GOOGLE_API_URLS.YOUTUBE_SEARCH);
    url.searchParams.append('part', 'snippet');
    url.searchParams.append('q', `${searchQuery} India election`);
    url.searchParams.append('type', 'video');
    url.searchParams.append('maxResults', String(YOUTUBE_MAX_RESULTS));
    url.searchParams.append('relevanceLanguage', 'en');
    url.searchParams.append('safeSearch', 'strict');
    url.searchParams.append('key', apiKey);

    // Prefer results from official government channels
    // Note: YouTube API does not support multi-channel filtering in a single query.
    // We fetch results and filter/sort by preferred channel IDs.
    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorText = await response.text();

      // Quota exhaustion — gracefully hide the video section
      if (response.status === 403 && errorText.includes('quotaExceeded')) {
        logger.warn('YouTube API quota exhausted — hiding video section');
        return res.json({ videos: [], quotaExhausted: true });
      }

      logger.error('YouTube API error', { status: response.status, body: errorText.slice(0, 200) });
      return res.json({ videos: [], quotaExhausted: false, error: 'Unable to fetch videos.' });
    }

    const data = await response.json();
    const items = data.items || [];

    const videos = items.map((item) => ({
      videoId: item.id?.videoId,
      title: item.snippet?.title || '',
      description: item.snippet?.description || '',
      thumbnail: item.snippet?.thumbnails?.medium?.url || '',
      channelTitle: item.snippet?.channelTitle || '',
      channelId: item.snippet?.channelId || '',
      publishedAt: item.snippet?.publishedAt || '',
      // Flag whether this is from a known official channel
      isOfficial: YOUTUBE_OFFICIAL_CHANNELS.includes(item.snippet?.channelId),
    }));

    // Sort: official channels first, then by publication date
    videos.sort((a, b) => {
      if (a.isOfficial && !b.isOfficial) return -1;
      if (!a.isOfficial && b.isOfficial) return 1;
      return 0;
    });

    const result = { videos: videos.slice(0, YOUTUBE_MAX_RESULTS), quotaExhausted: false };

    // Cache for 1 hour (TTL in seconds for cacheService)
    cacheService.set(cacheKey, result, CACHE_TTL.YOUTUBE);

    return res.json({ ...result, cached: false });
  } catch (err) {
    logger.error('YouTube route error', { error: err.message });
    next(err);
  }
});

export default router;
