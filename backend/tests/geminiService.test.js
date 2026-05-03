import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock env
vi.stubEnv('GEMINI_API_KEY', 'test-key');
vi.stubEnv('GOOGLE_CSE_API_KEY', 'test-cse-key');
vi.stubEnv('GOOGLE_CSE_CX', 'test-cx');
vi.stubEnv('YOUTUBE_API_KEY', 'test-yt-key');
vi.stubEnv('GOOGLE_TRANSLATE_API_KEY', 'test-translate-key');
vi.stubEnv('FRONTEND_URL', 'http://localhost:5173');
vi.stubEnv('NODE_ENV', 'test');

const mockSendMessage = vi.fn();
const mockSendMessageStream = vi.fn();
const mockStartChat = vi.fn(() => ({
  sendMessage: mockSendMessage,
  sendMessageStream: mockSendMessageStream,
}));
const mockGetGenerativeModel = vi.fn(() => ({
  startChat: mockStartChat,
}));

vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: class {
    constructor() {
      this.getGenerativeModel = mockGetGenerativeModel;
    }
  },
}));

vi.mock('../src/services/cacheService.js', () => ({
  default: {
    get: vi.fn(() => undefined),
    set: vi.fn(),
    has: vi.fn(() => false),
    del: vi.fn(),
  },
  get: vi.fn(() => undefined),
  set: vi.fn(),
  has: vi.fn(() => false),
  del: vi.fn(),
}));

const { chat } = await import('../src/services/geminiService.js');
const cacheService = (await import('../src/services/cacheService.js')).default;

describe('geminiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cacheService.get.mockReturnValue(undefined);
  });

  it('constructs prompt with language code in system instruction', async () => {
    mockSendMessage.mockResolvedValueOnce({
      response: { text: () => 'Test response' },
    });

    await chat('How to vote?', [], 'hi', false);

    const modelCall = mockGetGenerativeModel.mock.calls[0][0];
    expect(modelCall.systemInstruction).toContain('hi');
  });

  it('returns cached result on second call with same input', async () => {
    cacheService.get.mockReturnValueOnce('cached response');

    const result = await chat('How to vote?', [], 'en', false);
    expect(result).toBe('cached response');
    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  it('does not call Gemini SDK when cache hit occurs', async () => {
    cacheService.get.mockReturnValueOnce('cached');

    await chat('test', [], 'en', false);
    expect(mockStartChat).not.toHaveBeenCalled();
  });

  it('maps 429 Gemini error to AppError with AI_QUOTA_EXCEEDED', async () => {
    mockSendMessage.mockRejectedValueOnce({
      status: 429,
      message: 'RESOURCE_EXHAUSTED',
    });

    await expect(chat('test', [], 'en', false)).rejects.toMatchObject({
      code: 'AI_QUOTA_EXCEEDED',
      statusCode: 429,
    });
  });

  it('maps generic Gemini error to AppError with AI_SERVICE_ERROR', async () => {
    mockSendMessage.mockRejectedValueOnce(new Error('Unknown error'));

    await expect(chat('test', [], 'en', false)).rejects.toMatchObject({
      code: 'AI_SERVICE_ERROR',
      statusCode: 503,
    });
  });

  it('returns model text response on success', async () => {
    mockSendMessage.mockResolvedValueOnce({
      response: { text: () => 'You can register at voters.eci.gov.in' },
    });

    const result = await chat('How to register?', [], 'en', false);
    expect(result).toBe('You can register at voters.eci.gov.in');
  });
});
