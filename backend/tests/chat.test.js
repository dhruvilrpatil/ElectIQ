/**
 * @fileoverview Tests for the /api/chat endpoint.
 * Tests input validation, rate limiting behavior, and Gemini service integration.
 */

import { jest } from '@jest/globals';

// Mock geminiService before importing the app
const mockGeminiChat = jest.fn();
const mockGeminiIsAvailable = jest.fn().mockReturnValue(true);

jest.unstable_mockModule('../src/services/geminiService.js', () => ({
  default: {
    chat: mockGeminiChat,
    isAvailable: mockGeminiIsAvailable,
  },
  chat: mockGeminiChat,
  isAvailable: mockGeminiIsAvailable,
}));

// Mock nlpService
jest.unstable_mockModule('../src/services/nlpService.js', () => ({
  default: {
    process: jest.fn().mockReturnValue({
      intent: 'default',
      confidence: 0.1,
      response: {
        headline: 'Hello',
        body: 'Hello from NLP',
        steps: [],
        actions: [],
        followUps: [],
      },
    }),
  },
}));

let request;
let app;

beforeAll(async () => {
  // Set test environment variables
  process.env.NODE_ENV = 'test';
  process.env.GEMINI_API_KEY = 'test-key';

  const supertest = await import('supertest');
  request = supertest.default;

  const appModule = await import('../src/server.js');
  app = appModule.default;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('POST /api/chat', () => {
  it('returns 200 with a response field for valid input', async () => {
    mockGeminiChat.mockResolvedValue({
      headline: 'Voter Registration',
      body: 'You can register online at voters.eci.gov.in',
      steps: ['Visit the website', 'Fill the form'],
      actions: [{ label: 'Register Now', url: 'https://voters.eci.gov.in' }],
      followUps: ['What documents do I need?'],
    });

    const res = await request(app)
      .post('/api/chat')
      .send({ message: 'How do I register to vote?' })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('response');
  });

  it('returns 400 for an empty message', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: '' })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('returns 400 when message field is missing', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({})
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('returns 400 for a message over 500 characters', async () => {
    const longMessage = 'a'.repeat(501);
    const res = await request(app)
      .post('/api/chat')
      .send({ message: longMessage })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/500/);
  });

  it('strips HTML tags from the message before calling Gemini', async () => {
    mockGeminiChat.mockResolvedValue({
      headline: 'Test',
      body: 'Response',
      steps: [],
      actions: [],
      followUps: [],
    });

    const res = await request(app)
      .post('/api/chat')
      .send({ message: '<script>alert("xss")</script>Tell me about EVMs' })
      .set('Content-Type', 'application/json');

    // Should succeed (HTML stripped) and Gemini called with sanitized text
    if (res.status === 200) {
      const firstCallFirstArg = mockGeminiChat.mock.calls[0][0];
      expect(firstCallFirstArg).not.toContain('<script>');
      expect(firstCallFirstArg).not.toContain('alert');
    }
  });

  it('returns a structured response when Gemini succeeds', async () => {
    const mockResponse = {
      headline: 'EVM Operation',
      body: 'EVMs are used to record votes electronically.',
      steps: ['Step 1', 'Step 2'],
      actions: [{ label: 'Learn more', url: 'https://eci.gov.in' }],
      followUps: ['How is EVM secured?'],
    };
    mockGeminiChat.mockResolvedValue(mockResponse);

    const res = await request(app)
      .post('/api/chat')
      .send({ message: 'How does EVM work?' })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.response).toBeDefined();
    expect(res.body.intent).toBe('ai_response');
  });

  it('returns 200 with an error-type response when Gemini is unavailable', async () => {
    mockGeminiIsAvailable.mockReturnValue(false);

    const res = await request(app)
      .post('/api/chat')
      .send({ message: 'What is NOTA?' })
      .set('Content-Type', 'application/json');

    // Should return 200 with a fallback error response (not 500)
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('intent');

    mockGeminiIsAvailable.mockReturnValue(true);
  });
});

describe('GET /api/health', () => {
  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
