import logger from './logger.js';

export function errorHandler(err, req, res, _next) {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`${status} ${message}`, {
    path: req.path,
    method: req.method,
    stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
  });

  const body = { error: message };
  if (process.env.NODE_ENV !== 'production' && err.stack) {
    body.stack = err.stack;
  }

  res.status(status).json(body);
}
