# ElectIQ — Indian Election Intelligence Assistant

ElectIQ is a modern, AI-powered election intelligence assistant localized specifically for the Indian electoral system. Built with a sleek Material Design interface and powered by Google Gemini, ElectIQ provides accurate, dynamically generated information adhering strictly to the guidelines of the Election Commission of India (ECI) and the Representation of the People Act, 1951.

## ✨ Key Features

- **Smart AI Chat Assistant:** Ask questions about voter registration, NOTA, EVMs, and the Model Code of Conduct. The assistant provides verified answers, structured steps, and direct links to official ECI resources.
- **Embedded Video Explanations:** Automatically fetches and embeds relevant YouTube educational videos for complex topics like NOTA, EVM operations, and By-elections.
- **Interactive Parliamentary Dashboard:** Features a beautiful, interactive Hemicycle Seat Visualizer for Lok Sabha, Rajya Sabha, and State Assemblies with dynamically calculated seat distributions and party alliances.
- **Election Timelines & State Guides:** Browse structured timelines and state-specific voting guidelines.
- **Modern & Responsive UI:** Built with React 18 and Framer Motion, featuring smooth transitions, a dynamic typing indicator, and responsive sidebar navigation.
- **High Security & Performance:** The backend is fortified with `helmet` for Content Security Policies (CSP), API rate limiting to prevent abuse, and strict prompt sanitization to ensure answers remain neutral and strictly related to Indian elections.

## 🛠️ Technology Stack

**Frontend:**
- React 18
- Vite
- Framer Motion (for animations and micro-interactions)
- Zustand (for global state management)
- React Router DOM
- CSS Modules (Vanilla CSS for maximum design control)

**Backend:**
- Node.js & Express 5
- `@google/generative-ai` (Gemini Flash model)
- Helmet & Express Rate Limit

## 🚀 Getting Started

This project is structured as a monorepo containing both the frontend and backend applications. 

### Prerequisites
- Node.js (v18 or higher recommended)
- A Google Gemini API Key

### 1. Installation

Clone the repository and install dependencies for both the frontend and backend using the root script:

```bash
# Install all dependencies across the monorepo
npm run install:all
```

### 2. Environment Variables

Create a `.env` file in the **backend** directory (`backend/.env`) and add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
FRONTEND_URL=http://localhost:5173
```

*(Optional)* Create a `.env` file in the **frontend** directory (`frontend/.env`) if you need to configure external services like Google Maps.

### 3. Running the Application locally

You can run both the frontend and backend development servers concurrently using the provided npm scripts from the root directory:

```bash
# Start both frontend and backend
npm run dev:frontend
npm run dev:backend
```

Alternatively, to start the production build:
```bash
npm run build
npm run start:backend
```

The frontend will be available at `http://localhost:5173` and the backend will run on `http://localhost:3001`.

## 📦 Project Structure

```text
ElectIQ/
├── backend/               # Node.js Express API
│   ├── src/
│   │   ├── routes/        # API Routes (e.g., /api/chat)
│   │   ├── services/      # Gemini AI integration and prompt rules
│   │   └── server.js      # Server entry point
│   └── package.json
├── frontend/              # React Application
│   ├── src/
│   │   ├── components/    # Reusable UI components (Chat, Sidebar, Assembly)
│   │   ├── engine/        # Static NLP fallback knowledge base
│   │   ├── store/         # Zustand state management
│   │   └── ...
│   └── package.json
├── package.json           # Root monorepo scripts
└── README.md              # Project documentation
```

## 🔒 Security Measures

- **Zero Hardcoded Secrets:** All API keys are securely managed via environment variables.
- **Content Security Policy (CSP):** Implemented via Helmet to prevent XSS attacks while allowing safe video iframe embeds.
- **Rate Limiting:** Protects the `/api/chat` endpoint from spam and DDOS attempts.

## 📄 Disclaimer

This is an educational application. While the assistant strives to provide accurate information based on ECI guidelines, always verify critical election details on the official [Election Commission of India website](https://eci.gov.in).
