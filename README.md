<div align="center">

# ElectIQ 🗳️
### Indian Election Intelligence Assistant

*Empowering every Indian citizen to participate fully in democracy — from first-time voters in rural Maharashtra to seasoned political observers in metro cities.*

**[Live Demo →](https://electiq-237155988625.us-central1.run.app/)**

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Gemini](https://img.shields.io/badge/Google_Gemini-1.5_Flash-4285F4?style=flat-square&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![ECI](https://img.shields.io/badge/Grounded_in-ECI_Guidelines-FF9933?style=flat-square)](https://eci.gov.in)

</div>

---

## 📌 Chosen Vertical

**Civic Technology / Government Services — Electoral Participation**

India conducts the world's largest democratic exercise. Yet millions of voters — particularly first-time voters, rural citizens, and those with limited English proficiency — struggle to navigate the electoral process: finding polling booths, understanding EVM operations, knowing their rights under the Model Code of Conduct, or simply checking whether their name is on the voter roll.

ElectIQ targets this gap directly. It is a conversational AI assistant grounded in **Election Commission of India (ECI) guidelines** and the **Representation of the People Act, 1951**, purpose-built to guide Indian citizens through every stage of the electoral journey. The assistant is not a general-purpose chatbot — every response is constrained by a strict electoral knowledge boundary, preventing political bias, misinformation, or off-topic engagement.

---

## 🧠 Approach and Logic

ElectIQ is built on three foundational design principles:

### 1. Verified, Neutral Information
All AI responses are governed by a strict system prompt that binds the Gemini model exclusively to ECI guidelines. The backend applies **prompt sanitisation** before any user input reaches the model, neutralising injection attempts and ensuring the assistant cannot be weaponised to spread electoral misinformation or express partisan opinions.

### 2. Context-Aware Conversation
Rather than treating each user message as an isolated query, ElectIQ maintains a **rolling conversation history** passed to Gemini on every turn. This allows natural follow-up questions — e.g., *"What documents do I need?"* followed by *"How do I do that in Maharashtra?"* — to be answered coherently without the user re-explaining their context.

### 3. Progressive Accessibility
The UI is designed to work for India's diverse population. Key accessibility features include:
- **8 Indian scheduled languages** supported via Gemini's multilingual capability and Google Cloud Translation API for static UI strings.
- **High-contrast, ARIA-compliant interface** with semantic HTML and live screen reader regions.
- **Conversational, jargon-free responses** structured with numbered steps and direct ECI links.
- **Graceful degradation** — features like video embeds and document lookups fail silently on network issues, never breaking the core chat experience.

---

## ⚙️ How the Solution Works

### Architecture Overview

```
User Browser (React 18 + Vite)
        │
        ▼
  frontend/src/services/api.js    ←── Centralised API layer (Native Fetch)
        │
        ▼  HTTPS / localhost
  backend/src/server.js (Express 5)
        │
        ├── /api/chat ──────────► Google Gemini Flash (generative-ai SDK)
        ├── /api/search ─────────► Google Custom Search API (site:eci.gov.in)
        ├── /api/youtube ────────► YouTube Data API v3
        └── /api/translate ──────► Google Cloud Translation API
```

### Key Flows & Google Services Integration

**1. AI Chat Flow (Google Gemini)**
```
User message
  → Input validation (express-validator)
  → Prompt sanitisation (strip injection patterns)
  → SHA-256 cache lookup
  → [Cache miss] → Gemini API call with rolling history + system prompt
  → Streamed tokens → Frontend renders progressively
```

**2. ECI Document Lookup (Google Custom Search API)**
When the AI response references an official ECI document, the frontend automatically triggers `GET /api/search`, which queries the **Google Custom Search API** scoped to `site:eci.gov.in`. The top results render as a *"Related Official Documents"* card beneath the message — giving users a direct path to primary sources.

**3. Embedded Video Education (YouTube Data API)**
Topic keywords are extracted from the AI response and used to query the **YouTube Data API v3**, filtered to official government channels. An embedded video card renders below the response for visual learners — particularly effective for topics like EVM operation or NOTA usage that benefit from demonstration.

**4. Multilingual Support (Google Cloud Translation API)**
When a user selects a language, all subsequent prompts include a language instruction directive to Gemini, which generates the full response in that language. Static UI strings (labels, tooltips, navigation) are translated via the **Google Cloud Translation API** and cached locally to reduce API calls on repeat visits.

**5. Hemicycle Seat Visualiser**
The interactive parliamentary dashboard renders an SVG hemicycle for Lok Sabha or selected State Assemblies. To keep the app bundle size under 10MB, this uses a custom-built pure mathematics SVG engine instead of heavy charting libraries. 

---

## 🏆 Judging Criteria Execution

### 💻 Code Quality
- **Monorepo Structure**: Clean separation of concerns between `backend` (Express) and `frontend` (React + Vite).
- **Maintainability**: Global state management via `Zustand`. Centralised configuration in `backend/src/config/constants.js`.
- **Zero-Dependency UI**: The frontend uses standard Material Design 3 CSS tokens mapped directly into `index.css` without relying on bulky external component libraries, reducing load times.

### 🛡️ Security
- **Strict Data Sanitisation**: Inputs are filtered via `express-validator` and `striptags` to prevent XSS and prompt injection.
- **Header Protection**: Uses `helmet` to strictly enforce Content Security Policies (CSP).
- **Environment Isolation**: API errors and stack traces are completely masked from the client, returning standardized `AppError` responses.
- **Zero Exposed Keys**: All Google Service keys remain exclusively on the server side.

### ⚡ Efficiency
- **Sub-10MB Footprint**: Production builds are heavily optimized. Removed all unused libraries (`axios`, `framer-motion`) and replaced them with native `fetch` and CSS animations. 
- **LRU Caching**: The backend caches all API responses (Gemini, Search, YouTube, Translate) using an in-memory LRU cache based on SHA-256 hashes of the prompts. This dramatically reduces latency and API costs.
- **Streaming**: Gemini responses are streamed token-by-token directly to the user for instantaneous feedback.

### 🧪 Testing
- **Comprehensive Coverage**: Achieved >78% backend code coverage using `Vitest` and `Supertest`.
- **Integration Tests**: Mocked Google API endpoints to thoroughly test success, error handling, and graceful degradation paths (e.g., handling YouTube API 403 Quota Exceeded gracefully).

### ♿ Accessibility
- **WCAG 2.1 Compliance**: Color contrast meets strict AA/AAA standards (including Dark Mode).
- **Screen Readers**: Elements utilize `aria-live="polite"`, `role="log"`, and visually hidden (`sr-only`) labels for smooth screen reader experiences.
- **Keyboard Navigation**: Full application is navigable via keyboard with distinct focus rings.

---

## 📁 Project Structure

```
ElectIQ/
├── backend/
│   ├── src/
│   │   ├── config/         # Environment validation and constants
│   │   ├── middleware/     # Rate limiter, errorHandler, input validator
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Gemini, Search, YouTube, Translate integrations
│   │   └── server.js       # Express 5 entry point
│   ├── tests/              # Vitest test suite
│   └── package.json
│
├── frontend/
│   ├── public/             # PWA Manifest and Icons
│   ├── src/
│   │   ├── components/     # Chat, Assembly, Video, Layout
│   │   ├── engine/         # Pure math SVG visualizer
│   │   ├── services/       # Native fetch API layer
│   │   ├── store/          # Zustand global state 
│   │   └── index.css       # MD3 Design System Tokens
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)
- Google Cloud API Keys (Custom Search, YouTube Data, Cloud Translate)

### 1. Clone & Install

```bash
git clone https://github.com/dhruvilrpatil/ElectIQ.git
cd ElectIQ

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Configure Environment Variables

Create `backend/.env`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GOOGLE_CSE_API_KEY=your_cse_key_here
GOOGLE_CSE_CX=your_cx_here
YOUTUBE_API_KEY=your_youtube_key_here
GOOGLE_TRANSLATE_API_KEY=your_translate_key_here
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### 3. Run Locally

```bash
# Start frontend (in one terminal)
cd frontend
npm run dev

# Start backend (in another terminal)
cd backend
npm run dev
```

### 4. Run Tests
```bash
cd backend
npm test
```

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Zustand, React Router DOM, Pure CSS (MD3) |
| **Backend** | Node.js, Express 5, Vitest |
| **AI** | Google Gemini 1.5 Flash (`@google/generative-ai`) |
| **Search** | Google Custom Search API (`site:eci.gov.in`) |
| **Video** | YouTube Data API v3 |
| **Translation** | Google Cloud Translation API |
| **Security** | Helmet (CSP), express-rate-limit, express-validator |
| **Deployment** | Google Cloud Run / Docker |

---

## ✅ Assumptions Made

| Assumption | Detail |
|---|---|
| **Data currency** | Hemicycle seat data is static, sourced from the 18th Lok Sabha General Election (2024). It will require manual updates after future elections. |
| **Language quality** | Gemini handles multilingual response generation natively. Quality may vary for less-resourced scheduled languages; the Google Translate API is used as a fallback for static UI strings. |
| **YouTube quota** | The YouTube Data API v3 free tier allows 10,000 units/day (~100 video lookups/day at ~100 units per search). The app degrades gracefully — hiding the video section — when the quota is reached. |
| **Authentication** | This version has no user authentication. All interactions are stateless and anonymous, consistent with the public-information nature of the assistant. |
| **ECI data accuracy** | The assistant relies on Gemini's training data for procedural ECI information. For time-sensitive or critical decisions, users are always directed to [eci.gov.in](https://eci.gov.in). |

---

## 👥 Team

Built by **Team ElectIQ** — SBMP, Mumbai.

| Name | GitHub |
|---|---|
| Dhruvil Patil | [@dhruvilrpatil](https://github.com/dhruvilrpatil) |

---

## 📄 Disclaimer

ElectIQ is an educational application built for civic awareness. While the assistant strives to provide accurate information grounded in ECI guidelines, always verify critical election details on the official [Election Commission of India website](https://eci.gov.in) before taking action.

---

<div align="center">

*Built with ❤️ for Indian democracy.*

</div>