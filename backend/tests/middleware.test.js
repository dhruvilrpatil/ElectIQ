import { describe, it, expect, vi } from 'vitest';

vi.stubEnv('GEMINI_API_KEY', 'test-key');
vi.stubEnv('GOOGLE_CSE_API_KEY', 'test-cse-key');
vi.stubEnv('GOOGLE_CSE_CX', 'test-cx');
vi.stubEnv('YOUTUBE_API_KEY', 'test-yt-key');
vi.stubEnv('GOOGLE_TRANSLATE_API_KEY', 'test-translate-key');
vi.stubEnv('FRONTEND_URL', 'http://localhost:5173');
vi.stubEnv('NODE_ENV', 'test');

const { default: request } = await import('supertest');
const { default: express } = await import('express');
const { validateChat } = await import('../src/middleware/validator.js');

function createTestApp() {
  const app = express();
  app.use(express.json());
  app.post('/test', validateChat, (req, res) => {
    res.json({ message: req.body.message });
  });
  return app;
}

describe('validateChat middleware', () => {
  const app = createTestApp();

  it('rejects empty message with 400', async () => {
    const res = await request(app).post('/test').send({ message: '' });
    expect(res.status).toBe(400);
  });

  it('rejects message over 500 chars with 400', async () => {
    const res = await request(app).post('/test').send({ message: 'a'.repeat(501) });
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('500 characters');
  });

  it('strips HTML from message', async () => {
    const res = await request(app)
      .post('/test')
      .send({ message: '<b>Hello</b> world' });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Hello world');
  });

  it('accepts valid message "What is NOTA?"', async () => {
    const res = await request(app).post('/test').send({ message: 'What is NOTA?' });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('What is NOTA?');
  });

  it('rejects unsupported language code', async () => {
    const res = await request(app)
      .post('/test')
      .send({ message: 'Hello', language: 'xx' });
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('Unsupported language');
  });
});
