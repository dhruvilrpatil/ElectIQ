import { Router } from 'express';
import { processMessage } from '../controllers/chatController.js';
import { chatRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/', chatRateLimiter, processMessage);

router.get('/history/:sessionId', (req, res) => {
  res.json({ messages: [], sessionId: req.params.sessionId });
});

export default router;
