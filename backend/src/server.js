// 1. Import config FIRST — validates env vars before anything else
import config from './config/env.js';

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';

import { globalLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import logger from './utils/logger.js';

import chatRouter from './routes/chat.js';
import searchRouter from './routes/search.js';
import youtubeRouter from './routes/youtube.js';
import translateRouter from './routes/translate.js';

// 2. Express app init
const app = express();

// Trust reverse proxy (Cloud Run, nginx)
app.set('trust proxy', 1);

// 3. Helmet with full CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        frameSrc: ['https://www.youtube.com', 'https://www.youtube-nocookie.com'],
        imgSrc: ["'self'", 'data:', 'https://i.ytimg.com'],
        connectSrc: ["'self'"],
      },
    },
  })
);

// 4. CORS
app.use(
  cors({
    origin: config.frontendUrl,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

// 5. Compression
app.use(compression());

// 6. Body parsing
app.use(express.json({ limit: '10kb' }));

// 7. Global rate limiter
app.use(globalLimiter);

// 8. Routes
app.use('/api/chat', chatRouter);
app.use('/api/search', searchRouter);
app.use('/api/youtube', youtubeRouter);
app.use('/api/translate', translateRouter);

// 9. 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found.` });
});

// 10. Error handler middleware LAST
app.use(errorHandler);

// 11. Start server & graceful shutdown
const server = app.listen(config.port, () => {
  logger.info(`ElectIQ API running on http://localhost:${config.port}`);
  logger.info(`Environment: ${config.nodeEnv}`);
});

/**
 * Shuts down the server gracefully upon receiving a termination signal.
 * @param {string} signal 
 */
function shutdown(signal) {
  logger.info(`${signal} received — shutting down gracefully`);
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
  setTimeout(() => {
    logger.error('Forced exit after timeout');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

export default app;
