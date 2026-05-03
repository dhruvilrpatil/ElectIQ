import { useEffect } from 'react';
import ChatWindow from '../components/Chat/ChatWindow.jsx';
import useLanguageStore from '../store/languageStore.js';

/**
 * Renders the main chat interface and registers necessary UI strings for translation.
 */
export default function ChatPage() {
  const registerStrings = useLanguageStore((s) => s.registerStrings);

  useEffect(() => {
    // Register UI strings used in this page for translation
    registerStrings([
      'Chat Assistant',
      'Seat Analysis',
      'Welcome to ElectIQ',
      'Ask me anything about Indian elections, voter registration, or ECI procedures.',
      'Send message',
      'Clear conversation',
      'Official ECI Sources',
      'Educational Videos'
    ]);
  }, [registerStrings]);

  return (
    <main className="page chat-page" id="main-content">
      <ChatWindow />
    </main>
  );
}
