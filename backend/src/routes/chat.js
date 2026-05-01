import { Router } from 'express';
import { body } from 'express-validator';
import { processMessage } from '../controllers/chatController.js';
import { chatRateLimiter } from '../middleware/rateLimiter.js';
import { CHAT_MAX_MESSAGE_LENGTH } from '../config/constants.js';

const router = Router();

/**
 * Validation middleware for the chat endpoint.
 * Validates that message is a non-empty string, max 500 chars, and strips HTML/script tags.
 */
const validateChatInput = [
  body('message')
    .exists({ checkFalsy: true })
    .withMessage('Message is required.')
    .isString()
    .withMessage('Message must be a string.')
    .trim()
    .notEmpty()
    .withMessage('Message cannot be empty.')
    .isLength({ max: CHAT_MAX_MESSAGE_LENGTH })
    .withMessage(`Message must not exceed ${CHAT_MAX_MESSAGE_LENGTH} characters.`)
    .customSanitizer((value) =>
      // Strip HTML tags and script content to prevent prompt injection
      value.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]*>?/gm, '').trim()
    )
    .notEmpty()
    .withMessage('Message cannot be empty after sanitization.'),
  body('context').optional().isString().trim().isLength({ max: 100 }),
];

router.post('/', chatRateLimiter, validateChatInput, processMessage);

router.get('/history/:sessionId', (req, res) => {
  res.json({ messages: [], sessionId: req.params.sessionId });
});

export default router;
