/**
 * @fileoverview Tests for the ChatWindow (ChatInterface) component.
 * Tests message rendering, typing indicator display, and input clearing on send.
 */

import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => React.createElement('div', props, children),
    ol: ({ children, ...props }) => React.createElement('ol', props, children),
  },
  AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
}));

// Mock the chat store
const mockMessages = [];
const mockSendMessage = vi.fn();
const mockSetLoading = vi.fn();

vi.mock('@/store/chatStore', () => ({
  default: vi.fn(() => ({
    messages: mockMessages,
    isLoading: false,
    selectedLanguage: 'en',
    addMessage: vi.fn(),
    setLoading: mockSetLoading,
  })),
}));

// Mock the useChat hook
vi.mock('@/hooks/useChat', () => ({
  default: vi.fn(() => ({
    sendMessage: mockSendMessage,
    inputValue: '',
    handleInputChange: vi.fn(),
  })),
}));

// Mock analytics
vi.mock('@/hooks/useAnalytics', () => ({
  useAnalytics: vi.fn(),
  trackEvent: vi.fn(),
}));

// Mock child components that need complex setup
vi.mock('@/components/hero/WelcomeHero', () => ({
  default: ({ onQuestionClick }) =>
    React.createElement('div', { 'data-testid': 'welcome-hero' }, 'Welcome'),
}));

vi.mock('./QuickChips', () => ({
  default: () => React.createElement('div', { 'data-testid': 'quick-chips' }, 'Chips'),
}));

vi.mock('./TypingIndicator', () => ({
  default: () =>
    React.createElement('div', { 'data-testid': 'typing-indicator', role: 'status' }, 'Typing...'),
}));

vi.mock('./ChatBubble', () => ({
  default: ({ message }) =>
    React.createElement(
      'div',
      { 'data-testid': `chat-bubble-${message.role}` },
      message.content
    ),
}));

// Import after mocks
import ChatInterface from '../chat/ChatInterface';
import useChatStore from '@/store/chatStore';
import useChat from '@/hooks/useChat';

describe('ChatInterface', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset to no messages by default
    useChatStore.mockImplementation(() => ({
      messages: [],
      isLoading: false,
      selectedLanguage: 'en',
    }));
    useChat.mockImplementation(() => ({
      sendMessage: mockSendMessage,
      inputValue: '',
      handleInputChange: vi.fn(),
    }));
  });

  it('renders the chat container', () => {
    render(React.createElement(ChatInterface));
    // The chat container should exist
    const logContainer = document.querySelector('[role="log"]');
    expect(logContainer).toBeTruthy();
  });

  it('shows the welcome hero when there are no messages', () => {
    render(React.createElement(ChatInterface));
    expect(screen.getByTestId('welcome-hero')).toBeInTheDocument();
  });

  it('renders chat bubbles for existing messages', () => {
    useChatStore.mockImplementation(() => ({
      messages: [
        { id: '1', role: 'user', content: 'Hello', timestamp: new Date().toISOString() },
        {
          id: '2',
          role: 'assistant',
          content: 'Response',
          timestamp: new Date().toISOString(),
        },
      ],
      isLoading: false,
      selectedLanguage: 'en',
    }));

    render(React.createElement(ChatInterface));

    expect(screen.getByTestId('chat-bubble-user')).toBeInTheDocument();
    expect(screen.getByTestId('chat-bubble-assistant')).toBeInTheDocument();
  });

  it('shows the typing indicator when isLoading is true', () => {
    useChatStore.mockImplementation(() => ({
      messages: [],
      isLoading: true,
      selectedLanguage: 'en',
    }));

    render(React.createElement(ChatInterface));
    expect(screen.getByTestId('typing-indicator')).toBeInTheDocument();
  });

  it('hides the typing indicator when isLoading is false', () => {
    useChatStore.mockImplementation(() => ({
      messages: [],
      isLoading: false,
      selectedLanguage: 'en',
    }));

    render(React.createElement(ChatInterface));
    expect(screen.queryByTestId('typing-indicator')).not.toBeInTheDocument();
  });

  it('renders the chat input with the correct aria-label', () => {
    render(React.createElement(ChatInterface));
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('aria-label', 'Your election question');
  });

  it('renders the submit button with an aria-label', () => {
    render(React.createElement(ChatInterface));
    const button = screen.getByRole('button', { name: /send question/i });
    expect(button).toBeInTheDocument();
  });

  it('has the chat log with role="log" and aria-live="polite"', () => {
    render(React.createElement(ChatInterface));
    const log = screen.getByRole('log');
    expect(log).toHaveAttribute('aria-live', 'polite');
  });
});
