import logger from '../utils/logger.js';

/**
 * Custom application error with HTTP status code and error code.
 */
export class AppError extends Error {
  /**
   * @param {string} message - User-facing error message.
   * @param {number} statusCode - HTTP status code.
   * @param {string} code - Machine-readable error code.
   */
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

/**
 * Global Express error handler middleware.
 * @param {Error} err 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} _next 
 * @returns {Object} JSON response containing the error.
 */
export function errorHandler(err, req, res, _next) {
  // AppError — expected, mapped errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
    });
  }

  // Express-validator ValidationError (array of errors on req)
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: 'Invalid JSON in request body.',
      code: 'INVALID_JSON',
    });
  }

  // Everything else — never leak stack traces or internal messages
  logger.error('Unhandled error', {
    message: err.message,
    stack: err.stack?.slice(0, 500),
    path: req.path,
    method: req.method,
  });

  return res.status(500).json({
    error: 'An internal server error occurred.',
    code: 'INTERNAL_ERROR',
  });
}

export default errorHandler;
