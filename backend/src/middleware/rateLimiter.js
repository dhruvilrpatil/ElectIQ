import rateLimit from 'express-rate-limit';
import {
  GLOBAL_RATE_LIMIT_WINDOW_MS,
  GLOBAL_RATE_LIMIT_MAX,
  CHAT_RATE_LIMIT_WINDOW_MS,
  CHAT_RATE_LIMIT_MAX,
  SEARCH_RATE_LIMIT_WINDOW_MS,
  SEARCH_RATE_LIMIT_MAX,
} from '../config/constants.js';

/**
 * Rate limiter middleware applied to all routes globally.
 * @returns {Function} Express middleware.
 */
export const globalLimiter = rateLimit({
  windowMs: GLOBAL_RATE_LIMIT_WINDOW_MS,
  max: GLOBAL_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Try again later.' },
});

/**
 * Stricter rate limiter middleware for chat endpoints.
 * @returns {Function} Express middleware.
 */
export const chatLimiter = rateLimit({
  windowMs: CHAT_RATE_LIMIT_WINDOW_MS,
  max: CHAT_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Chat limit reached. Wait 15 minutes.' },
});

/**
 * Rate limiter middleware for search endpoints.
 * @returns {Function} Express middleware.
 */
export const searchLimiter = rateLimit({
  windowMs: SEARCH_RATE_LIMIT_WINDOW_MS,
  max: SEARCH_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many search requests. Try again later.' },
});

export default { globalLimiter, chatLimiter, searchLimiter };
