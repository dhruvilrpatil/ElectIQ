import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import { validateEnv } from './config/env.js';
import { corsOptions } from './middleware/cors.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/logger.js';
import logger from './middleware/logger.js';

import chatRoutes from './routes/chat.js';
import stateRoutes from './routes/states.js';
import healthRoutes from './routes/health.js';
import translateRoutes from './routes/translate.js';
import searchRoutes from './routes/search.js';
import youtubeRoutes from './routes/youtube.js';

// Validate environment variables at startup
validateEnv();

const app = express();
const PORT = process.env.PORT || 3001;

// Trust the reverse proxy (Cloud Run) so rate limiters and real IP resolution work
app.set('trust proxy', 1);

// Security & performance middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
        frameSrc: ['https://www.youtube.com', 'https://www.youtube-nocookie.com'],
        frameAncestors: ["'none'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    noSniff: true,
    xFrameOptions: { action: 'deny' },
  })
);
app.use(compression());
app.use(cors(corsOptions));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

// Logging
app.use(requestLogger);

// Rate limiting
app.use('/api/', rateLimiter);

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/states', stateRoutes);
app.use('/api/translate', translateRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/youtube', youtubeRoutes);

// 404 handler for API routes
app.use('/api', (req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});

// Serve frontend in production
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
  });
} else {
  // 404 handler for non-API routes in development
  app.use((req, res) => {
    res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
  });
}

// Global error handler
app.use(errorHandler);

// Start server only when not in test environment
let server;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    logger.info(`🗳  ElectIQ API running on http://localhost:${PORT}`);
    logger.info(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  });

  // Graceful shutdown
  function shutdown(signal) {
    logger.info(`${signal} received — shutting down gracefully`);
    server.close(() => {
      logger.info('Server closed');
      process.exit(0);
    });
    setTimeout(() => { logger.error('Force exit'); process.exit(1); }, 10000);
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

export default app;
