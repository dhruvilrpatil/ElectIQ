import { Router } from 'express';
import cacheService from '../services/cacheService.js';
import openaiService from '../services/openaiService.js';

const router = Router();
const startTime = Date.now();

/**
 * Returns API health status, uptime, and service availability.
 * @param {Object} req 
 * @param {Object} res 
 */
router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: Math.floor((Date.now() - startTime) / 1000),
    version: '1.0.0',
    services: {
      cache: cacheService.stats(),
      openai: openaiService.isAvailable() ? 'available' : 'not configured',
    },
  });
});

export default router;
