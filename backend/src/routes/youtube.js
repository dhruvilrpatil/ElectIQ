import { Router } from 'express';
import { validateYoutube } from '../middleware/validator.js';
import youtubeService from '../services/youtubeService.js';

const router = Router();

/**
 * Searches for official YouTube videos related to the given topic.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
router.get('/', validateYoutube, async (req, res, next) => {
  try {
    const result = await youtubeService.searchVideos(req.query.topic);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
