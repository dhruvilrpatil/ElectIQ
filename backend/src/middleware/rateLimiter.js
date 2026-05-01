import rateLimit from 'express-rate-limit';
import { RATE_LIMITS } from '../config/constants.js';

/**
 * Global rate limiter applied to all /api/ routes.
 * Limits each IP to 100 requests per 15-minute window.
 */
export const rateLimiter = rateLimit({
  windowMs: RATE_LIMITS.GLOBAL_WINDOW_MS,
  max: RATE_LIMITS.GLOBAL_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    const retryAfter = Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000);
    res.status(429).json({
      error: 'Too many requests. Please slow down.',
      retryAfter,
    });
  },
});

/**
 * Stricter rate limiter for the /api/chat endpoint.
 * Limits each IP to 20 chat requests per 15-minute window.
 */
export const chatRateLimiter = rateLimit({
  windowMs: RATE_LIMITS.CHAT_WINDOW_MS,
  max: RATE_LIMITS.CHAT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    const retryAfter = Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000);
    res.status(429).json({
      error: 'You are sending messages too quickly. Please wait a moment.',
      retryAfter,
    });
  },
});
