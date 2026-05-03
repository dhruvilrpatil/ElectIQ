import useChatStore from '../store/chatStore.js';

/**
 * Provides access to chat store state and actions.
 * @returns {Object} An object containing messages, loading state, error, and chat actions.
 */
export function useChat() {
  const messages = useChatStore((state) => state.messages);
  const isLoading = useChatStore((state) => state.isLoading);
  const sendMessage = useChatStore((state) => state.sendMessage);
  const clearChat = useChatStore((state) => state.clearChat);
  const error = useChatStore((state) => state.error);
  return { messages, isLoading, sendMessage, clearChat, error };
}

export default useChat;
