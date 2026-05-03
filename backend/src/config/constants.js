/**
 * ElectIQ — centralised constants.
 * ALL magic strings, numbers, and configuration data lives here.
 * No other file should contain hardcoded values.
 */

// Specifies the primary AI model used for text generation.
export const GEMINI_MODEL_NAME = 'gemini-1.5-flash';

// Defines the maximum number of messages retained in the chat history.
export const MAX_CHAT_HISTORY = 20;

// Configures the memory cache limits and TTLs for various endpoints.
export const CACHE_MAX_ENTRIES = 100;
export const CACHE_TTL_MS = 10 * 60 * 1000;             // 10 minutes
export const YOUTUBE_CACHE_TTL_MS = 60 * 60 * 1000;     // 1 hour
export const SEARCH_CACHE_TTL_MS = 30 * 60 * 1000;      // 30 minutes

// Configures rate limits for different API routes to prevent abuse.
export const CHAT_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
export const CHAT_RATE_LIMIT_MAX = 20;
export const GLOBAL_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
export const GLOBAL_RATE_LIMIT_MAX = 200;
export const SEARCH_RATE_LIMIT_WINDOW_MS = 60 * 1000;
export const SEARCH_RATE_LIMIT_MAX = 30;

// Defines maximum lengths for various user inputs.
export const MAX_MESSAGE_LENGTH = 500;
export const MAX_SEARCH_QUERY_LENGTH = 200;
export const MAX_YOUTUBE_TOPIC_LENGTH = 100;

// Defines search constraints for the Google Custom Search API.
export const ECI_SEARCH_SITE = 'site:eci.gov.in';

// Configures the official YouTube channels and keywords for video searches.
export const OFFICIAL_YT_CHANNEL_IDS = [
  'UCozUmHDfgkHOCa5gLLBaHFQ', // Election Commission of India
  'UCX7Gf10R0iE5i01gIitk3xA', // Doordarshan National
  'UCF1R18oxBV9hzXHEGfGODzA', // PIB India
];

export const OFFICIAL_YT_CHANNEL_KEYWORDS = [
  'ECI',
  'Election Commission',
  'Doordarshan',
  'PIB',
  'Ministry of',
  'Prasar Bharati',
];

// Lists all supported languages for translation and AI responses.
export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English',   nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi',     nativeLabel: 'हिन्दी' },
  { code: 'bn', label: 'Bengali',   nativeLabel: 'বাংলা' },
  { code: 'te', label: 'Telugu',    nativeLabel: 'తెలుగు' },
  { code: 'mr', label: 'Marathi',   nativeLabel: 'मराठी' },
  { code: 'ta', label: 'Tamil',     nativeLabel: 'தமிழ்' },
  { code: 'gu', label: 'Gujarati',  nativeLabel: 'ગુજરાતી' },
  { code: 'ur', label: 'Urdu',      nativeLabel: 'اردو' },
  { code: 'kn', label: 'Kannada',   nativeLabel: 'ಕನ್ನಡ' },
];

export const SUPPORTED_LANGUAGE_CODES = SUPPORTED_LANGUAGES.map((l) => l.code);

// Defines the total seat counts and 2024 results for the Indian Parliament.
export const LOK_SABHA_TOTAL_SEATS = 543;
export const RAJYA_SABHA_TOTAL_SEATS = 245;

/**
 * 2024 Lok Sabha seat distribution by party with alliance groupings.
 * Source: Election Commission of India — 18th Lok Sabha General Election Results.
 */
export const LOK_SABHA_2024_SEATS = [
  // NDA (National Democratic Alliance) — 293 seats
  { party: 'BJP',        seats: 240, colour: '#FF9933', alliance: 'NDA' },
  { party: 'TDP',        seats: 16,  colour: '#FFCD00', alliance: 'NDA' },
  { party: 'JD(U)',      seats: 12,  colour: '#136B4B', alliance: 'NDA' },
  { party: 'Shiv Sena',  seats: 7,   colour: '#FF6600', alliance: 'NDA' },
  { party: 'LJP(RV)',    seats: 5,   colour: '#0066CC', alliance: 'NDA' },
  { party: 'JD(S)',      seats: 2,   colour: '#008000', alliance: 'NDA' },
  { party: 'NDA Others', seats: 11,  colour: '#E8A838', alliance: 'NDA' },

  // INDIA (Indian National Developmental Inclusive Alliance) — 234 seats
  { party: 'INC',        seats: 99,  colour: '#00BFFF', alliance: 'INDIA' },
  { party: 'SP',         seats: 37,  colour: '#E60000', alliance: 'INDIA' },
  { party: 'TMC',        seats: 29,  colour: '#20C050', alliance: 'INDIA' },
  { party: 'DMK',        seats: 22,  colour: '#E61A1A', alliance: 'INDIA' },
  { party: 'SS(UBT)',    seats: 9,   colour: '#FF8C00', alliance: 'INDIA' },
  { party: 'NCP(SP)',    seats: 8,   colour: '#004080', alliance: 'INDIA' },
  { party: 'AAP',        seats: 3,   colour: '#0055A4', alliance: 'INDIA' },
  { party: 'INDIA Oth.', seats: 27,  colour: '#66B2FF', alliance: 'INDIA' },

  // Others — 16 seats
  { party: 'YSRCP',      seats: 4,   colour: '#0D47A1', alliance: 'Others' },
  { party: 'AIADMK',     seats: 0,   colour: '#006400', alliance: 'Others' },
  { party: 'Independents',seats: 7,   colour: '#9E9E9E', alliance: 'Others' },
  { party: 'Others',     seats: 5,   colour: '#757575', alliance: 'Others' },
];

// Defines the system prompt template for the Gemini chatbot.
/**
 * Template string for the Gemini system instruction.
 * Use `{languageCode}` as a placeholder — replace at runtime.
 */
export const SYSTEM_PROMPT_TEMPLATE = `You are ElectIQ — an AI assistant specialised exclusively in Indian elections, \
Election Commission of India (ECI) procedures, voter rights, electoral laws, and the \
Representation of the People Act, 1951.

STRICT RULES:
1. ONLY answer questions related to Indian elections, ECI procedures, voter registration, \
   electoral laws, the Model Code of Conduct, EVM/VVPAT operations, NOTA, and the \
   Representation of the People Act.
2. NEVER express political opinions, endorse any candidate or political party, or favour \
   any alliance. Remain completely neutral and factual.
3. Cite ECI guidelines, official circulars, and sections of the Representation of the \
   People Act when possible. Direct users to https://voters.eci.gov.in or helpline 1950 \
   for verification.
4. Respond in the language specified by the language code: {languageCode}. \
   If the code is 'en', respond in English.
5. Format responses using Markdown:
   - Use **bold** for key terms and important concepts.
   - Use bullet lists (•) for listing options or requirements.
   - Use numbered lists for step-by-step procedures.
   - Use headings (##) to separate major sections in longer answers.
6. If the user asks something outside the scope of Indian elections and electoral \
   processes, politely decline and redirect them to https://eci.gov.in for official \
   information.
7. For time-sensitive information (dates, deadlines), note that the user should verify \
   the latest details on the ECI website as dates may change.
8. Always be helpful, accurate, and concise. Prioritise clarity for first-time voters \
   and users with limited familiarity with electoral procedures.`;
