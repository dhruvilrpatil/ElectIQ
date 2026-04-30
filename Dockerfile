# ─── Stage 1: Build frontend ─────────────────────────────────────────────────
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./

# Bake env vars into the Vite bundle at build time
ARG VITE_API_BASE_URL=""
ARG VITE_GOOGLE_MAPS_API_KEY="AIzaSyCpySv7WBCRbyz7LMP7Ja-c-WeZegMLz3k"
ARG VITE_GA4_MEASUREMENT_ID="G-2857P82R8J"
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_GOOGLE_MAPS_API_KEY=$VITE_GOOGLE_MAPS_API_KEY
ENV VITE_GA4_MEASUREMENT_ID=$VITE_GA4_MEASUREMENT_ID

RUN npm run build

# ─── Stage 2: Install backend dependencies ───────────────────────────────────
FROM node:20-alpine AS backend-builder
WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci --omit=dev

COPY backend/ ./

# ─── Stage 3: Production image ───────────────────────────────────────────────
FROM node:20-alpine
WORKDIR /app

# Copy artefacts from previous stages
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist
COPY --from=backend-builder  /app/backend        ./backend

WORKDIR /app/backend

# Runtime environment
ENV NODE_ENV=production
ENV PORT=8080

# Service account credentials for Vertex AI (primary Gemini auth)
ENV GOOGLE_APPLICATION_CREDENTIALS=credentials/gemini-key.json

# Google AI Studio API key — fallback Gemini auth
ARG GEMINI_API_KEY="AIzaSyBDamKXH5kfTQwWIRIBU6xiPMsvLHBdJTQ"
ENV GEMINI_API_KEY=$GEMINI_API_KEY

# Google Translate API key (used by translateService.js)
ARG GOOGLE_TRANSLATE_API_KEY="AIzaSyBzvoBS_vxAX5iWaFXZ1A_BWeynb2wN-lE"
ENV GOOGLE_TRANSLATE_API_KEY=$GOOGLE_TRANSLATE_API_KEY

# Google Custom Search (used by searchService.js)
ARG GOOGLE_SEARCH_API_KEY="AIzaSyCup5osPYycCBajQyclVuH2IqDnrBIFxds"
ARG GOOGLE_CSE_ID="60ab2b29c2af2420c"
ENV GOOGLE_SEARCH_API_KEY=$GOOGLE_SEARCH_API_KEY
ENV GOOGLE_CSE_ID=$GOOGLE_CSE_ID

EXPOSE 8080
CMD ["npm", "start"]
