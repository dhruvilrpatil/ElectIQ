/**
 * chatController.js
 *
 * Strategy: NLP-first, Gemini-fallback.
 *
 *  1. Always run the NLP classifier.
 *  2. If confidence ≥ 0.4 (intent matched)  → return the curated NLP response.
 *  3. If confidence <  0.4 (no clear match)  → call Gemini so the user gets a real answer.
 *  4. If Gemini also fails                   → return the NLP default gracefully.
 *
 * This ensures curated answers for common election questions (fast, no API cost)
 * while any open-ended query falls through to Gemini.
 */

import nlpService from '../services/nlpService.js';
import geminiService from '../services/geminiService.js';
import cacheService from '../services/cacheService.js';
import formatResponse from '../utils/responseFormatter.js';
import logger from '../middleware/logger.js';

const NLP_CONFIDENCE_THRESHOLD = 0.4;

export async function processMessage(req, res, next) {
  try {
    const { message, context, sessionId } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required and must be a string.' });
    }

    // Basic XSS protection — strip HTML tags
    const trimmed = message.trim().replace(/<[^>]*>?/gm, '');

    if (trimmed.length === 0)  return res.status(400).json({ error: 'Message cannot be empty.' });
    if (trimmed.length > 500)  return res.status(400).json({ error: 'Message too long. Maximum 500 characters.' });

    const start    = Date.now();
    const cacheKey = `chat:${trimmed.toLowerCase()}:${context || ''}`;

    // Return cached result instantly
    const cached = cacheService.get(cacheKey);
    if (cached) {
      return res.json({ ...cached, meta: { ...cached.meta, cached: true } });
    }

    let result;
    let source = 'gemini';

    if (geminiService.isAvailable()) {
      try {
        const aiResponse = await geminiService.chat(trimmed, context);
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
          body: 'I am currently unable to process your request via Gemini. Please try again later or check API configuration.',
          steps: [],
          actions: [{ label: 'Verify at ECI', url: 'https://voters.eci.gov.in' }],
          followUps: []
        }
      };
      source = 'fallback';
    }

    const responseTime = Date.now() - start;
    const formatted = formatResponse({ ...result, meta: { cached: false, responseTime, source } });

    // Cache for 1 hour, ONLY if it's not an error response
    if (result.intent !== 'error') {
      cacheService.set(cacheKey, formatted, 3600);
    }

    logger.info('Chat processed', { intent: formatted.intent, source, ms: responseTime });
    res.json(formatted);

  } catch (err) {
    next(err);
  }
}
