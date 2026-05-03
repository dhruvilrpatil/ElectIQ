import { describe, it, expect, vi } from 'vitest';

vi.stubEnv('GEMINI_API_KEY', 'test-key');
vi.stubEnv('GOOGLE_CSE_API_KEY', 'test-cse-key');
vi.stubEnv('GOOGLE_CSE_CX', 'test-cx');
vi.stubEnv('YOUTUBE_API_KEY', 'test-yt-key');
vi.stubEnv('GOOGLE_TRANSLATE_API_KEY', 'test-translate-key');
vi.stubEnv('FRONTEND_URL', 'http://localhost:5173');
vi.stubEnv('NODE_ENV', 'test');

const mockAxiosPost = vi.fn();

vi.mock('axios', () => ({
  default: { post: (...args) => mockAxiosPost(...args) },
}));

const { translateStrings } = await import('../src/services/translateService.js');

describe('translateService', () => {
  it('returns original strings if target language is en', async () => {
    const result = await translateStrings(['Hello'], 'en');
    expect(result).toEqual(['Hello']);
  });

  it('translates strings correctly', async () => {
    mockAxiosPost.mockResolvedValueOnce({
      data: {
        data: {
          translations: [{ translatedText: 'नमस्ते' }],
        },
      },
    });

    const result = await translateStrings(['Hello'], 'hi');
    expect(result).toEqual(['नमस्ते']);
    expect(mockAxiosPost).toHaveBeenCalled();
  });

  it('returns original strings on API error as fallback', async () => {
    mockAxiosPost.mockRejectedValueOnce(new Error('API error'));

    const result = await translateStrings(['Hello'], 'hi');
    expect(result).toEqual(['Hello']);
  });
});
