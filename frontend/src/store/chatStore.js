import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useChatStore = create(
  persist(
    (set) => ({
      messages: [],
      context: null,
      isLoading: false,
      inputHistory: [],
      selectedState: null,
      selectedLanguage: 'en',
      theme: 'light',

      addMessage: (message) => {
        const msg = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toISOString(),
          ...message,
        };
        set((state) => {
          const newMessages = [...state.messages, msg];
          // Track user messages for sidebar history
          let newHistory = state.inputHistory;
          if (message.role === 'user') {
            newHistory = [
              { id: msg.id, content: message.content, timestamp: msg.timestamp },
              ...state.inputHistory,
            ].slice(0, 5);
          }
          return { messages: newMessages, inputHistory: newHistory };
        });
        return msg;
      },

      setLoading: (bool) => set({ isLoading: bool }),

      setContext: (intent) => set({ context: intent }),

      clearHistory: () => set({ messages: [], context: null, inputHistory: [] }),

      setSelectedState: (stateCode) => set({ selectedState: stateCode }),

      setSelectedLanguage: (lang) => set({ selectedLanguage: lang }),

      setTheme: (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('electiq-theme', theme);
        set({ theme });
      },
    }),
    {
      name: 'electiq-store',
      partialize: (state) => ({
        inputHistory: state.inputHistory,
        selectedState: state.selectedState,
        selectedLanguage: state.selectedLanguage,
        theme: state.theme,
      }),
    }
  )
);

export default useChatStore;
