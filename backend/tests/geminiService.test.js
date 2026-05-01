/**
 * @fileoverview Tests for the geminiService.
 * Tests prompt construction, error handling, and caching behavior.
 */

import { jest } from '@jest/globals';

// Mock the @google/genai SDK
const mockGenerateContent = jest.fn();

jest.unstable_mockModule('@google/genai', () => ({
  GoogleGenAI: jest.fn().mockImplementation(() => ({
    models: {
      generateContent: mockGenerateContent,
    },
  })),
}));

// Mock fs to prevent credential file reads
jest.unstable_mockModule('fs', () => ({
  default: {
    existsSync: jest.fn().mockReturnValue(false),
    readFileSync: jest.fn().mockReturnValue('{}'),
  },
  existsSync: jest.fn().mockReturnValue(false),
  readFileSync: jest.fn().mockReturnValue('{}'),
}));

let geminiService;
let cacheService;

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  process.env.GEMINI_API_KEY = 'test-api-key';

  geminiService = (await import('../src/services/geminiService.js')).default;
  cacheService = (await import('../src/services/cacheService.js')).default;
});

beforeEach(() => {
  jest.clearAllMocks();
  cacheService.flush();
});

describe('geminiService.chat()', () => {
  it('calls the Gemini SDK and returns a parsed JSON response', async () => {
    const mockResponse = {
      headline: 'Voter Registration',
      body: 'You can register via Form 6.',
      steps: ['Step 1'],
      actions: [],
      followUps: [],
    };

    mockGenerateContent.mockResolvedValue({
      text: JSON.stringify(mockResponse),
    });

    const result = await geminiService.chat('How do I register to vote?');

    expect(mockGenerateContent).toHaveBeenCalled();
    expect(result).toMatchObject({ headline: 'Voter Registration' });
  });

  it('wraps plain text responses in the correct structure', async () => {
    mockGenerateContent.mockResolvedValue({
      text: 'This is a plain text response from Gemini.',
    });

    const result = await geminiService.chat('Tell me about elections');

    expect(result).toHaveProperty('headline');
    expect(result).toHaveProperty('body');
    expect(result.body).toContain('plain text');
  });

  it('strips markdown fences from the response before parsing JSON', async () => {
    const mockResponse = {
      headline: 'EVM',
      body: 'EVMs are secure.',
      steps: [],
      actions: [],
      followUps: [],
    };

    mockGenerateContent.mockResolvedValue({
      text: '```json\n' + JSON.stringify(mockResponse) + '\n```',
    });

    const result = await geminiService.chat('How do EVMs work?');

    expect(result).toMatchObject({ headline: 'EVM' });
  });

  it('includes context hint in the prompt when context is provided', async () => {
    mockGenerateContent.mockResolvedValue({
      text: JSON.stringify({
        headline: 'Contextual response',
        body: 'Response with context',
        steps: [],
        actions: [],
        followUps: [],
      }),
    });

    await geminiService.chat('What are the deadlines?', 'voter_registration');

    const callArgs = mockGenerateContent.mock.calls[0][0];
    expect(callArgs.contents).toContain('voter_registration');
  });

  it('throws an error when all Gemini backends fail', async () => {
    mockGenerateContent.mockRejectedValue(new Error('API quota exceeded'));

    await expect(geminiService.chat('test message')).rejects.toThrow();
  });

  it('skips null/undefined text responses and tries the next model', async () => {
    mockGenerateContent
      .mockResolvedValueOnce({ text: null }) // First model returns null
      .mockResolvedValueOnce({ text: null }) // Second model returns null
      .mockResolvedValue({
        text: JSON.stringify({
          headline: 'Success',
          body: 'Third model succeeded',
          steps: [],
          actions: [],
          followUps: [],
        }),
      });

    const result = await geminiService.chat('test');

    // Should eventually succeed with the third model
    expect(result).toHaveProperty('headline');
  });
});

describe('geminiService.isAvailable()', () => {
  it('returns a boolean', () => {
    const available = geminiService.isAvailable();
    expect(typeof available).toBe('boolean');
  });
});
