// Defines static data including legislative seat configurations and supported languages.
export const SEAT_DATA = {
  "Lok Sabha": {
    total: 543,
    alliances: [
      { name: "I.N.D.I.A.", color: "#1E88E5", seats: 234, parties: [{name: "INC", seats: 99}, {name: "SP", seats: 37}, {name: "TMC", seats: 29}, {name: "DMK", seats: 22}, {name: "Others", seats: 47}] },
      { name: "Others", color: "#9E9E9E", seats: 16, parties: [{name: "YSRCP", seats: 4}, {name: "IND/Others", seats: 12}] },
      { name: "NDA", color: "#FF8F00", seats: 293, parties: [{name: "BJP", seats: 240}, {name: "TDP", seats: 16}, {name: "JDU", seats: 12}, {name: "Others", seats: 25}] }
    ]
  },
  "Rajya Sabha": {
    total: 245,
    alliances: [
      { name: "I.N.D.I.A.", color: "#1E88E5", seats: 87, parties: [{name: "INC", seats: 26}, {name: "TMC", seats: 13}, {name: "AAP", seats: 10}, {name: "DMK", seats: 10}] },
      { name: "Others", color: "#9E9E9E", seats: 46, parties: [{name: "BJD", seats: 9}, {name: "YSRCP", seats: 11}, {name: "BRS", seats: 5}] },
      { name: "NDA", color: "#FF8F00", seats: 112, parties: [{name: "BJP", seats: 86}, {name: "NCP", seats: 3}, {name: "JD(U)", seats: 4}] }
    ]
  },
  "Maharashtra Assembly": {
    total: 288,
    alliances: [
      { name: "MVA (Opposition)", color: "#1E88E5", seats: 115, parties: [{name: "INC", seats: 45}, {name: "SS(UBT)", seats: 38}, {name: "NCP(SP)", seats: 32}] },
      { name: "Others", color: "#9E9E9E", seats: 28, parties: [{name: "BVA", seats: 3}, {name: "AIMIM", seats: 2}, {name: "IND", seats: 13}] },
      { name: "Mahayuti (Ruling)", color: "#FF8F00", seats: 145, parties: [{name: "BJP", seats: 105}, {name: "SS(Shinde)", seats: 40}] }
    ]
  },
  "UP Assembly": {
    total: 403,
    alliances: [
      { name: "SP+ (Opposition)", color: "#E53935", seats: 125, parties: [{name: "SP", seats: 111}, {name: "RLD", seats: 9}, {name: "SBSP", seats: 5}] },
      { name: "Others", color: "#9E9E9E", seats: 5, parties: [{name: "BSP", seats: 1}, {name: "INC", seats: 2}, {name: "Jansatta", seats: 2}] },
      { name: "NDA (Ruling)", color: "#FF8F00", seats: 273, parties: [{name: "BJP", seats: 255}, {name: "Apna Dal(S)", seats: 12}, {name: "NISHAD", seats: 6}] }
    ]
  }
};

/**
 * Language options with native script labels.
 */
export const LANGUAGE_OPTIONS = [
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা', flag: '🇮🇳' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', label: 'Marathi', native: 'મરાઠી', flag: '🇮🇳' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'ur', label: 'Urdu', native: 'اردو', flag: '🇮🇳' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
  { code: 'as', label: 'Assamese', native: 'অসমীয়া', flag: '🇮🇳' },
  { code: 'ne', label: 'Nepali', native: 'नेपाली', flag: '🇮🇳' },
  { code: 'sd', label: 'Sindhi', native: 'سنڌي', flag: '🇮🇳' },
];
