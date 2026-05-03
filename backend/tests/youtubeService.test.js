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
}));

vi.mock('../src/services/cacheService.js', () => ({
  default: {
    get: vi.fn(() => undefined),
    set: vi.fn(),
  },
}));

const { searchVideos } = await import('../src/services/youtubeService.js');
const cacheService = (await import('../src/services/cacheService.js')).default;

describe('youtubeService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cacheService.get.mockReturnValue(undefined);
  });

  it('filters results to official channels and returns top 3', async () => {
    mockAxiosGet.mockResolvedValueOnce({
      data: {
        items: [
          { id: { videoId: '1' }, snippet: { channelId: 'random', title: 'Fake News', channelTitle: 'Random' } },
          { id: { videoId: '2' }, snippet: { channelId: 'UCozUmHDfgkHOCa5gLLBaHFQ', title: 'Official ECI', channelTitle: 'Election Commission' } },
        ],
      },
    });

    const result = await searchVideos('voter ID');
    expect(result.quotaExceeded).toBe(false);
    expect(result.results).toHaveLength(1);
    expect(result.results[0].videoId).toBe('2');
  });

  it('handles empty results', async () => {
    mockAxiosGet.mockResolvedValueOnce({ data: {} });
    const result = await searchVideos('unknown');
    expect(result.results).toEqual([]);
  });

  it('gracefully degrades on 403 quota error', async () => {
    mockAxiosGet.mockRejectedValueOnce({
      response: { status: 403 },
    });
    const result = await searchVideos('voter ID');
    expect(result.quotaExceeded).toBe(true);
    expect(result.results).toEqual([]);
  });

  it('uses cache if available', async () => {
    cacheService.get.mockReturnValueOnce({ quotaExceeded: false, results: [{ videoId: 'cached' }] });
    const result = await searchVideos('voter ID');
    expect(result.results[0].videoId).toBe('cached');
    expect(mockAxiosGet).not.toHaveBeenCalled();
  });
});
