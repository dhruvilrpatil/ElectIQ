/**
 * @fileoverview Application-wide constants for the ElectIQ frontend.
 * Centralizes magic strings, API paths, and configuration values.
 */

/** Base API URL — reads from Vite env or defaults to relative path (proxied). */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/** API endpoint paths. */
export const API_ENDPOINTS = {
  CHAT: '/api/chat',
  SEARCH: '/api/search',
  TRANSLATE: '/api/translate',
  YOUTUBE: '/api/youtube',
  STATES: '/api/states',
  HEALTH: '/api/health',
};

/** Maximum number of characters allowed in the chat input. */
export const CHAT_MAX_CHARS = 500;

/** Debounce delay for chat input in milliseconds. */
export const CHAT_DEBOUNCE_MS = 300;

/** Typewriter animation speed in milliseconds per character. */
export const TYPEWRITER_SPEED_MS = 10;

/** ECI official resource URLs. */
export const ECI_URLS = {
  VOTER_PORTAL: 'https://voters.eci.gov.in',
  OFFICIAL_SITE: 'https://eci.gov.in',
  HELPLINE_NUMBER: '1950',
};

/** Supported Indian languages for translation. */
export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা', flag: '🇮🇳' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', label: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'ur', label: 'Urdu', native: 'اردو', flag: '🇮🇳' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
  { code: 'as', label: 'Assamese', native: 'অসমীয়া', flag: '🇮🇳' },
  { code: 'ne', label: 'Nepali', native: 'नेपाली', flag: '🇮🇳' },
  { code: 'sd', label: 'Sindhi', native: 'سنڌي', flag: '🇮🇳' },
];

/** Seat data for the Hemicycle Visualizer (sourced from ECI — 18th Lok Sabha 2024). */
export const SEAT_DATA = {
  'Lok Sabha': {
    total: 543,
    alliances: [
      {
        name: 'I.N.D.I.A.',
        color: '#1E88E5',
        seats: 234,
        parties: [
          { name: 'INC', seats: 99 },
          { name: 'SP', seats: 37 },
          { name: 'TMC', seats: 29 },
          { name: 'DMK', seats: 22 },
          { name: 'Others', seats: 47 },
        ],
      },
      {
        name: 'Others',
        color: '#9E9E9E',
        seats: 16,
        parties: [
          { name: 'YSRCP', seats: 4 },
          { name: 'IND/Others', seats: 12 },
        ],
      },
      {
        name: 'NDA',
        color: '#FF8F00',
        seats: 293,
        parties: [
          { name: 'BJP', seats: 240 },
          { name: 'TDP', seats: 16 },
          { name: 'JDU', seats: 12 },
          { name: 'Others', seats: 25 },
        ],
      },
    ],
  },
  'Rajya Sabha': {
    total: 245,
    alliances: [
      {
        name: 'I.N.D.I.A.',
        color: '#1E88E5',
        seats: 87,
        parties: [
          { name: 'INC', seats: 26 },
          { name: 'TMC', seats: 13 },
          { name: 'AAP', seats: 10 },
          { name: 'DMK', seats: 10 },
        ],
      },
      {
        name: 'Others',
        color: '#9E9E9E',
        seats: 46,
        parties: [
          { name: 'BJD', seats: 9 },
          { name: 'YSRCP', seats: 11 },
          { name: 'BRS', seats: 5 },
        ],
      },
      {
        name: 'NDA',
        color: '#FF8F00',
        seats: 112,
        parties: [
          { name: 'BJP', seats: 86 },
          { name: 'NCP', seats: 3 },
          { name: 'JD(U)', seats: 4 },
        ],
      },
    ],
  },
  'Maharashtra Assembly': {
    total: 288,
    alliances: [
      {
        name: 'MVA (Opposition)',
        color: '#1E88E5',
        seats: 115,
        parties: [
          { name: 'INC', seats: 45 },
          { name: 'SS(UBT)', seats: 38 },
          { name: 'NCP(SP)', seats: 32 },
        ],
      },
      {
        name: 'Others',
        color: '#9E9E9E',
        seats: 28,
        parties: [
          { name: 'BVA', seats: 3 },
          { name: 'AIMIM', seats: 2 },
          { name: 'IND', seats: 13 },
        ],
      },
      {
        name: 'Mahayuti (Ruling)',
        color: '#FF8F00',
        seats: 145,
        parties: [
          { name: 'BJP', seats: 105 },
          { name: 'SS(Shinde)', seats: 40 },
        ],
      },
    ],
  },
  'UP Assembly': {
    total: 403,
    alliances: [
      {
        name: 'SP+ (Opposition)',
        color: '#E53935',
        seats: 125,
        parties: [
          { name: 'SP', seats: 111 },
          { name: 'RLD', seats: 9 },
          { name: 'SBSP', seats: 5 },
        ],
      },
      {
        name: 'Others',
        color: '#9E9E9E',
        seats: 5,
        parties: [
          { name: 'BSP', seats: 1 },
          { name: 'INC', seats: 2 },
          { name: 'Jansatta', seats: 2 },
        ],
      },
      {
        name: 'NDA (Ruling)',
        color: '#FF8F00',
        seats: 273,
        parties: [
          { name: 'BJP', seats: 255 },
          { name: 'Apna Dal(S)', seats: 12 },
          { name: 'NISHAD', seats: 6 },
        ],
      },
    ],
  },
};

/** Intent types that trigger the "Search Official Sources" section. */
export const SEARCHABLE_INTENTS = [
  'voter_registration',
  'evm',
  'nota',
  'polling_booth',
  'id_documents',
  'election_schedule',
  'results',
  'mcc',
  'cvigil',
  'ai',
  'ai_response',
];

/** Page routes and their document titles. */
export const PAGE_TITLES = {
  '/': 'ElectIQ India — AI Assistant',
  '/assembly': 'ElectIQ India — Parliament Composition',
  '/timeline': 'ElectIQ India — Election Timeline',
  '/state-guide': 'ElectIQ India — State Guide',
  '/voting-methods': 'ElectIQ India — Voting Methods',
  '/learn': 'ElectIQ India — Learn',
  '/settings': 'ElectIQ India — Settings',
  '/polling-locator': 'ElectIQ India — Polling Locator',
};

/** Application version. */
export const APP_VERSION = '1.0.0';
