import 'dotenv/config';

/**
 * Validates that a required environment variable is set and non-empty.
 * @param {string} name - The environment variable name.
 * @returns {string} The validated value.
 * @throws {Error} If the variable is missing or empty.
 */
function requireEnv(name) {
  const value = process.env[name];
  if (!value || value.trim() === '') {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        'See backend/.env.example for the full list of required variables.'
    );
  }
  return value.trim();
}

/**
 * Frozen configuration object — the ONLY place process.env is read.
 * Import this object everywhere else instead of reading process.env directly.
 */
const config = Object.freeze({
  geminiApiKey: requireEnv('GEMINI_API_KEY'),
  csApiKey: requireEnv('GOOGLE_CSE_API_KEY'),
  csCx: requireEnv('GOOGLE_CSE_CX'),
  youtubeApiKey: requireEnv('YOUTUBE_API_KEY'),
  translateApiKey: requireEnv('GOOGLE_TRANSLATE_API_KEY'),
  frontendUrl: requireEnv('FRONTEND_URL'),
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
});

export { config };
export default config;
