import { Router } from 'express';
import { searchLimiter } from '../middleware/rateLimiter.js';
import { validateSearch } from '../middleware/validator.js';
import searchService from '../services/searchService.js';

const router = Router();

/**
 * Performs a custom search against the official ECI website.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
router.get('/', searchLimiter, validateSearch, async (req, res, next) => {
  try {
    const results = await searchService.searchECI(req.query.q);
    res.json({ results });
  } catch (err) {
    next(err);
  }
});

export default router;
