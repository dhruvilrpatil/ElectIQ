import { useRef, useEffect, useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useChatStore from '@/store/chatStore';
import useChat from '@/hooks/useChat';
import { trackEvent } from '@/hooks/useAnalytics';
import ChatBubble from './ChatBubble';
import TypingIndicator from './TypingIndicator';
import QuickChips from './QuickChips';
import WelcomeHero from '@/components/hero/WelcomeHero';
import styles from './ChatInterface.module.css';

const MAX_CHARS = 500;

export default function ChatInterface() {
  const { messages, isLoading } = useChatStore();
  const { sendMessage, inputValue, handleInputChange } = useChat();
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const [charCount, setCharCount] = useState(0);
  const showHero = messages.length === 0;

  /* Auto-scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  /* Auto-resize textarea */
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }, [inputValue]);

  /* Track newly added assistant messages for intent detection analytics */
  const prevMessageCountRef = useRef(messages.length);
  useEffect(() => {
    if (messages.length > prevMessageCountRef.current) {
      const newMsg = messages[messages.length - 1];
      if (newMsg && newMsg.role === 'assistant' && newMsg.intent) {
        trackEvent('intent_detected', {
          intent_name: newMsg.intent,
          confidence_score: newMsg.confidence || 1,
          has_state_context: !!useChatStore.getState().selectedState,
        });
      }
    }
    prevMessageCountRef.current = messages.length;
  }, [messages]);

  const submit = useCallback(() => {
    if (!inputValue.trim() || isLoading) return;

    // Track chat message sent event (metadata only, no content)
    trackEvent('chat_message_sent', {
      message_length: inputValue.trim().length,
      input_method: 'type',
    });

    sendMessage(inputValue.trim());
    setCharCount(0);
  }, [inputValue, isLoading, sendMessage]);

  const handleSubmit = useCallback((e) => { e.preventDefault(); submit(); }, [submit]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); }
  }, [submit]);

  const handleChange = useCallback((e) => {
    const val = e.target.value.slice(0, MAX_CHARS);
    handleInputChange(val);
    setCharCount(val.length);
  }, [handleInputChange]);

  const handleChipClick = useCallback((q) => {
    // Track chip click as chat message with 'chip' input method
    trackEvent('chat_message_sent', {
      message_length: q.length,
      input_method: 'chip',
    });
    sendMessage(q);
  }, [sendMessage]);

  return (
    <div className={styles.container}>
      {/* Messages */}
      <div className={styles.messages} role="log" aria-live="polite" aria-label="Chat messages" id="chat-messages">
        <AnimatePresence mode="wait">
          {showHero && <WelcomeHero key="hero" onQuestionClick={handleChipClick} />}
        </AnimatePresence>

        {messages.map((msg) => <ChatBubble key={msg.id} message={msg} onFollowUpClick={handleChipClick} />)}

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TypingIndicator />
          </motion.div>
        )}
        <div ref={messagesEndRef} aria-hidden="true" />
      </div>

      {/* Input */}
      <div className={styles.inputArea}>
        <div className={styles.inputLabel}>Ask about Indian Elections</div>
        <QuickChips onChipClick={handleChipClick} />

        <form className={styles.form} onSubmit={handleSubmit} aria-label="Ask a question about Indian elections">
          <div className={styles.inputWrapper}>
            <textarea
              ref={textareaRef}
              id="chat-input"
              className={styles.textarea}
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask about voter registration, EVMs, polling booths, MCC, NOTA…"
              rows={1}
              maxLength={MAX_CHARS}
              aria-label="Your election question"
              aria-describedby="char-counter"
              disabled={isLoading}
            />
            <span id="char-counter" className={styles.counter} aria-live="polite">
              {charCount > MAX_CHARS * 0.8 ? `${charCount}/${MAX_CHARS}` : ''}
            </span>
          </div>

          <button
            type="submit"
            className={styles.sendBtn}
            disabled={!inputValue.trim() || isLoading}
            aria-label="Send question"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
