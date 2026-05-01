import knowledgeBase from './knowledgeBase';

/* Indian states and UTs — names and codes */
const INDIA_STATE_CODES = {
  'AP': 'Andhra Pradesh', 'AR': 'Arunachal Pradesh', 'AS': 'Assam', 'BR': 'Bihar',
  'CG': 'Chhattisgarh', 'GA': 'Goa', 'GJ': 'Gujarat', 'HR': 'Haryana',
  'HP': 'Himachal Pradesh', 'JK': 'Jammu and Kashmir', 'JH': 'Jharkhand',
  'KA': 'Karnataka', 'KL': 'Kerala', 'MP': 'Madhya Pradesh', 'MH': 'Maharashtra',
  'MN': 'Manipur', 'ML': 'Meghalaya', 'MZ': 'Mizoram', 'NL': 'Nagaland',
  'OD': 'Odisha', 'PB': 'Punjab', 'RJ': 'Rajasthan', 'SK': 'Sikkim',
  'TN': 'Tamil Nadu', 'TG': 'Telangana', 'TR': 'Tripura', 'UP': 'Uttar Pradesh',
  'UK': 'Uttarakhand', 'WB': 'West Bengal',
  'DL': 'Delhi', 'CH': 'Chandigarh', 'LA': 'Ladakh',
};


export function classifyIntent(input, context = null) {
  const inputLower = input.toLowerCase();
  let bestIntent = 'default';
  let bestScore = 0;

  for (const [intentName, intentData] of Object.entries(knowledgeBase)) {
    if (intentName === 'default') continue;
    const keywords = intentData.keywords || [];
    let matches = 0;
    for (const kw of keywords) {
      if (inputLower.includes(kw)) matches += kw.includes(' ') ? 1.5 : 1; // boost multi-word matches
    }
    const score = keywords.length > 0 ? matches / Math.sqrt(keywords.length) : 0;
    const boostedScore = (context === intentName) ? score + 0.3 : score;
    if (boostedScore > bestScore) {
      bestScore = boostedScore;
      bestIntent = intentName;
    }
  }

  if (bestScore < 0.1) bestIntent = 'default';

  // Detect Indian state mentions
  let detectedState = null;
  for (const [code, name] of Object.entries(INDIA_STATE_CODES)) {
    if (inputLower.includes(name.toLowerCase()) || inputLower.includes(` ${code.toLowerCase()} `)) {
      detectedState = code;
      break;
    }
  }

  return { intent: bestIntent, score: bestScore, detectedState };
}

export default classifyIntent;
