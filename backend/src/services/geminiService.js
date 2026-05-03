import { GoogleGenerativeAI } from '@google/generative-ai';
import config from '../config/env.js';
import {
  GEMINI_MODEL_NAME,
  SYSTEM_PROMPT_TEMPLATE,
  CACHE_TTL_MS,
} from '../config/constants.js';
import cacheService from './cacheService.js';
import { hashPrompt } from '../utils/hashUtil.js';
import logger from '../utils/logger.js';
import { AppError } from '../middleware/errorHandler.js';

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

/**
 * Sends a user message to the Gemini API with full conversation history.

 * @param {string} sanitisedMessage - The user's sanitised input.
 * @param {Array<{role: string, parts: Array}>} history - Prior turns.
 * @param {string} languageCode - BCP-47 language code (e.g., 'hi', 'ta').
 * @param {boolean} streaming - Whether to return a stream.
 * @returns {Promise<string|object>} The model's response text or stream.
 */
export async function chat(sanitisedMessage, history = [], languageCode = 'en', streaming = false) {
  // Build system prompt with language injected
  const systemPrompt = SYSTEM_PROMPT_TEMPLATE.replace('{languageCode}', languageCode);

  // Build cache key from message + language + last 4 history turns
  const recentHistory = history.slice(-4);
  const cacheKey = hashPrompt(
    sanitisedMessage + languageCode + JSON.stringify(recentHistory)
  );

  // Check cache (only for non-streaming requests)
  if (!streaming) {
    const cached = cacheService.get(cacheKey);
    if (cached !== undefined) {
      logger.info('Gemini: cache hit');
      return cached;
    }
  }

  try {
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL_NAME,
      systemInstruction: systemPrompt,
    });

    const chatSession = model.startChat({
      history: history.map((msg) => ({
        role: msg.role,
        parts: msg.parts || [{ text: msg.content || '' }],
      })),
    });

    if (streaming) {
      const result = await chatSession.sendMessageStream(sanitisedMessage);
      return result.stream;
    }

    const result = await chatSession.sendMessage(sanitisedMessage);
    const responseText = result.response.text();

    // Cache the successful result
    cacheService.set(cacheKey, responseText, CACHE_TTL_MS);

    return responseText;
  } catch (err) {
    logger.error('Gemini API error', {
      message: err.message?.slice(0, 200),
      status: err.status || err.code,
    });

    // Map Gemini errors to AppError types — never expose raw messages
    const status = err.status || err.code || 0;
    const msg = (err.message || '').toLowerCase();

    if (status === 429 || msg.includes('resource_exhausted') || msg.includes('quota')) {
      throw new AppError('AI rate limit exceeded. Please try again later.', 429, 'AI_QUOTA_EXCEEDED');
    }
    if (status === 400 || msg.includes('invalid_argument') || msg.includes('invalid')) {
      throw new AppError('Invalid request to AI service.', 400, 'INVALID_REQUEST');
    }
    throw new AppError('AI service is temporarily unavailable.', 503, 'AI_SERVICE_ERROR');
  }
}

/**
 * Checks if the Gemini API key is configured.
 * @returns {boolean} True if the API key is present.
 */
export const isAvailable = () => Boolean(config.geminiApiKey);

export default { chat, isAvailable };