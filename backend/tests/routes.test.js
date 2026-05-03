import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import express from 'express';

vi.stubEnv('GEMINI_API_KEY', 'test-key');
vi.stubEnv('GOOGLE_CSE_API_KEY', 'test-cse-key');
vi.stubEnv('GOOGLE_CSE_CX', 'test-cx');
vi.stubEnv('YOUTUBE_API_KEY', 'test-yt-key');
vi.stubEnv('GOOGLE_TRANSLATE_API_KEY', 'test-translate-key');
vi.stubEnv('FRONTEND_URL', 'http://localhost:5173');
vi.stubEnv('NODE_ENV', 'test');

const mockTranslateStrings = vi.fn();

vi.mock('../src/services/translateService.js', () => ({
  default: { translateStrings: mockTranslateStrings },
}));

const { default: translateRouter } = await import('../src/routes/translate.js');

describe('translate route', () => {
  const app = express();
  app.use(express.json());
  app.use('/api/translate', translateRouter);

  it('returns 400 if strings is empty', async () => {
    const res = await request(app).post('/api/translate').send({ strings: [] });
    expect(res.status).toBe(400);
  });

  it('returns 400 if targetLang is missing', async () => {
    const res = await request(app).post('/api/translate').send({ strings: ['test'] });
    expect(res.status).toBe(400);
  });

  it('returns translations on success', async () => {
    mockTranslateStrings.mockResolvedValueOnce(['tested']);
    const res = await request(app).post('/api/translate').send({ strings: ['test'], targetLang: 'hi' });
    expect(res.status).toBe(200);
    expect(res.body.translations).toEqual(['tested']);
  });
});
