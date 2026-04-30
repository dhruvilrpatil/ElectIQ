//geminiService.js
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../middleware/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTEM_PROMPT = `You are ElectIQ — the official AI guide to Indian elections, built in compliance with Election Commission of India (ECI) guidelines.
Base ALL answers strictly on:
1. Representation of the People Act, 1951 (as amended through 2024)
2. ECI notifications and circulars from 2024 General Election (Lok Sabha 18th)
3. Current voter portal: voters.eci.gov.in
4. e-EPIC as the primary digital voter ID standard
5. Lok Sabha 2024: 7 phases (April 19 – June 1), Results: June 4, 2024. NDA won 293 seats. Next General Election: 2029.

Always recommend users verify at voters.eci.gov.in or call 1950.
Never speculate. Be neutral. Do not comment on political parties or candidates.
Respond ONLY as valid JSON (no markdown fences): {"headline":"...","body":"...","steps":[],"actions":[{"label":"...","url":"..."}],"followUps":[]}`;

// Models to try in order of preference
const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-001'];

/* ─── Resolve service-account credentials to absolute path ─────────── */
const rawCredPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (rawCredPath) {
  const absCredPath = path.isAbsolute(rawCredPath)
    ? rawCredPath
    : path.resolve(process.cwd(), rawCredPath);
  if (fs.existsSync(absCredPath)) {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = absCredPath;
    logger.info('Gemini: credentials resolved', { path: absCredPath });
  } else {
    logger.warn('Gemini: credentials file not found', { path: absCredPath });
  }
}

/* ─── Read project ID from service-account key ─────────────────────── */
let vertexProjectId = process.env.GOOGLE_CLOUD_PROJECT || 'electiq-494420';
try {
  const credFile = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (credFile && fs.existsSync(credFile)) {
    vertexProjectId = JSON.parse(fs.readFileSync(credFile, 'utf8')).project_id || vertexProjectId;
  }
} catch { /* use default */ }

/* ─── Build client list (Vertex AI first — has quota; API-key second) ─ */
const clients = [];

// 1) Vertex AI via service account (preferred — no free-tier rate limits)
try {
  const vertexClient = new GoogleGenAI({
    vertexai: true,
    project: vertexProjectId,
    location: 'us-central1',
  });
  clients.push({ label: 'VertexAI', client: vertexClient });
  logger.info('Gemini: Vertex AI client ready', { project: vertexProjectId });
} catch (err) {
  logger.warn('Gemini: Vertex AI init failed', { error: err.message });
}

// 2) API key via Google AI Studio (fallback — may hit free-tier limits)
const apiKey = process.env.GEMINI_API_KEY;
if (apiKey && apiKey.trim()) {
  try {
    const apiKeyClient = new GoogleGenAI({ apiKey: apiKey.trim() });
    clients.push({ label: 'AI-Studio', client: apiKeyClient });
    logger.info('Gemini: AI Studio client ready (API key)');
  } catch (err) {
    logger.warn('Gemini: AI Studio init failed', { error: err.message });
  }
}

if (clients.length === 0) {
  logger.error('Gemini: NO clients available — chatbot will not work');
}

/**
 * Send a message to Gemini and parse the JSON response.
 * Tries every client × model combination until one succeeds.
 */
export async function chat(userMessage, context = null) {
  const contextHint = context && context !== 'default'
    ? `\n[Conversation context: user was asking about "${context}"]`
    : '';
  const prompt = userMessage + contextHint;

  for (const { label, client } of clients) {
    for (const modelName of MODELS) {
      try {
        const result = await client.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            systemInstruction: SYSTEM_PROMPT,
          },
        });

        const rawText = result.text;
        if (!rawText) continue;

        logger.info('Gemini: success', { backend: label, model: modelName });

        // Strip optional markdown code fences before JSON.parse
        const cleaned = rawText.replace(/^```json?\s*/i, '').replace(/```\s*$/i, '').trim();

        try {
          return JSON.parse(cleaned);
        } catch {
          // Model returned plain text — wrap so frontend gets correct shape
          return {
            headline: 'ElectIQ',
            body: rawText.trim(),
            steps: [],
            actions: [{ label: 'Verify at ECI', url: 'https://voters.eci.gov.in' }],
            followUps: [],
          };
        }
      } catch (err) {
        logger.warn(`Gemini [${label}/${modelName}] failed`, {
          error: err.message?.slice(0, 200) || String(err),
          status: err.status || '',
        });
        // continue to next model / client
      }
    }
  }

  throw new Error('All Gemini backends failed. Check API key quota and Vertex AI access.');
}

export const isAvailable = () => clients.length > 0;

export default { chat, isAvailable };