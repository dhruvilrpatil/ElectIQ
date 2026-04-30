import knowledgeBase from './knowledgeBase';
import { classifyIntent } from './intentClassifier';

const responseRotation = {};

export function processInput(userInput, context = null) {
  if (!userInput?.trim()) {
    return { intent: 'default', response: knowledgeBase.default.responses[0] };
  }

  const { intent, detectedState } = classifyIntent(userInput, context);
  const intentData = knowledgeBase[intent] || knowledgeBase.default;
  const responses = intentData.responses || [];

  // Rotate responses to avoid repetition
  if (!responseRotation[intent]) responseRotation[intent] = 0;
  const response = { ...responses[responseRotation[intent] % responses.length] };
  responseRotation[intent]++;

  // Inject state name if detected
  if (detectedState && response.body) {
    const stateName = { CA:'California',TX:'Texas',FL:'Florida',NY:'New York',PA:'Pennsylvania',GA:'Georgia',AZ:'Arizona',MI:'Michigan',WI:'Wisconsin',NC:'North Carolina',OH:'Ohio',NV:'Nevada',CO:'Colorado',WA:'Washington',IL:'Illinois' }[detectedState] || detectedState;
    response.body = `For **${stateName}**: ${response.body}`;
    response.detectedState = detectedState;
  }

  return { intent, response: { ...response, intent } };
}

export default { processInput };
