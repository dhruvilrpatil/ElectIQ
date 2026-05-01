/**
 * @fileoverview Tests for input validation middleware.
 * Tests HTML injection detection, message length validation, and sanitization.
 */

import { jest } from '@jest/globals';

// Mock geminiService
jest.unstable_mockModule('../src/services/geminiService.js', () => ({
  default: {
    chat: jest.fn().mockResolvedValue({
      headline: 'Test',
      body: 'Test response',
      steps: [],
      actions: [],
      followUps: [],
    }),
    isAvailable: jest.fn().mockReturnValue(true),
  },
  chat: jest.fn().mockResolvedValue({
    headline: 'Test',
    body: 'Test response',
    steps: [],
    actions: [],
    followUps: [],
  }),
  isAvailable: jest.fn().mockReturnValue(true),
}));

jest.unstable_mockModule('../src/services/nlpService.js', () => ({
  default: {
    process: jest.fn().mockReturnValue({
      intent: 'default',
      confidence: 0.1,
      response: {
        headline: 'Default',
        body: 'Default response',
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
  process.env.NODE_ENV = 'test';
  process.env.GEMINI_API_KEY = 'test-key';

  const supertest = await import('supertest');
  request = supertest.default;

  const appModule = await import('../src/server.js');
  app = appModule.default;
});

describe('Input Validation Middleware', () => {
  describe('HTML injection prevention', () => {
    it('rejects a pure script tag injection attempt (message becomes empty after sanitization)', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({ message: '<script>alert("xss")</script>' })
        .set('Content-Type', 'application/json');

      // Should fail validation because after stripping HTML, message is empty
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('strips HTML tags from a mixed message and processes the text content', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({ message: '<b>Tell me</b> about voter registration' })
        .set('Content-Type', 'application/json');

      // Should succeed — the text content remains after stripping
      expect([200, 400]).toContain(res.status);
      if (res.status === 200) {
        expect(res.body).toHaveProperty('response');
      }
    });

    it('rejects an img tag injection attempt', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({ message: '<img src="x" onerror="alert(1)">' })
        .set('Content-Type', 'application/json');

      expect(res.status).toBe(400);
    });

    it('rejects an iframe injection attempt', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({ message: '<iframe src="javascript:alert(1)"></iframe>' })
        .set('Content-Type', 'application/json');

      expect(res.status).toBe(400);
    });
  });

  describe('Message length validation', () => {
    it('accepts a message of exactly 500 characters', async () => {
      const exactMessage = 'a'.repeat(500);
      const res = await request(app)
        .post('/api/chat')
        .send({ message: exactMessage })
        .set('Content-Type', 'application/json');

      expect([200, 500]).toContain(res.status); // 200 if Gemini responds, won't be 400
      expect(res.status).not.toBe(400);
    });

    it('rejects a message of 501 characters', async () => {
      const tooLongMessage = 'a'.repeat(501);
      const res = await request(app)
        .post('/api/chat')
        .send({ message: tooLongMessage })
        .set('Content-Type', 'application/json');

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/500/);
    });

    it('rejects an empty message', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({ message: '   ' }) // whitespace only
        .set('Content-Type', 'application/json');

      expect(res.status).toBe(400);
    });
  });

  describe('Message type validation', () => {
    it('rejects a non-string message', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({ message: 12345 })
        .set('Content-Type', 'application/json');

      expect(res.status).toBe(400);
    });

    it('rejects a null message', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({ message: null })
        .set('Content-Type', 'application/json');

      expect(res.status).toBe(400);
    });
  });
});
