/**
 * Formats the NLP or AI response into a standardized JSON structure.
 * @param {Object} params 
 * @returns {Object} The formatted response payload.
 */
export function formatResponse({ intent, confidence, response, meta = {} }) {
  return {
    intent,
    confidence: parseFloat((confidence || 0).toFixed(3)),
    response: {
      headline: response.headline || 'Election Information',
      body: response.body || '',
      steps: Array.isArray(response.steps) ? response.steps : [],
      actions: Array.isArray(response.actions) ? response.actions : [],
      videos: Array.isArray(response.videos) ? response.videos : [],
      followUps: Array.isArray(response.followUps) ? response.followUps : [],
    },
    meta: {
      cached: meta.cached || false,
      responseTime: meta.responseTime || 0,
      source: meta.source || 'nlp',
    },
  };
}

export default formatResponse;
