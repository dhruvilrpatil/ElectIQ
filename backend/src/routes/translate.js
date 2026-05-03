import { Router } from 'express';
import translateService from '../services/translateService.js';

const router = Router();

/**
 * Translates an array of text strings into the specified target language.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
router.post('/', async (req, res, next) => {
  try {
    const { strings, targetLang } = req.body;

    if (!Array.isArray(strings) || strings.length === 0) {
      return res.status(400).json({ error: 'strings must be a non-empty array.' });
    }
    if (!targetLang || typeof targetLang !== 'string') {
      return res.status(400).json({ error: 'targetLang is required.' });
    }

    const translated = await translateService.translateStrings(strings, targetLang);
    return res.json({ translations: translated });
  } catch (err) {
    next(err);
  }
});

export default router;
