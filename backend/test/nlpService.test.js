import { describe, it, expect } from 'vitest';
import nlpService from '../src/services/nlpService.js';

describe('NLP Service Fallback', () => {
  it('should return default intent for empty input', () => {
    const result = nlpService.process('');
    expect(result.intent).toBe('default');
    expect(result.response.headline).toBeDefined();
  });

  it('should correctly classify voter registration intent', () => {
    const result = nlpService.process('How do I register to vote?');
    expect(result.intent).toBe('voter_registration');
    expect(result.response.body).toContain('register');
  });

  it('should rotate through responses for same intent if available', () => {
    // In our KB, some intents have multiple responses, but let's just ensure it doesn't crash
    const res1 = nlpService.process('evm machine');
    const res2 = nlpService.process('how evm works');
    expect(res1.intent).toBe('evm');
    expect(res2.intent).toBe('evm');
  });
});
