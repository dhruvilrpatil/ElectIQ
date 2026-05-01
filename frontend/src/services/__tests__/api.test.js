/**
 * @fileoverview Tests for the frontend API service wrapper.
 * Tests success and error handling for API calls using mock fetch/axios.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';

// Mock axios
vi.mock('axios', () => {
  const mockPost = vi.fn();
  const mockGet = vi.fn();
  return {
    default: {
      create: vi.fn(() => ({
        post: mockPost,
        get: mockGet,
      })),
    },
  };
});

let apiService;
let mockAxiosInstance;

beforeEach(async () => {
  vi.clearAllMocks();

  // Get a fresh reference to the mocked axios instance
  mockAxiosInstance = axios.create();

  // Re-import apiService after clearing mocks
  vi.resetModules();
  apiService = (await import('@/services/api')).default;
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('apiService.sendChat()', () => {
  it('sends a POST request to /api/chat with the message', async () => {
    mockAxiosInstance.post.mockResolvedValue({
      data: {
        intent: 'ai_response',
        response: {
          headline: 'Voter Registration',
          body: 'You can register online.',
          steps: [],
          actions: [],
          followUps: [],
        },
      },
    });

    const result = await apiService.sendChat('How do I register?');
    expect(result).toHaveProperty('intent', 'ai_response');
  });

  it('throws an error when the request fails', async () => {
    mockAxiosInstance.post.mockRejectedValue(new Error('Network error'));

    await expect(apiService.sendChat('test')).rejects.toThrow('Network error');
  });
});

describe('apiService.searchSources()', () => {
  it('sends a GET request to /api/search with the query parameter', async () => {
    mockAxiosInstance.get.mockResolvedValue({
      data: {
        results: [
          {
            title: 'ECI - Voter Registration',
            snippet: 'How to register as a voter',
            link: 'https://eci.gov.in',
            displayLink: 'eci.gov.in',
          },
        ],
        cached: false,
      },
    });

    const result = await apiService.searchSources('voter registration');
    expect(result).toHaveProperty('results');
    expect(result.results.length).toBe(1);
  });

  it('handles search API errors gracefully', async () => {
    mockAxiosInstance.get.mockRejectedValue(new Error('Search API error'));

    await expect(apiService.searchSources('test query')).rejects.toThrow('Search API error');
  });
});

describe('apiService.healthCheck()', () => {
  it('sends a GET request to /api/health', async () => {
    mockAxiosInstance.get.mockResolvedValue({
      data: { status: 'ok', uptime: 1234 },
    });

    const result = await apiService.healthCheck();
    expect(result).toHaveProperty('status', 'ok');
  });
});

describe('apiService.translateText()', () => {
  it('sends a POST request to /api/translate', async () => {
    mockAxiosInstance.post.mockResolvedValue({
      data: {
        translatedText: 'मतदाता पंजीकरण',
        detectedSourceLanguage: 'en',
        targetLang: 'hi',
        cached: false,
      },
    });

    const result = await apiService.translateText('Voter registration', 'hi');
    expect(result).toHaveProperty('translatedText', 'मतदाता पंजीकरण');
  });

  it('handles translation errors', async () => {
    mockAxiosInstance.post.mockRejectedValue(new Error('Translation service unavailable'));

    await expect(apiService.translateText('test', 'hi')).rejects.toThrow(
      'Translation service unavailable'
    );
  });
});
