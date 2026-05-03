let openai = null;

async function init() {
  if (!process.env.OPENAI_API_KEY) return;
  try {
    const { default: OpenAI } = await import('openai');
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  } catch (e) {
    console.warn('OpenAI SDK not available:', e.message);
  }
}

await init();

const SYSTEM_PROMPT = `You are ElectIQ, a helpful US election information assistant.
Answer only election-related questions. Be accurate, neutral, and cite that users should verify with official state sources.
Respond ONLY with valid JSON using this exact schema:
{"headline":"string","body":"string","steps":["string"],"actions":[{"label":"string","url":"string"}],"followUps":["string"]}`;

export const openaiService = {
  /**
   * Checks if the OpenAI API key is configured.
   * @returns {boolean} True if the API key is present.
   */
  isAvailable: () => openai !== null,

  /**
   * Processes a chat request using the OpenAI API.
   * @param {string} userMessage 
   * @param {string|null} context 
   * @returns {Promise<Object>} JSON response parsed from the model output.
   * @throws {Error} If OpenAI is not configured or returns invalid JSON.
   */
  async chat(userMessage, context = null) {
    if (!openai) throw new Error('OpenAI not configured');

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 800,
      temperature: 0.3,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...(context ? [{ role: 'system', content: `Previous topic: ${context}` }] : []),
        { role: 'user', content: userMessage },
      ],
    });

    const raw = completion.choices[0]?.message?.content?.trim() || '';
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Invalid JSON from OpenAI');
    return JSON.parse(jsonMatch[0]);
  },
};

export default openaiService;
