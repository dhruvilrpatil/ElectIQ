import fetch from 'node-fetch';
import NodeCache from 'node-cache';
import logger from '../middleware/logger.js';

const cache = new NodeCache({ stdTTL: 86400 }); // 24 hours

const ALLOWED_LANGUAGES = ['hi', 'bn', 'te', 'mr', 'ta', 'gu', 'ur', 'kn', 'or', 'pa', 'ml', 'as', 'ne', 'en', 'sd'];

const translateText = async (text, targetLang) => {
  if (!text) {
    throw new Error('Text is required');
  }

  if (text.length > 5000) {
    throw new Error('Text exceeds maximum length of 5000 characters');
  }

  if (!ALLOWED_LANGUAGES.includes(targetLang)) {
    throw new Error(`Invalid target language. Allowed: ${ALLOWED_LANGUAGES.join(', ')}`);
  }

  // English to English is a no-op
  if (targetLang === 'en') {
      return { translatedText: text, detectedSourceLanguage: 'en', targetLang: 'en', cached: false };
  }

  const cacheKey = `translate_${targetLang}_${text.slice(0, 50)}`;
  const cachedResult = cache.get(cacheKey);

  if (cachedResult) {
    return { ...cachedResult, cached: true };
  }

  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey || apiKey === 'YOUR_TRANSLATE_KEY_HERE') {
      logger.warn('Google Translate API key not configured. Returning original text.');
      return { translatedText: text, detectedSourceLanguage: 'en', targetLang, cached: false, warning: 'Translation disabled (no API key)' };
  }

  try {
    const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        target: targetLang,
        format: 'text',
      }),
    });

    if (!response.ok) {
        if (response.status === 429) {
            throw new Error('Translation API rate limit exceeded', { cause: 429 });
        }
        const errorData = await response.text();
        throw new Error(`Translation API error: ${response.status} ${errorData}`, { cause: response.status });
    }

    const data = await response.json();
    
    if (!data.data || !data.data.translations || data.data.translations.length === 0) {
        throw new Error('Invalid response from Translation API');
    }

    const translation = data.data.translations[0];
    
    const result = {
      translatedText: translation.translatedText,
      detectedSourceLanguage: translation.detectedSourceLanguage,
      targetLang,
    };

    cache.set(cacheKey, result);
    return { ...result, cached: false };

  } catch (error) {
    logger.error('Translation service error:', { error: error.message });
    throw error;
  }
};

export default {
  translateText,
};
