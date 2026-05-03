import { Router } from 'express';
import { chatLimiter } from '../middleware/rateLimiter.js';
import { validateChat } from '../middleware/validator.js';
import geminiService from '../services/geminiService.js';
import logger from '../utils/logger.js';

const router = Router();

/**
 * Processes incoming chat queries and streams or returns AI responses.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
router.post('/', chatLimiter, validateChat, async (req, res, next) => {
  try {
    const { message, language = 'en', history = [] } = req.body;
    // message is already sanitised by the validator middleware

    if (req.query.stream === 'true') {
      // Set SSE headers and pipe the Gemini stream
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const stream = await geminiService.chat(message, history, language, true);
      for await (const chunk of stream) {
        const text = chunk.text();
        res.write(`data: ${JSON.stringify({ token: text })}\n\n`);
      }
      res.write('data: [DONE]\n\n');
      res.end();
    } else {
      const response = await geminiService.chat(message, history, language, false);
      res.json({ response });
    }
  } catch (err) {
    next(err); // delegate to errorHandler middleware
  }
});

export default router;
