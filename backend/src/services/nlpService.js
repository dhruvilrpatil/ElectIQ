import knowledgeBase from '../data/knowledgeBase.js';
import { classifyIntent } from '../utils/intentClassifier.js';

const rotationMap = {};

export function process(input, context = null) {
  if (!input?.trim()) {
    const def = knowledgeBase.default.responses[0];
    return { intent: 'default', confidence: 0, response: def };
  }

  const { intent, confidence } = classifyIntent(input, context);
  const intentData = knowledgeBase[intent] || knowledgeBase.default;
  const responses = intentData.responses || [];

  if (!rotationMap[intent]) rotationMap[intent] = 0;
  const response = responses[rotationMap[intent] % responses.length];
  rotationMap[intent]++;

  return { intent, confidence, response };
}

export default { process };
