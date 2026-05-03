import winston from 'winston';
const { combine, timestamp, printf, colorize } = winston.format;
const isDev = process.env.NODE_ENV !== 'production';

const logFormat = printf(({ level, message, timestamp, ...meta }) => {
  const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
  return `${timestamp} [${level}] ${message}${metaStr}`;
});

/**
 * Configures the Winston logger with console and file transports.
 */
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
  transports: [
    new winston.transports.Console({
      format: isDev ? combine(colorize(), timestamp({ format: 'HH:mm:ss' }), logFormat) : combine(timestamp(), logFormat),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

/**
 * Middleware that logs incoming HTTP requests and their duration.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
export const requestLogger = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.path} ${res.statusCode} ${duration}ms`, {
      ip: req.ip,
      userAgent: req.get('User-Agent')?.slice(0, 60),
    });
  });
  next();
};

export default logger;
