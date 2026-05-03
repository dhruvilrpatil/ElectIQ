import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';

// Mock environment variables before any imports
vi.stubEnv('GEMINI_API_KEY', 'test-key');
vi.stubEnv('GOOGLE_CSE_API_KEY', 'test-cse-key');
vi.stubEnv('GOOGLE_CSE_CX', 'test-cx');
vi.stubEnv('YOUTUBE_API_KEY', 'test-yt-key');
vi.stubEnv('GOOGLE_TRANSLATE_API_KEY', 'test-translate-key');
vi.stubEnv('FRONTEND_URL', 'http://localhost:5173');
vi.stubEnv('NODE_ENV', 'test');
vi.stubEnv('PORT', '5000');

// Mock geminiService
vi.mock('../src/services/geminiService.js', () => ({
  default: {
    chat: vi.fn(),
    isAvailable: vi.fn(() => true),
  },
  chat: vi.fn(),
  isAvailable: vi.fn(() => true),
}));

const { default: request } = await import('supertest');
const { default: app } = await import('../src/server.js');
const geminiService = (await import('../src/services/geminiService.js')).default;

describe('POST /api/chat', () => {
  it('returns 200 with response for valid input', async () => {
    geminiService.chat.mockResolvedValueOnce('You can register at eci.gov.in.');

    const res = await request(app)
      .post('/api/chat')
      .send({ message: 'How do I register to vote?', language: 'en' });

    expect(res.status).toBe(200);
    expect(res.body.response).toBeTruthy();
    expect(typeof res.body.response).toBe('string');
  });

  it('returns 400 when message is empty', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: '' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
  });

  it('returns 400 when message exceeds 500 characters', async () => {
    const longMessage = 'a'.repeat(501);
    const res = await request(app)
      .post('/api/chat')
      .send({ message: longMessage });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain('500 characters');
  });

  it('sanitises HTML injection in message', async () => {
    geminiService.chat.mockResolvedValueOnce('Safe response.');

    await request(app)
      .post('/api/chat')
      .send({ message: '<script>alert(1)</script>How to vote?' });

    // The sanitised message passed to geminiService should NOT contain <script>
    const calledWith = geminiService.chat.mock.calls[0][0];
    expect(calledWith).not.toContain('<script>');
  });

  it('returns 400 when language is unsupported', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: 'Hello', language: 'xx' });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain('Unsupported language');
  });
});
