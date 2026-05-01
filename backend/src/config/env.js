import 'dotenv/config';

/**
 * Validates the presence of required environment variables.
 * @throws {Error} If any required environment variable is missing.
 */
export function validateEnv() {
  const required = [
    'FRONTEND_URL',
    'GEMINI_API_KEY',
    'GOOGLE_CSE_API_KEY',
    'GOOGLE_CSE_CX',
    'YOUTUBE_API_KEY',
    'GOOGLE_TRANSLATE_API_KEY'
  ];

  const missing = required.filter(key => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

// Automatically validate when imported
validateEnv();

export const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL,
  geminiApiKey: process.env.GEMINI_API_KEY,
  googleCseApiKey: process.env.GOOGLE_CSE_API_KEY,
  googleCseCx: process.env.GOOGLE_CSE_CX,
  youtubeApiKey: process.env.YOUTUBE_API_KEY,
  googleTranslateApiKey: process.env.GOOGLE_TRANSLATE_API_KEY
};
