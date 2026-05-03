import { useState, useRef, useCallback } from 'react';
import { useChat } from '../../hooks/useChat.js';
import { useDebounce } from '../../hooks/useDebounce.js';

/**
 * Renders the input area for the chat interface, allowing the user to type and send messages.
 */
export default function ChatInput() {
  const [inputValue, setInputValue] = useState('');
  const { sendMessage, clearChat, isLoading } = useChat();
  const textareaRef = useRef(null);
  const debouncedValue = useDebounce(inputValue, 300);

  const handleSend = useCallback(() => {
    if (!inputValue.trim() || isLoading) return;
    sendMessage(inputValue);
    setInputValue('');
    setTimeout(() => textareaRef.current?.focus(), 0);
  }, [inputValue, isLoading, sendMessage]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  return (
    <div role="form" aria-label="Send a message" className="chat-input">
      <label htmlFor="chat-input" className="sr-only">Ask about Indian elections</label>
      <textarea
        id="chat-input"
        ref={textareaRef}
        aria-label="Ask about Indian elections"
        placeholder="e.g. How do I register to vote in Maharashtra?"
        maxLength={500}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={2}
        className="chat-input__textarea"
      />
      <div className="chat-input__actions">
        <span className="chat-input__counter" aria-live="polite" aria-atomic="true">{inputValue.length}/500</span>
        <button type="button" aria-label="Send message" onClick={handleSend} disabled={isLoading || !inputValue.trim()} className="chat-input__send">Send</button>
        <button type="button" aria-label="Clear conversation" onClick={clearChat} className="chat-input__clear">Clear</button>
      </div>
    </div>
  );
}
