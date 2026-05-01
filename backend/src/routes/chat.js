import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import crypto from 'crypto';
import { LRUCache } from 'lru-cache';
import { chatRateLimiter } from '../middleware/rateLimiter.js';
import geminiService from '../services/geminiService.js';
import logger from '../middleware/logger.js';

const router = Router();

// Configure LRU Cache
const chatCache = new LRUCache({
  max: 100,
  ttl: 1000 * 60 * 10, // 10 minutes
});

// Middleware to validate and sanitize chat input
const validateChat = [
  body('message')
    .isString().withMessage('Message must be a string')
    .trim()
    .notEmpty().withMessage('Message cannot be empty')
    .isLength({ max: 500 }).withMessage('Message too long. Maximum 500 characters.')
    .customSanitizer((value) => value.replace(/<[^>]*>?/gm, '')), // Strip HTML
  body('context').optional().isString().trim(),
  body('languageCode').optional().isString().trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
  }
];

router.post('/', chatRateLimiter, validateChat, async (req, res) => {
  try {
    const { message, context, languageCode } = req.body;
    
    // Create SHA-256 hash for cache key
    const hashData = `${message}:${context || ''}:${languageCode || 'en'}`;
    const cacheKey = crypto.createHash('sha256').update(hashData).digest('hex');

    const cachedResponse = chatCache.get(cacheKey);
    if (cachedResponse) {
      logger.info('Chat: returning cached response');
      return res.json(cachedResponse);
    }

    const aiResponse = await geminiService.chat(message, context, languageCode);
    
    // Store in cache
    chatCache.set(cacheKey, aiResponse);
    
    return res.json(aiResponse);
  } catch (error) {
    logger.error('Chat error:', { error: error.message });
    // Map error to generic user-facing message
    return res.status(500).json({
      intent: 'error',
      confidence: 0,
      response: {
        headline: 'Service Unavailable',
        body: 'I am currently unable to process your request. Please try again later.',
        steps: [],
        actions: [{ label: 'Verify at ECI', url: 'https://voters.eci.gov.in' }],
        followUps: []
      }
    });
  }
});

router.get('/history/:sessionId', (req, res) => {
  res.json({ messages: [], sessionId: req.params.sessionId });
});

export default router;
