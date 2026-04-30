import { Router } from 'express';
import translateService from '../services/translateService.js';
import { rateLimit } from 'express-rate-limit';
import logger from '../middleware/logger.js';

const router = Router();

const translateRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // 20 requests per minute per IP
  message: { error: 'Too many translation requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', translateRateLimiter, async (req, res, next) => {
  try {
    const { text, targetLang } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required and must be a string' });
    }

    if (!targetLang || typeof targetLang !== 'string') {
      return res.status(400).json({ error: 'Target language is required' });
    }

    const result = await translateService.translateText(text, targetLang);
    res.json(result);

  } catch (error) {
    if (error.cause === 429) {
        res.status(429).json({ error: 'Translation service rate limit exceeded' });
    } else if (error.message.startsWith('Invalid target language') || error.message.startsWith('Text exceeds')) {
        res.status(400).json({ error: error.message });
    } else {
        logger.error('Translate route error', { error: error.message });
        res.status(500).json({ error: 'Failed to translate text' });
    }
  }
});

export default router;
