import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.stubEnv('GEMINI_API_KEY', 'test-key');
vi.stubEnv('GOOGLE_CSE_API_KEY', 'test-cse-key');
vi.stubEnv('GOOGLE_CSE_CX', 'test-cx');
vi.stubEnv('YOUTUBE_API_KEY', 'test-yt-key');
vi.stubEnv('GOOGLE_TRANSLATE_API_KEY', 'test-translate-key');
vi.stubEnv('FRONTEND_URL', 'http://localhost:5173');
vi.stubEnv('NODE_ENV', 'test');

const mockAxiosGet = vi.fn();

vi.mock('axios', () => ({
  default: { get: (...args) => mockAxiosGet(...args) },
  get: (...args) => mockAxiosGet(...args),
}));

vi.mock('../src/services/cacheService.js', () => ({
  default: {
    get: vi.fn(() => undefined),
    set: vi.fn(),
    has: vi.fn(() => false),
    del: vi.fn(),
  },
}));

const { searchECI } = await import('../src/services/searchService.js');
const cacheService = (await import('../src/services/cacheService.js')).default;

describe('searchService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cacheService.get.mockReturnValue(undefined);
  });

  it('returns array of {title, snippet, link} on success', async () => {
    mockAxiosGet.mockResolvedValueOnce({
      data: {
        items: [
          { title: 'ECI Guidelines', snippet: 'Official guidelines...', link: 'https://eci.gov.in/page' },
          { title: 'Voter Registration', snippet: 'How to register...', link: 'https://eci.gov.in/register' },
        ],
      },
    });

    const results = await searchECI('voter registration');
    expect(results).toHaveLength(2);
    expect(results[0]).toHaveProperty('title');
    expect(results[0]).toHaveProperty('snippet');
    expect(results[0]).toHaveProperty('link');
  });

  it('returns empty array when API returns 0 results', async () => {
    mockAxiosGet.mockResolvedValueOnce({ data: {} });
    const results = await searchECI('nonexistent query');
    expect(results).toEqual([]);
  });

  it('uses cache on repeated identical query', async () => {
    const cached = [{ title: 'Cached', snippet: 'test', link: 'https://eci.gov.in' }];
    cacheService.get.mockReturnValueOnce(cached);

    const results = await searchECI('voter registration');
    expect(results).toEqual(cached);
    expect(mockAxiosGet).not.toHaveBeenCalled();
  });

  it('throws AppError on HTTP 403', async () => {
    mockAxiosGet.mockRejectedValueOnce({
      response: { status: 403 },
      message: 'Forbidden',
    });

    await expect(searchECI('test')).rejects.toMatchObject({
      code: 'SEARCH_FORBIDDEN',
      statusCode: 403,
    });
  });
});
