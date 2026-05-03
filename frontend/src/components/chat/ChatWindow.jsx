import { useRef, useEffect } from 'react';
import { useChat } from '../../hooks/useChat.js';
import ChatMessage from './ChatMessage.jsx';
import ChatInput from './ChatInput.jsx';
import TypingIndicator from './TypingIndicator.jsx';

/**
 * Renders the main chat window, displaying the conversation history and the input area.
 */
export default function ChatWindow() {
  const { messages, isLoading } = useChat();
  const logRef = useRef(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <section aria-label="Election assistant chat" className="chat-window">
      <div id="chat-log" ref={logRef} role="log" aria-live="polite" aria-label="Conversation history" className="chat-log">
        {messages.length === 0 && (
          <div className="chat-empty">
            <h2>Welcome to ElectIQ</h2>
            <p>Ask me anything about Indian elections, voter registration, or ECI procedures.</p>
          </div>
        )}
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
      </div>
      <ChatInput />
    </section>
  );
}
