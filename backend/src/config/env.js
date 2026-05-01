/**
 * @fileoverview Environment variable validation for the ElectIQ backend.
 * Validates required environment variables at startup and throws clear errors for missing ones.
 */

/**
 * List of environment variables that must be present for the application to start.
 * Variables marked as required will cause startup failure if missing.
 */
const REQUIRED_VARS = [];

/**
 * Variables that are required in production but optional in development.
 */
const PRODUCTION_REQUIRED_VARS = [
  'GEMINI_API_KEY',
  'FRONTEND_URL',
];

/**
 * Optional variables with their descriptions for documentation.
 */
const OPTIONAL_VARS = {
  GEMINI_API_KEY: 'Google Gemini API key for AI chat responses',
  GOOGLE_APPLICATION_CREDENTIALS: 'Path to GCP service account JSON for Vertex AI',
  GOOGLE_CLOUD_PROJECT: 'GCP project ID for Vertex AI',
  FRONTEND_URL: 'Allowed frontend origin for CORS (e.g. https://yourdomain.com)',
  GOOGLE_SEARCH_API_KEY: 'Google Custom Search API key for ECI document lookup',
  GOOGLE_CSE_ID: 'Google Custom Search Engine ID',
  YOUTUBE_API_KEY: 'YouTube Data API v3 key for video search',
  GOOGLE_TRANSLATE_API_KEY: 'Google Cloud Translation API key for multilingual support',
  PORT: 'Port for the Express server (default: 3001)',
  NODE_ENV: 'Runtime environment (development | production | test)',
  LOG_LEVEL: 'Winston log level (default: info)',
  CACHE_TTL: 'Cache TTL in seconds (default: 3600)',
};

/**
 * Validates that all required environment variables are set.
 * In production, also validates production-required variables.
 *
 * @returns {void}
 * @throws {Error} If any required environment variable is missing.
 */
export function validateEnv() {
  const missing = [];

  // Always-required vars
  for (const varName of REQUIRED_VARS) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }

  // Production-required vars
  if (process.env.NODE_ENV === 'production') {
    for (const varName of PRODUCTION_REQUIRED_VARS) {
      if (!process.env[varName]) {
        missing.push(varName);
      }
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `[ElectIQ] Missing required environment variables:\n` +
      missing.map((v) => `  - ${v}: ${OPTIONAL_VARS[v] || 'No description'}`).join('\n') +
      '\n\nCreate a backend/.env file with these variables. See README.md for details.'
    );
  }

  // Warn about missing optional-but-important vars
  const important = ['GEMINI_API_KEY'];
  for (const varName of important) {
    if (!process.env[varName] && process.env.NODE_ENV !== 'test') {
      // Use process.stderr to avoid winston circular dependency at startup
      process.stderr.write(
        `[ElectIQ] WARN: ${varName} is not set. ${OPTIONAL_VARS[varName] || ''}\n`
      );
    }
  }
}

export default { validateEnv };
