import winston from 'winston';

const { combine, timestamp, printf, colorize, json } = winston.format;

const isProduction = process.env.NODE_ENV === 'production';

const devFormat = printf(({ level, message, timestamp: ts, ...meta }) => {
  const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
  return `${ts} [${level}] ${message}${metaStr}`;
});

/**
 * Singleton Winston logger.
 *
 * Production : JSON format, only 'warn' and 'error' levels.
 * Development: colourised console, all levels.
 *
 * RULE: Never use console.log / console.warn / console.error anywhere
 *       in the backend. Use logger.info(), logger.warn(), logger.error().
 */
const logger = winston.createLogger({
  level: isProduction ? 'warn' : 'debug',
  format: isProduction
    ? combine(timestamp(), json())
    : combine(
        colorize(),
        timestamp({ format: 'HH:mm:ss' }),
        devFormat
      ),
  transports: [new winston.transports.Console()],
});

export default logger;
