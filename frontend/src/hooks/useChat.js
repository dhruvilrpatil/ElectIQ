import { useState, useCallback } from 'react';
import useChatStore from '@/store/chatStore';
import { processInput } from '@/engine/nlpEngine';
import apiService from '@/services/api';

const RESPONSE_DELAY_MIN = 800;
const RESPONSE_DELAY_MAX = 1400;

function randomDelay() {
  return Math.floor(Math.random() * (RESPONSE_DELAY_MAX - RESPONSE_DELAY_MIN) + RESPONSE_DELAY_MIN);
}

export function useChat() {
  const { addMessage, setLoading, setContext, context, isLoading, selectedLanguage } = useChatStore();
  const [inputValue, setInputValue] = useState('');

  const sendMessage = useCallback(async (content) => {
    if (!content?.trim() || isLoading) return;

    const trimmed = content.trim();
    setInputValue('');

    // Add user message
    addMessage({ role: 'user', content: trimmed });
    setLoading(true);

    const delay = randomDelay();

    try {
      let response;

      // Try backend first
      try {
        const result = await apiService.sendChat(trimmed, context, selectedLanguage);
        response = result.response;
        if (result.intent) setContext(result.intent);
      } catch (networkErr) {
        console.error('Network error, falling back to NLP', networkErr);
        // Fall back to frontend NLP engine
        await new Promise((r) => setTimeout(r, delay));
        const nlpResult = processInput(trimmed, context);
        response = nlpResult.response;
        if (nlpResult.intent) setContext(nlpResult.intent);
      }

      addMessage({
        role: 'assistant',
        content: response.body || response.headline || 'I can help you with election information. What would you like to know?',
        headline: response.headline,
        steps: response.steps,
        actions: response.actions,
        videos: response.videos,
        followUps: response.followUps,
        intent: response.intent,
      });
    } catch (err) {
      console.error('Chat error:', err);
      addMessage({
        role: 'assistant',
        content: 'I\'m having trouble processing that request. Please try again or rephrase your question.',
        intent: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [addMessage, setLoading, setContext, context, isLoading, selectedLanguage]);

  const handleInputChange = useCallback((val) => {
    setInputValue(val);
  }, []);

  return { sendMessage, inputValue, handleInputChange, isLoading };
}

export default useChat;
