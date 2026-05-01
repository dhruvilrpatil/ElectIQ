/**
 * chatController.js
 *
 * Strategy: Gemini-first, fallback on error.
 *
 *  1. Validate and sanitize the incoming message with express-validator.
 *  2. Check the LRU cache for a previously computed response.
 *  3. If Gemini is available, call it and cache the result.
 *  4. On Gemini failure, return a graceful error response.
 */

import { validationResult } from 'express-validator';
import geminiService from '../services/geminiService.js';
import cacheService from '../services/cacheService.js';
import formatResponse from '../utils/responseFormatter.js';
import logger from '../middleware/logger.js';

/**
 * Processes an incoming chat message and returns an AI-generated response.
 *
 * @param {import('express').Request} req - Express request with validated body.
 * @param {import('express').Response} res - Express response.
 * @param {import('express').NextFunction} next - Express next middleware.
 * @returns {Promise<void>}
 */
export async function processMessage(req, res, next) {
  try {
    // Check validation errors from express-validator middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    // Message has already been sanitized by express-validator middleware
    const { message: sanitizedMessage, context, sessionId } = req.body;

    const start = Date.now();
    const cacheKey = `chat:${sanitizedMessage.toLowerCase()}:${context || ''}`;

    // Return cached result instantly
    const cached = cacheService.get(cacheKey);
    if (cached) {
      return res.json({ ...cached, meta: { ...cached.meta, cached: true } });
    }

    let result;
    let source = 'gemini';

    if (geminiService.isAvailable()) {
      try {
        const aiResponse = await geminiService.chat(sanitizedMessage, context);
        if (aiResponse) {
          result = { intent: 'ai_response', confidence: 1, response: aiResponse };
          logger.info('Chat: Gemini answered', { ms: Date.now() - start });
        }
      } catch (aiErr) {
        logger.warn('Gemini unavailable or failed:', { error: aiErr.message });
      }
    } else {
      logger.warn('Gemini service is not available (no API key or credentials)');
    }

    if (!result) {
      result = {
        intent: 'error',
        confidence: 0,
        response: {
          headline: 'Service Unavailable',
          body: 'I am currently unable to process your request. Please try again later.',
          steps: [],
          actions: [{ label: 'Verify at ECI', url: 'https://voters.eci.gov.in' }],
          followUps: [],
        },
      };
      source = 'fallback';
    }

    const responseTime = Date.now() - start;
    const formatted = formatResponse({ ...result, meta: { cached: false, responseTime, source } });

    // Cache successful responses for 10 minutes
    if (result.intent !== 'error') {
      cacheService.set(cacheKey, formatted, 600);
    }

    logger.info('Chat processed', { intent: formatted.intent, source, ms: responseTime });
    res.json(formatted);
  } catch (err) {
    next(err);
  }
}
