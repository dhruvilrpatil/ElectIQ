import { Router } from 'express';
import { LRUCache } from 'lru-cache';
import fetch from 'node-fetch';
import { rateLimit } from 'express-rate-limit';
import logger from '../middleware/logger.js';

const router = Router();

// LRU cache for YouTube search results (1 hour TTL)
const youtubeCache = new LRUCache({
  max: 100,
  ttl: 1000 * 60 * 60,
});

const youtubeRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  message: { error: 'Too many requests' },
});

router.get('/', youtubeRateLimiter, async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Query parameter q is required' });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return res.status(503).json({ error: 'YouTube API key not configured' });
    }

    const cacheKey = `yt:${q.toLowerCase()}`;
    const cached = youtubeCache.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    // Official channels: ECI (UCb1hH_Y0Qz0_x6L9k1u7_sQ), Doordarshan (UCX7Gf10R0iE5i01gIitk3xA)
    // We can use a general search but add "Election Commission of India" to query
    const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
    searchUrl.searchParams.append('part', 'snippet');
    searchUrl.searchParams.append('q', `${q} Election Commission of India official`);
    searchUrl.searchParams.append('type', 'video');
    searchUrl.searchParams.append('maxResults', '2');
    searchUrl.searchParams.append('key', apiKey);

    const response = await fetch(searchUrl);
    if (!response.ok) {
      if (response.status === 403) {
        return res.status(403).json({ error: 'YouTube Quota Exceeded' });
      }
      throw new Error(`YouTube API returned ${response.status}`);
    }

    const data = await response.json();
    const videos = data.items.map(item => ({
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));

    youtubeCache.set(cacheKey, videos);
    return res.json(videos);
  } catch (error) {
    logger.error('YouTube API error', { error: error.message });
    return res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

export default router;
