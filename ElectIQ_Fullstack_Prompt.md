# ElectIQ India — Full-Stack Competition Prompt (React + Node.js/Python)
> Paste the prompt below into Claude Opus. It will generate the complete full-stack codebase.

---

## 🔑 External Services & Keys Required

| Service | Purpose | Key Required | Where to Get |
|---|---|---|---|
| **OpenAI API** *(optional)* | Real AI chat fallback | ✅ Yes → `OPENAI_API_KEY` (backend) | [platform.openai.com](https://platform.openai.com) — app works without it |
| **Google Fonts** | Google Sans font | ❌ Free CDN | Auto-loaded |
| **Google Translate Widget** | In-page language switcher | ❌ Free | Auto-loaded via script |
| **YouTube Embed** | Indian Election video | ❌ Free | Iframe only |
| **Google Calendar** | Add-to-calendar deep links | ❌ Free URL params | Opens calendar.google.com |
| **Google Search** | Candidate research links | ❌ Free URL params | Opens google.com |

> ⚠️ The app is **fully functional without any API keys** — the chat assistant uses a built-in NLP knowledge engine, and the AI endpoint falls back to the rule-based engine. Add keys to unlock full features.

---

## 📁 Expected Project Structure After Generation

```
electiq/
├── frontend/                    # React + Vite
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   └── Sidebar.jsx
│   │   │   ├── chat/
│   │   │   │   ├── ChatInterface.jsx
│   │   │   │   ├── ChatBubble.jsx
│   │   │   │   ├── TypingIndicator.jsx
│   │   │   │   └── QuickChips.jsx
│   │   │   ├── timeline/
│   │   │   │   └── ElectionTimeline.jsx
│   │   │   ├── state/
│   │   │   │   └── StateGuide.jsx
│   │   │   ├── voting/
│   │   │   │   └── VotingMethods.jsx
│   │   │   ├── assembly/
│   │   │   │   └── AssemblySeats.jsx
│   │   │   ├── learn/
│   │   │   │   └── LearnPage.jsx
│   │   │   ├── settings/
│   │   │   │   └── SettingsPage.jsx
│   │   │   ├── hero/
│   │   │   │   └── WelcomeHero.jsx
│   │   │   └── ui/
│   │   │       ├── Card.jsx
│   │   │       ├── Chip.jsx
│   │   │       ├── Button.jsx
│   │   │       ├── Ripple.jsx
│   │   │       ├── Skeleton.jsx
│   │   │       └── ThemeToggle.jsx
│   │   ├── hooks/
│   │   │   ├── useTheme.js
│   │   │   ├── useChat.js
│   │   │   └── useLocalStorage.js
│   │   ├── engine/
│   │   │   ├── nlpEngine.js
│   │   │   ├── intentClassifier.js
│   │   │   └── knowledgeBase.js
│   │   ├── data/
│   │   │   ├── stateData.js
│   │   │   ├── timelineData.js
│   │   │   └── votingMethodsData.js
│   │   ├── services/
│   │   │   └── api.js
│   │   └── store/
│   │       └── chatStore.js
│   ├── .env.example
│   ├── vite.config.js
│   ├── package.json
│   └── index.html
├── backend/                     # Node.js + Express
│   ├── src/
│   │   ├── server.js
│   │   ├── routes/
│   │   │   ├── chat.js
│   │   │   ├── states.js
│   │   │   └── health.js
│   │   ├── controllers/
│   │   │   ├── chatController.js
│   │   │   └── stateController.js
│   │   ├── middleware/
│   │   │   ├── rateLimiter.js
│   │   │   ├── cors.js
│   │   │   ├── errorHandler.js
│   │   │   └── logger.js
│   │   ├── services/
│   │   │   ├── nlpService.js
│   │   │   ├── openaiService.js
│   │   │   └── cacheService.js
│   │   ├── data/
│   │   │   ├── knowledgeBase.js
│   │   │   └── stateData.js
│   │   └── utils/
│   │       ├── intentClassifier.js
│   │       └── responseFormatter.js
│   ├── tests/
│   │   ├── chat.test.js
│   │   └── nlp.test.js
│   ├── .env.example
│   └── package.json
├── docker-compose.yml
└── README.md
```

---

## 📋 THE PROMPT (Copy Everything Below This Line)

---

You are a senior full-stack engineer at Google building a production-grade web application for a high-stakes engineering competition. The project is called **ElectIQ India – Election Intelligence Assistant**. It helps users understand the Indian election process, timelines, voting steps, and State/UT-specific rules through an intelligent, conversational interface.

Generate the **complete, untruncated, production-ready codebase** for this application. Every file must be fully written — no placeholders, no `// TODO`, no `...rest of implementation`. Output each file preceded by its path as a comment, like:

```
// FILE: frontend/src/App.jsx
[full file content]

// FILE: backend/src/server.js
[full file content]
```

Output every file in the project structure below. Do not stop. Do not summarize. Do not skip any file.

---

# TECH STACK

## Frontend
- **React 18** with **Vite** (not Create React App)
- **React Router v6** for navigation
- **Zustand** for global state (chat history, theme, selected state)
- **Framer Motion** for all animations
- **Axios** for API calls
- **CSS Modules** for component-scoped styling (no Tailwind, no styled-components)
- **Google Fonts** (Google Sans) via `<link>` in `index.html`
- All styles follow **Google Material Design 3** spec

## Backend
- **Node.js 20+** with **Express 5**
- **cors**, **helmet**, **express-rate-limit**, **compression** middleware
- **node-cache** for in-memory response caching
- **winston** for structured logging
- **jest** + **supertest** for testing
- **dotenv** for environment config
- Optional: **openai** SDK for AI fallback (gracefully skipped if no key)

---

# DESIGN SYSTEM — GOOGLE MATERIAL DESIGN 3

## Fonts
Load in `frontend/index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@300;400;500;700&family=Google+Sans+Mono:wght@400;500&display=swap" rel="stylesheet">
```
- All body text: `font-family: 'Google Sans', sans-serif`
- Code/mono sections: `font-family: 'Google Sans Mono', monospace`

## CSS Custom Properties (define in `:root` and `[data-theme="dark"]`)
```css
:root {
  /* Primary */
  --md-primary: #1A73E8;
  --md-on-primary: #FFFFFF;
  --md-primary-container: #D3E3FD;
  --md-on-primary-container: #041E49;

  /* Secondary */
  --md-secondary: #5F6368;
  --md-on-secondary: #FFFFFF;
  --md-secondary-container: #E8EAED;

  /* Tertiary */
  --md-tertiary: #1E8E3E;
  --md-on-tertiary: #FFFFFF;
  --md-tertiary-container: #CEEAD6;

  /* Error */
  --md-error: #D93025;
  --md-error-container: #FDECEA;

  /* Surfaces (light) */
  --md-surface: #FFFFFF;
  --md-surface-variant: #F8F9FA;
  --md-surface-container: #F1F3F4;
  --md-surface-container-high: #E8EAED;
  --md-on-surface: #202124;
  --md-on-surface-variant: #5F6368;

  /* Outline */
  --md-outline: #DADCE0;
  --md-outline-variant: #E8EAED;

  /* Elevation shadows */
  --md-elevation-1: 0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06);
  --md-elevation-2: 0 2px 6px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08);
  --md-elevation-3: 0 4px 12px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10);

  /* Motion */
  --md-easing: cubic-bezier(0.2, 0, 0, 1);
  --md-duration-short: 150ms;
  --md-duration-medium: 250ms;
  --md-duration-long: 400ms;

  /* Shape */
  --md-radius-xs: 4px;
  --md-radius-sm: 8px;
  --md-radius-md: 12px;
  --md-radius-lg: 16px;
  --md-radius-xl: 28px;
  --md-radius-full: 9999px;
}

[data-theme="dark"] {
  --md-primary: #7BAAF7;
  --md-on-primary: #062E6F;
  --md-primary-container: #1557B0;
  --md-on-primary-container: #D3E3FD;
  --md-secondary: #9AA0A6;
  --md-on-secondary: #1C1C1E;
  --md-secondary-container: #3C4043;
  --md-tertiary: #5BB974;
  --md-on-tertiary: #003314;
  --md-tertiary-container: #004D1F;
  --md-error: #F28B82;
  --md-error-container: #5C1010;
  --md-surface: #0D0D0D;
  --md-surface-variant: #1C1C1E;
  --md-surface-container: #1E1E1E;
  --md-surface-container-high: #282828;
  --md-on-surface: #E8EAED;
  --md-on-surface-variant: #9AA0A6;
  --md-outline: #3C4043;
  --md-outline-variant: #2D2F31;
  --md-elevation-1: 0 1px 3px rgba(0,0,0,0.40);
  --md-elevation-2: 0 2px 6px rgba(0,0,0,0.50);
  --md-elevation-3: 0 4px 12px rgba(0,0,0,0.60);
}
```

## Typography Scale
```css
.display-large  { font-size: 57px; line-height: 64px; font-weight: 300; letter-spacing: -0.25px; }
.display-medium { font-size: 45px; line-height: 52px; font-weight: 300; }
.display-small  { font-size: 36px; line-height: 44px; font-weight: 300; }
.headline-large  { font-size: 32px; line-height: 40px; font-weight: 400; }
.headline-medium { font-size: 28px; line-height: 36px; font-weight: 400; }
.headline-small  { font-size: 24px; line-height: 32px; font-weight: 400; }
.title-large  { font-size: 22px; line-height: 28px; font-weight: 500; }
.title-medium { font-size: 16px; line-height: 24px; font-weight: 500; letter-spacing: 0.15px; }
.title-small  { font-size: 14px; line-height: 20px; font-weight: 500; letter-spacing: 0.1px; }
.label-large  { font-size: 14px; line-height: 20px; font-weight: 500; letter-spacing: 0.1px; }
.label-medium { font-size: 12px; line-height: 16px; font-weight: 500; letter-spacing: 0.5px; }
.label-small  { font-size: 11px; line-height: 16px; font-weight: 500; letter-spacing: 0.5px; }
.body-large  { font-size: 16px; line-height: 24px; font-weight: 400; letter-spacing: 0.5px; }
.body-medium { font-size: 14px; line-height: 20px; font-weight: 400; letter-spacing: 0.25px; }
.body-small  { font-size: 12px; line-height: 16px; font-weight: 400; letter-spacing: 0.4px; }
```

---

# FRONTEND — REACT APPLICATION

## `frontend/index.html`
Standard Vite HTML shell. Include Google Fonts link, Google Translate script, and meta tags for PWA (theme-color, viewport, description, og:title, og:description).

## `frontend/vite.config.js`
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  server: { proxy: { '/api': 'http://localhost:3001' } }
});
```

## `frontend/package.json`
Include all dependencies: react, react-dom, react-router-dom, zustand, framer-motion, axios. DevDeps: vite, @vitejs/plugin-react, eslint, prettier.

## `frontend/src/main.jsx`
Entry point. Wrap app in `<React.StrictMode>`, `<BrowserRouter>`, and apply saved theme from localStorage to `document.documentElement` before first render.

## `frontend/src/App.jsx`
Root component. Uses React Router. Routes:
- `/` → `<ChatInterface>` (Chat + Hero)
- `/assembly` → `<AssemblySeats>`
- `/timeline` → `<ElectionTimeline>`
- `/state-guide` → `<StateGuide>`
- `/voting-methods` → `<VotingMethods>`
- `/learn` → `<LearnPage>`
- `/settings` → `<SettingsPage>`

Render `<Sidebar>` inside `app-sidebar-area`, and `<main>` with `<Outlet>` or `<Routes>` inside `app-main-content`. Apply Framer Motion `AnimatePresence` on route changes with a fade+slide transition.

## `frontend/src/index.css`
Global styles: CSS reset, custom property definitions (ALL tokens from design system above), typography classes, scrollbar styling, focus ring, skip link, Google Translate widget override styles, ripple keyframe animation, skeleton shimmer animation, dark mode transition on `html`.

---

## COMPONENT SPECIFICATIONS

### `Sidebar.jsx`
- Desktop: fixed left panel, width 280px, `background: var(--md-surface-variant)`, full height
- Mobile: slides in from left as a drawer overlay with Framer Motion `x: -280 → 0` animation, backdrop overlay
- Contains: App logo + tagline, navigation links with icons (use inline SVG paths for all icons — no icon library), chat history list (last 5 queries from Zustand store, clickable to re-run), footer links (including Google Translate widget and ThemeToggle).

### `WelcomeHero.jsx`
Shown only before first chat message. Animate out with Framer Motion on first message.
- Full-width section, centered, generous padding
- Animated SVG illustration of a ballot box with subtle floating particles (pure CSS `@keyframes`)
- Headline (display-small): "Understand Every Vote, Every Step"
- Subhead (body-large, secondary color): "Your AI guide to the Indian election process — accurate, clear, and always up to date."
- Three feature cards in a row (MD3 Cards, elevation-1):
  1. 🗳 "Step-by-Step Guidance" — We walk you through every stage of the Indian election process.
  2. 📍 "State-Specific Rules" — Information for all 28 states and 8 UTs.
  3. 💬 "Ask Anything" — Natural language questions answered instantly.
- Pulsing CTA chip: "Ask your first question ↓" with `animation: pulse 2s ease-in-out infinite`
- Six example question chips below: "How do I register?", "When is Election Day?", "What ID do I need?", "Explain the Lok Sabha", "How does EVM work?", "What is VVPAT?"

### `ChatInterface.jsx`
Main chat panel. State: `messages[]`, `inputValue`, `isLoading`, `context`.
- Message list: scrollable div, auto-scrolls to bottom on new message using `useEffect` + `ref.scrollIntoView({ behavior: 'smooth' })`
- Each message: `<ChatBubble>` component
- Input row: MD3 outlined text field (full width), send button (icon button), character counter
- Input submits on Enter (Shift+Enter = newline), on send button click
- On submit: append user message → call `nlpEngine.process(input, context)` → set isLoading → after 800–1400ms (randomized) → append assistant response
- If backend available (`/api/chat`): POST to backend first, fall back to frontend NLP engine on network error
- `<QuickChips>` rendered below input

### `ChatBubble.jsx`
Props: `message { role, content, timestamp, intent, actions }`.
- User bubble: right-aligned, `background: var(--md-primary)`, `color: var(--md-on-primary)`, border-radius `var(--md-radius-xl) var(--md-radius-xl) var(--md-radius-xs) var(--md-radius-xl)`, max-width 70%
- Assistant bubble: left-aligned, `background: var(--md-surface-variant)`, border-radius `var(--md-radius-xl) var(--md-radius-xl) var(--md-radius-xl) var(--md-radius-xs)`, max-width 80%
- Assistant includes avatar: 36px circular component with inline ballot-box SVG icon or ElectIQ logo, `background: var(--md-primary-container)`
- Content renders as structured card if `intent !== 'default'`: icon + headline + body + optional action chips
- Framer Motion: `initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}`
- Timestamp in label-small, secondary color

### `TypingIndicator.jsx`
Status-based chat typing indicator. Three dots animation: `<span>` elements with staggered CSS `animation-delay` (0, 150ms, 300ms), `@keyframes bounce`. Background: surface-variant bubble matching assistant style. Avatar is shown next to it as well.

### `QuickChips.jsx`
Horizontally scrollable row, `overflow-x: auto`, hide scrollbar via CSS.
Chips:
- "Am I eligible to vote?"
- "Find my polling place"
- "Register to vote"
- "When is Election Day?"
- "How does EVM work?"
- "What ID do I need?"
- "What is VVPAT?"
- "How are votes counted?"
- "What is NOTA?"
- "Lok Sabha vs Rajya Sabha?"

Each chip: MD3 Assist Chip style (`border: 1px solid var(--md-outline)`, `border-radius: var(--md-radius-full)`, 32px height, label-large, hover → `background: var(--md-surface-container-high)`, Ripple effect). On click: `sendMessage(chip.label)`.

### `ElectionTimeline.jsx`
Full-page component. Header section + horizontal scrollable timeline.

Timeline milestones array (embed as constant in `frontend/src/data/timelineData.js`):
Include items for the Indian Lok Sabha 2024 Election timeline:
- Election Schedule Announced (16 March 2024)
- Phase 1 to 7 Polling 
- Vote Counting & Results (4 June 2024)
- Government Formation (9 June 2024)
- Next State Elections — 2025
- Next General Election (2029)

Render:
- Horizontal scrollable container with connecting progress line (CSS `::before` pseudo-element, `background: linear-gradient(to right, var(--md-primary) {progress}%, var(--md-outline) {progress}%)`)
- Each milestone: vertical card (200px wide, 320px tall), stacked below the timeline node
- Node: 48px circle, color based on status (completed=primary, active=tertiary, upcoming=outline)
- Connector line between nodes
- Card: status pill, date badge, icon (inline SVG), title, description, "Add to Calendar" button (Google Calendar deep link), expand button
- Expanded state: Framer Motion `AnimatePresence` height animation, shows `details` text
- On mobile: vertical timeline layout

### `StateGuide.jsx`
- MD3 outlined dropdown (custom `<select>` styled with CSS) listing Indian States and UTs.
- On selection: animate in a State Info Card with Framer Motion
- State Card layout:
  - Header: state name + state SVG outline placeholder + `Verified` chip
  - Info grid (2 columns): Voter ID Type, Registration Deadline, Early Voting, Mail-In Voting, Polling Hours, Official Site
  - "Visit Official Site" button (MD3 filled button, opens in new tab)
  - "Add Deadline to Calendar" button

State data object (embed complete data for key states like MH, DL, UP, TN, KA, WB, GJ, RJ, MP, BR, KL, AP in `stateData.js`, placeholder for rest). Example for MH:
```js
{ name: "Maharashtra", voterIdType: "epic", voterIdLabel: "EPIC or 12 alternate IDs", registrationDeadline: "January 1 (qualifying date for that year)", earlyVoting: false, postalBallot: true, postalBallotLabel: "Service voters, seniors 85+, and PwD", pollingHours: "7:00 AM – 6:00 PM", officialSite: "https://ceo.maharashtra.gov.in" }
```

### `VotingMethods.jsx`
Two sections:
1. **Comparison Table** (MD3 Data Table): sticky header row, alternating row backgrounds, horizontal scroll on mobile
   - Columns: Method | When Available | How to Request | Best For
   - Rows: EVM In-Person, Postal Ballot, Electronically Transmitted Postal Ballot (ETPBS), Proxy Voting
2. **Step-by-Step Accordions** (MD3 Expansion Panel): one per voting method
   - Each step numbered, with icon and detail text
   - Framer Motion height animation on expand/collapse

### `AssemblySeats.jsx`
Rendered to show Parliament and State Legislative Assembly composition.
- Display a building-themed icon for the Parliament dashboard.
- Hemicycle Chart (SVG based) for seat distribution across alliances/parties.
- Support tabs like "Lok Sabha", "Rajya Sabha", "Maharashtra Assembly", "UP Assembly".

### `LearnPage.jsx`
Educational content page:
- YouTube embed: Indian Electoral process explanation video in responsive 16:9 container.
- "Indian Electoral System Explained" section.
- "Glossary" section: searchable list of 25+ election terms with definitions (render as expandable MD3 list items) like EVM, VVPAT, MCC, NOTA, BLO, ERO.
- "FAQ" section: 15 frequently asked questions as accordion.

### Reusable UI Components

#### `Card.jsx`
Props: `variant` (elevated|filled|outlined|tonal), `onClick`, `className`, `children`.
CSS: apply appropriate `box-shadow`, `background`, `border` based on variant. Hover: `translateY(-2px)` + elevation-2. Transition: `var(--md-duration-medium) var(--md-easing)`.

#### `Chip.jsx`
Props: `variant` (assist|filter|input|suggestion), `icon`, `label`, `selected`, `onClick`.
CSS: 32px height, `border-radius: var(--md-radius-full)`, appropriate padding, hover/selected states.

#### `Button.jsx`
Props: `variant` (filled|outlined|text|elevated|tonal), `size` (small|medium|large), `icon`, `loading`, `disabled`, `onClick`.
Filled: primary bg, on-primary text. Outlined: transparent bg, outline border, primary text. Ripple on click.

#### `Ripple.jsx`
Hook/component that adds MD3 ripple effect: on click, calculate click position relative to element, create `<span>` with `position: absolute`, `border-radius: 50%`, animate `scale(0) → scale(2.5)` + opacity 0.3→0. Remove after animation ends.

#### `Skeleton.jsx`
Props: `width`, `height`, `variant` (text|circular|rectangular). CSS: `background: linear-gradient(90deg, var(--md-surface-container) 25%, var(--md-surface-container-high) 50%, var(--md-surface-container) 75%)`, `background-size: 200% 100%`, `animation: shimmer 1.5s infinite`.

#### `ThemeToggle.jsx`
Icon button. Sun SVG (light mode) ↔ Moon SVG (dark mode). Clicking toggles `data-theme` on `document.documentElement`, saves to `localStorage`. Framer Motion `rotate` animation on icon swap.

---

## STATE MANAGEMENT — ZUSTAND

### `frontend/src/store/chatStore.js`
```js
// Store shape:
{
  messages: [],          // { id, role, content, timestamp, intent, actions }
  context: null,         // last detected intent for follow-up
  isLoading: false,
  inputHistory: [],      // last 5 user messages for sidebar history
  selectedState: null,   // for StateGuide
  theme: 'light',        // synced with localStorage + data-theme attr
  
  // Actions:
  addMessage(message),
  setLoading(bool),
  setContext(intent),
  clearHistory(),
  setSelectedState(stateCode),
  setTheme(theme),
}
```

---

## NLP ENGINE — FRONTEND

### `frontend/src/engine/knowledgeBase.js`
Embed a complete knowledge base object with minimum **50 entries** covering Indian election topics:

```js
export const knowledgeBase = {
  voter_registration: {
    intent: 'voter_registration',
    keywords: ['register','registration','voter id','epic card','how to register','enroll','voter list','electoral roll','form 6','nvsp','voters portal','matdata','voter card'],
    responses: [{
      headline: 'How to Register as a Voter in India',
      body: 'Any Indian citizen aged 18+ can register on the Electoral Roll. Registration is done through the National Voters\' Service Portal (NVSP) or by submitting Form 6 at your local ERO/AERO office.',
      steps: [
        'Visit voters.eci.gov.in (National Voters\' Service Portal)',
        'Click "Register as New Voter" (Form 6)',
        'Enter your details: name, DOB, address, and aadhaar (optional)',
        'Upload proof of age and address documents',
        'Submit and note your reference number',
        'Your application will be verified by the BLO within 30 days',
        'Download your e-EPIC (digital voter ID) once approved',
      ],
      actions: [
        { label: 'Register on NVSP', url: 'https://voters.eci.gov.in' },
        { label: 'Download e-EPIC', url: 'https://voters.eci.gov.in' },
      ],
      followUps: ['What documents do I need?', 'How do I check my name on the voter list?', 'What is an EPIC card?'],
    }]
  },
  // ... (add all intents: epic_card, lok_sabha, rajya_sabha, state_elections,
  //      evm, vvpat, model_code, nota, resignation_death, jailed_disqualification,
  //      election_day, id_documents, polling_booth, eligibility, election_commission,
  //      nomination, reserved_seats, cvigil, vote_counting)
}
```

Each entry must have: intent name, keywords array (8+ words), at least 2 response variants, steps array, actions array, follow-up suggestions array. Include links to `voters.eci.gov.in` and `cVIGIL`.

### `frontend/src/engine/intentClassifier.js`
```js
// Algorithm:
// 1. Tokenize input (lowercase, remove punctuation, split on whitespace)
// 2. For each intent in knowledgeBase, count keyword matches
// 3. Apply TF-IDF-inspired scoring: score = matches / sqrt(totalKeywords)
// 4. If context exists and score is low, boost context intent by 0.3
// 5. Return top-scoring intent (or 'default' if score < 0.1)
// Also detect: question type (what/how/when/where/why/can), urgency keywords, state mentions
```

### `frontend/src/engine/nlpEngine.js`
```js
// Main process function:
// process(userInput, context) → { intent, response, actions, followUps }
// 1. Clean and normalize input
// 2. Detect state mentions (check against states list)
// 3. Classify intent
// 4. Select response variant (rotate to avoid repetition, tracked per intent)
// 5. Personalize response if state is detected (inject state name)
// 6. Return structured response object
```

---

## GOOGLE SERVICES INTEGRATION

### Google Calendar Deep Links
```js
// Utility function:
function buildCalendarLink(title, dateStr, details) {
  const base = 'https://calendar.google.com/calendar/r/eventedit';
  const params = new URLSearchParams({
    text: title,
    dates: `${dateStr}/${dateStr}`,
    details: details,
    sf: 'true',
    output: 'xml'
  });
  return `${base}?${params}`;
}
```

### Google Search Links
```js
function buildSearchLink(query) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}
```

### Google Translate
In `index.html`, after body:
```html
<div id="google_translate_element"></div>
<script>
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'hi,bn,te,mr,ta,gu,ur,kn,or,pa,ml',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}
</script>
<script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
```

---

# BACKEND — NODE.JS + EXPRESS

## `backend/package.json`
```json
{
  "name": "electiq-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "dev": "node --watch src/server.js",
    "test": "jest --experimental-vm-modules"
  },
  "dependencies": {
    "express": "^5.0.0",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "compression": "^1.7.4",
    "express-rate-limit": "^7.3.0",
    "node-cache": "^5.1.2",
    "winston": "^3.13.0",
    "dotenv": "^16.4.5",
    "openai": "^4.52.0"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "supertest": "^7.0.0"
  }
}
```

## `backend/src/server.js`
```js
// Full Express server setup:
// - Import all middleware
// - Apply: helmet(), compression(), cors(corsOptions), express.json({ limit: '10kb' })
// - Apply rate limiter (100 req/15min per IP)
// - Mount routes: /api/health, /api/chat, /api/states
// - Apply error handler middleware
// - Start listening on process.env.PORT || 3001
// - Graceful shutdown on SIGTERM/SIGINT
// - Log startup info with winston
```

## `backend/src/middleware/rateLimiter.js`
```js
// express-rate-limit config:
// windowMs: 15 * 60 * 1000 (15 minutes)
// max: 100 requests per window
// standardHeaders: true
// legacyHeaders: false
// Custom handler: return 429 JSON { error: "Too many requests", retryAfter: X }
```

## `backend/src/middleware/cors.js`
```js
// CORS options:
// origin: [process.env.FRONTEND_URL || 'http://localhost:5173']
// methods: ['GET', 'POST']
// allowedHeaders: ['Content-Type', 'Authorization']
// credentials: true
```

## `backend/src/middleware/errorHandler.js`
```js
// Global error handler (4-arg Express middleware)
// Log error with winston (include stack in development)
// Return JSON: { error: message, ...(dev ? { stack } : {}) }
// Map common errors: ValidationError → 400, NotFoundError → 404, default → 500
```

## `backend/src/middleware/logger.js`
```js
// Winston logger configuration:
// transports: [Console (colorized in dev), File (error.log), File (combined.log)]
// format: timestamp + json
// Log every request: method, path, status, duration, ip
// Morgan-style request logging middleware
```

## `backend/src/routes/chat.js`
```js
// POST /api/chat
// Body: { message: string, context?: string, sessionId?: string }
// Validation: message required, max 500 chars
// Call chatController.processMessage
// Return: { response: { headline, body, steps, actions, followUps }, intent, sessionId }

// GET /api/chat/history/:sessionId  (future — return empty array for now)
```

## `backend/src/routes/states.js`
```js
// GET /api/states — return all state summaries
// GET /api/states/:code — return full state data for given state code
// 404 if state not found
```

## `backend/src/routes/health.js`
```js
// GET /api/health
// Return: { status: 'ok', timestamp, uptime, version, services: { cache, openai } }
```

## `backend/src/controllers/chatController.js`
```js
// processMessage(req, res, next):
// 1. Extract and validate input
// 2. Check cache (node-cache, key = normalized input, TTL = 3600s)
// 3. If cached: return cached response
// 4. Try OpenAI if OPENAI_API_KEY set:
//    - System prompt: "You are ElectIQ India, a helpful election information assistant. 
//      Answer only Indian election-related questions based on ECI guidelines. Be accurate, neutral, and cite that 
//      users should verify with official sources. Format responses as JSON with 
//      keys: headline, body, steps (array), actions (array of {label, url}), followUps (array of strings)"
//    - Model: gpt-4o-mini, max_tokens: 800, temperature: 0.3
//    - Parse JSON response
// 5. Fallback: call nlpService.process(message, context)
// 6. Cache result
// 7. Log intent + response time
// 8. Return response
```

## `backend/src/services/nlpService.js`
```js
// Mirror of frontend NLP engine but in Node.js
// process(input, context) → { intent, headline, body, steps, actions, followUps }
// Import knowledgeBase from data/knowledgeBase.js
// Import intentClassifier from utils/intentClassifier.js
// Same algorithm as frontend engine
```

## `backend/src/services/openaiService.js`
```js
// Initialize OpenAI client only if OPENAI_API_KEY present
// async chat(userMessage, context):
//   - Build messages array with system prompt + user message
//   - Call openai.chat.completions.create(...)
//   - Parse and validate JSON response
//   - Return structured response or throw on parse failure
// Export: { chat, isAvailable: () => boolean }
```

## `backend/src/services/cacheService.js`
```js
// Wrapper around node-cache:
// TTL: 3600s (1 hour) for chat responses
// TTL: 86400s (24 hours) for state data
// Methods: get(key), set(key, value, ttl?), del(key), flush()
// Key normalization: lowercase, trim, remove extra spaces
// Export stats: { hits, misses, keys }
```

## `backend/src/data/knowledgeBase.js`
Same knowledge base as frontend but as a CommonJS/ESM module. Add 10 additional entries not in the frontend (edge cases, less common questions).

## `backend/src/data/stateData.js`
Complete state data object — same key Indian states and UTs as frontend + placeholder entries.

## `backend/src/utils/intentClassifier.js`
Identical algorithm to frontend intentClassifier but as a backend module.

## `backend/src/utils/responseFormatter.js`
```js
// Format raw NLP response into consistent API response shape:
// { intent, confidence, response: { headline, body, steps, actions, followUps }, meta: { cached, responseTime, source } }
```

## `backend/tests/chat.test.js`
```js
// Test cases using jest + supertest:
// - POST /api/chat returns 200 with valid response shape
// - POST /api/chat with empty body returns 400
// - POST /api/chat with message > 500 chars returns 400
// - POST /api/chat with "register to vote" detects voter_registration intent
// - POST /api/chat with "what ID do I need in Maharashtra" detects id_requirements + state=MH
// - GET /api/health returns { status: 'ok' }
// - GET /api/states returns array
// - GET /api/states/MH returns Maharashtra data
// - GET /api/states/ZZ returns 404
// - Rate limit test (mock 101 requests, expect 429 on last)
```

## `backend/tests/nlp.test.js`
```js
// Unit tests for NLP engine:
// - intentClassifier correctly classifies 10 sample inputs
// - nlpService returns structured response for each intent
// - Response always includes headline, body, followUps
// - Unknown input returns 'default' intent
// - Context boosting works correctly
```

---

## ENVIRONMENT FILES

### `frontend/.env.example`
```
VITE_API_BASE_URL=http://localhost:3001
```

### `backend/.env.example`
```
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
OPENAI_API_KEY=your_openai_api_key_here_optional
LOG_LEVEL=info
CACHE_TTL=3600
```

---

## `docker-compose.yml`
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports: ["3001:3001"]
    environment:
      - NODE_ENV=production
      - PORT=3001
    env_file: ./backend/.env
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  frontend:
    build: ./frontend
    ports: ["80:80"]
    depends_on: [backend]
    restart: unless-stopped
```

Add `backend/Dockerfile` (node:20-alpine, WORKDIR /app, COPY package.json, RUN npm ci --production, COPY src, CMD node src/server.js) and `frontend/Dockerfile` (node:20-alpine build stage → nginx:alpine serve stage, COPY dist to /usr/share/nginx/html).

---

## `README.md`
Complete README including:
- Project overview and screenshot placeholder
- Architecture diagram (ASCII)
- Prerequisites (Node 20+, npm 9+)
- Setup instructions (clone → `cd frontend && npm install && npm run dev`, `cd backend && npm install && npm run dev`)
- Environment variable setup for each service key
- Docker setup instructions
- API documentation (all endpoints, request/response shapes)
- Testing instructions (`npm test`)
- Deployment guide (Vercel for frontend, Cloud Run for backend)
- Contributing guide
- License

---

# ACCESSIBILITY REQUIREMENTS (WCAG 2.1 AA — EVERY COMPONENT)

- Every interactive element: `aria-label` or `aria-labelledby`, correct `role`
- Color contrast: ≥ 4.5:1 for normal text, ≥ 3:1 for large text — verify against both light and dark tokens
- `prefers-reduced-motion`: wrap all Framer Motion animations in `useReducedMotion()` hook — if true, disable or reduce animations
- Keyboard: full Tab/Shift+Tab/Enter/Space/Escape support. Custom components (chips, dropdowns, accordions) follow ARIA keyboard patterns
- `aria-live="polite"` on chat message list, `aria-live="assertive"` on error messages
- Focus management: when sidebar opens on mobile, focus moves to first interactive element inside; when closed, focus returns to trigger
- Visible focus ring on all focusable elements using `outline: 2px solid var(--md-primary); outline-offset: 2px`
- Skip link: `<a href="#main-content" class="skip-link">Skip to main content</a>` — visible on focus only
- All SVG icons: `aria-hidden="true"` with text labels, OR `role="img"` with `<title>` element
- Form inputs: explicit `<label>` association, `aria-required`, `aria-describedby` for helper text
- Images: meaningful `alt` text or `alt=""` if decorative
- Page `<title>` updates on route change using React Router's `useEffect`

---

# PERFORMANCE REQUIREMENTS

- React code splitting: each page component is `React.lazy()` + `<Suspense fallback={<Skeleton>}>`
- Memoize expensive computations: `useMemo` for intent classification, `useCallback` for event handlers
- Virtual list for chat messages if count > 50 (implement simple windowing — render only visible messages)
- Image optimization: all SVGs inline (no external image requests beyond Google Fonts)
- CSS: no unused rules, use `will-change: transform` only on actively animated elements
- Backend: gzip compression via `compression()` middleware, HTTP caching headers on state data endpoint (`Cache-Control: public, max-age=3600`)
- Bundle size target: frontend JS < 200KB gzipped (Vite tree-shaking handles this naturally)

---

# FINAL OUTPUT INSTRUCTION

Generate **every file** in the project structure listed above. Output them sequentially, each preceded by a comment with the file path:

```
// FILE: frontend/package.json
[complete file content]

// FILE: frontend/vite.config.js
[complete file content]

// FILE: frontend/index.html
[complete file content]

// FILE: frontend/src/main.jsx
[complete file content]

// ... continue for ALL files
```

Do not truncate any file. Do not use `// ... rest of implementation`. Do not skip any file. Do not add commentary between files. Every component must be a complete, working React component. Every backend file must be complete, working Node.js/ESM code. The project must run with `npm install && npm run dev` in both `frontend/` and `backend/` directories.

Output every single line of every single file.
