import { create } from 'zustand';
import { sendChatMessage, searchECIDocuments, fetchYoutubeVideos } from '../services/api.js';
import { MAX_CHAT_HISTORY } from '../utils/constants.js';

/**
 * Zustand store for managing chat history, API interactions, and multimedia context.
 */

/**
 * Detects if the AI response references ECI documents.
 * @param {string} text
 * @returns {string|null} Search query or null.
 */
function detectDocumentReference(text) {
  const patterns = [
    /(?:Form|form)\s*(\d+[A-Z]?)/,
    /(?:Section|section)\s*(\d+)/,
    /(?:Rule|rule)\s*(\d+)/,
    /voters\.eci\.gov\.in/i,
    /eci\.gov\.in/i,
    /Representation of the People/i,
  ];
  for (const p of patterns) {
    const match = text.match(p);
    if (match) return match[0];
  }
  return null;
}

/**
 * Extracts a topic keyword from the AI response for YouTube search.
 * @param {string} text
 * @returns {string|null}
 */
function extractTopic(text) {
  const topics = [
    'voter registration', 'EVM', 'VVPAT', 'NOTA', 'postal ballot',
    'Model Code of Conduct', 'e-EPIC', 'polling booth', 'election process',
    'voter ID', 'electoral roll', 'counting process', 'election results',
  ];
  const lower = text.toLowerCase();
  for (const t of topics) {
    if (lower.includes(t.toLowerCase())) return t;
  }
  return null;
}

const useChatStore = create((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,
  streamingToken: '',

  sendMessage: async (text) => {
    if (!text?.trim() || get().isLoading) return;

    const userMessage = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toISOString(),
    };

    // Optimistic UI: add user message immediately
    set((state) => ({
      messages: [...state.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      // Build history from last MAX_CHAT_HISTORY turns
      const currentMessages = get().messages;
      const history = currentMessages.slice(-MAX_CHAT_HISTORY).map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

      // Get language from languageStore if available
      const language = window.__electiqLanguage || 'en';
      const data = await sendChatMessage(text.trim(), history, language);

      const assistantMessage = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString(),
      };

      set((state) => ({
        messages: [...state.messages, assistantMessage],
      }));

      // Check for ECI document references
      const docRef = detectDocumentReference(data.response);
      if (docRef) {
        try {
          const docData = await searchECIDocuments(docRef);
          if (docData.results?.length > 0) {
            set((state) => ({
              messages: state.messages.map((m) =>
                m.id === assistantMessage.id
                  ? { ...m, documents: docData.results }
                  : m
              ),
            }));
          }
        } catch {
          /* silently fail — documents are supplementary */
        }
      }

      // Extract topic for YouTube videos
      const topic = extractTopic(data.response);
      if (topic) {
        try {
          const videoData = await fetchYoutubeVideos(topic);
          if (!videoData.quotaExceeded && videoData.results?.length > 0) {
            set((state) => ({
              messages: state.messages.map((m) =>
                m.id === assistantMessage.id
                  ? { ...m, videos: videoData.results }
                  : m
              ),
            }));
          }
        } catch {
          /* silently fail — videos are supplementary */
        }
      }
    } catch (err) {
      set({ error: err.message || 'An error occurred.' });
    } finally {
      set({ isLoading: false });
    }
  },

  clearChat: () => set({ messages: [], error: null, streamingToken: '' }),

  setError: (msg) => set({ error: msg }),

  appendStreamToken: (token) =>
    set((state) => ({ streamingToken: state.streamingToken + token })),
}));

export default useChatStore;
