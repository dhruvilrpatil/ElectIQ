import { body, query, validationResult } from 'express-validator';
import { sanitizeInput } from '../utils/sanitizer.js';
import {
  MAX_MESSAGE_LENGTH,
  MAX_SEARCH_QUERY_LENGTH,
  MAX_YOUTUBE_TOPIC_LENGTH,
  SUPPORTED_LANGUAGE_CODES,
  MAX_CHAT_HISTORY,
} from '../config/constants.js';

/**
 * Middleware that checks for validation errors and returns 400 if any exist.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @returns {Object|void} JSON error response or proceeds to next middleware.
 */
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  return next();
}

/**
 * Express-validator chain for POST /api/chat.
 */
export const validateChat = [
  body('message')
    .notEmpty()
    .withMessage('Message is required.')
    .isString()
    .withMessage('Message must be a string.')
    .isLength({ max: MAX_MESSAGE_LENGTH })
    .withMessage(`Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`)
    .customSanitizer((value) => sanitizeInput(value)),
  body('language')
    .optional()
    .isIn(SUPPORTED_LANGUAGE_CODES)
    .withMessage('Unsupported language code.'),
  body('history')
    .optional()
    .isArray({ max: MAX_CHAT_HISTORY })
    .withMessage(`History must be an array of at most ${MAX_CHAT_HISTORY} items.`),
  handleValidationErrors,
];

/**
 * Express-validator chain for GET /api/search.
 */
export const validateSearch = [
  query('q')
    .notEmpty()
    .withMessage('Search query is required.')
    .isString()
    .isLength({ max: MAX_SEARCH_QUERY_LENGTH })
    .withMessage(`Query must be ${MAX_SEARCH_QUERY_LENGTH} characters or fewer.`)
    .trim()
    .escape(),
  handleValidationErrors,
];

/**
 * Express-validator chain for GET /api/youtube.
 */
export const validateYoutube = [
  query('topic')
    .notEmpty()
    .withMessage('Topic is required.')
    .isString()
    .isLength({ max: MAX_YOUTUBE_TOPIC_LENGTH })
    .withMessage(`Topic must be ${MAX_YOUTUBE_TOPIC_LENGTH} characters or fewer.`)
    .trim()
    .escape(),
  handleValidationErrors,
];

export default { validateChat, validateSearch, validateYoutube };
