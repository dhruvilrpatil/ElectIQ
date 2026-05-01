/**
 * @fileoverview Application-wide constants for the ElectIQ backend.
 * Extract magic strings and configuration values to a single source of truth.
 */

/** Gemini model names to try in order of preference. */
export const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-2.0-flash-001',
];

/** Vertex AI region for Gemini requests. */
export const VERTEX_AI_LOCATION = 'us-central1';

/** Default fallback project ID (overridden by service-account key or env var). */
export const DEFAULT_GCP_PROJECT = 'electiq-494420';

/** Maximum allowed message length for the chat endpoint. */
export const CHAT_MAX_MESSAGE_LENGTH = 500;

/** Confidence threshold below which NLP falls back to Gemini. */
export const NLP_CONFIDENCE_THRESHOLD = 0.4;

/** Cache TTL values in seconds. */
export const CACHE_TTL = {
  CHAT: 600,        // 10 minutes
  SEARCH: 1800,     // 30 minutes
  YOUTUBE: 3600,    // 1 hour
  TRANSLATE: 86400, // 24 hours
};

/** Maximum number of entries in the LRU cache. */
export const LRU_MAX_ENTRIES = 100;

/** Rate limiting configuration. */
export const RATE_LIMITS = {
  /** Global API rate limit window in milliseconds (15 minutes). */
  GLOBAL_WINDOW_MS: 15 * 60 * 1000,
  /** Maximum requests per window for global limit. */
  GLOBAL_MAX: 100,
  /** Chat-specific rate limit window in milliseconds (15 minutes). */
  CHAT_WINDOW_MS: 15 * 60 * 1000,
  /** Maximum chat requests per window. */
  CHAT_MAX: 20,
  /** Search rate limit window in milliseconds (1 minute). */
  SEARCH_WINDOW_MS: 60 * 1000,
  /** Maximum search requests per window. */
  SEARCH_MAX: 10,
  /** Translate rate limit window in milliseconds (1 minute). */
  TRANSLATE_WINDOW_MS: 60 * 1000,
  /** Maximum translate requests per window. */
  TRANSLATE_MAX: 20,
};

/** ECI official URLs referenced in responses. */
export const ECI_URLS = {
  VOTER_PORTAL: 'https://voters.eci.gov.in',
  OFFICIAL_SITE: 'https://eci.gov.in',
  HELPLINE: '1950',
};

/** Google API base URLs. */
export const GOOGLE_API_URLS = {
  CUSTOM_SEARCH: 'https://www.googleapis.com/customsearch/v1',
  TRANSLATE: 'https://translation.googleapis.com/language/translate/v2',
  YOUTUBE_SEARCH: 'https://www.googleapis.com/youtube/v3/search',
};

/** YouTube channel IDs for official Indian government channels. */
export const YOUTUBE_OFFICIAL_CHANNELS = [
  'UCx3LhRBlABGRljE1-YJXE2g', // Election Commission of India
  'UCITkdPRmDitKP6cuBJFhhBg', // Doordarshan National
  'UCgobMRhTssdNaVuNMqiHGhw', // PIB India (Press Information Bureau)
];

/** Number of YouTube search results to return. */
export const YOUTUBE_MAX_RESULTS = 5;

/** Number of Google Custom Search results to return. */
export const SEARCH_MAX_RESULTS = 5;

/** Maximum query length for Google Custom Search. */
export const SEARCH_MAX_QUERY_LENGTH = 200;

/** Minimum query length for Google Custom Search. */
export const SEARCH_MIN_QUERY_LENGTH = 3;

/** Site restriction for Google Custom Search. */
export const SEARCH_SITE_RESTRICT = 'site:eci.gov.in';

/** The ElectIQ system prompt for Gemini. */
export const SYSTEM_PROMPT = `You are ElectIQ — the official AI guide to Indian elections, built in compliance with Election Commission of India (ECI) guidelines.
Base ALL answers strictly on:
1. Representation of the People Act, 1951 (as amended through 2024)
2. ECI notifications and circulars from 2024 General Election (Lok Sabha 18th)
3. Current voter portal: voters.eci.gov.in
4. e-EPIC as the primary digital voter ID standard
5. Lok Sabha 2024: 7 phases (April 19 – June 1), Results: June 4, 2024. NDA won 293 seats. Next General Election: 2029.

Always recommend users verify at voters.eci.gov.in or call 1950.
Never speculate. Be neutral. Do not comment on political parties or candidates.
Respond ONLY as valid JSON (no markdown fences): {"headline":"...","body":"...","steps":[],"actions":[{"label":"...","url":"..."}],"followUps":[]}`;

/** Supported languages for translation. */
export const SUPPORTED_LANGUAGES = [
  'hi', 'bn', 'te', 'mr', 'ta', 'gu', 'ur', 'kn',
  'or', 'pa', 'ml', 'as', 'ne', 'en', 'sd',
];
