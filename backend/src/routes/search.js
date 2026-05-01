import { Router } from 'express';
import searchService from '../services/searchService.js';
import { rateLimit } from 'express-rate-limit';
import logger from '../middleware/logger.js';

const router = Router();

const searchRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute per IP
  message: { error: 'Too many search requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.get('/', searchRateLimiter, async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const result = await searchService.searchOfficialSources(q);
    res.json(result);

  } catch (error) {
    if (error.cause === 429) {
        res.status(429).json({ error: 'Search service rate limit exceeded' });
    } else if (error.message.startsWith('Query must')) {
        res.status(400).json({ error: error.message });
    } else {
        logger.error('Search route error', { error: error.message });
        res.status(500).json({ error: 'Failed to search sources' });
    }
  }
});

export default router;
