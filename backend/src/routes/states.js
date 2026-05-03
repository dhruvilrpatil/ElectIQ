import { Router } from 'express';
import stateData from '../data/stateData.js';

const router = Router();

/**
 * Retrieves a summary list of all states and their basic voting rules.
 * @param {Object} req 
 * @param {Object} res 
 */
router.get('/', (req, res) => {
  const summaries = Object.entries(stateData).map(([code, s]) => ({
    code,
    name: s.name,
    voterIdType: s.voterIdType,
    hasEarlyVoting: s.earlyVoting,
    hasMailIn: s.mailIn,
  }));
  res.set('Cache-Control', 'public, max-age=3600');
  res.json(summaries);
});

/**
 * Retrieves detailed voting information for a specific state code.
 * @param {Object} req 
 * @param {Object} res 
 */
router.get('/:code', (req, res) => {
  const code = req.params.code.toUpperCase();
  const state = stateData[code];
  if (!state) return res.status(404).json({ error: `State code '${code}' not found.` });
  res.set('Cache-Control', 'public, max-age=3600');
  res.json({ code, ...state });
});

export default router;
