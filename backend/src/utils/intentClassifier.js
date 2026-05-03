import knowledgeBase from '../data/knowledgeBase.js';



/**
 * Classifies the intent of a user's input based on predefined keywords.
 * @param {string} input 
 * @param {string|null} context 
 * @returns {Object} An object containing the matched intent and confidence score.
 */
export function classifyIntent(input, context = null) {
  const inputLower = input.toLowerCase();
  let bestIntent = 'default';
  let bestScore = 0;

  for (const [intentName, intentData] of Object.entries(knowledgeBase)) {
    if (intentName === 'default') continue;
    const keywords = intentData.keywords || [];
    let matches = 0;
    for (const kw of keywords) {
      if (inputLower.includes(kw)) matches++;
    }
    const score = keywords.length > 0 ? matches / Math.sqrt(keywords.length) : 0;
    const boosted = context === intentName ? score + 0.3 : score;
    if (boosted > bestScore) { bestScore = boosted; bestIntent = intentName; }
  }

  if (bestScore < 0.1) bestIntent = 'default';
  return { intent: bestIntent, confidence: Math.min(bestScore, 1) };
}

export default classifyIntent;
