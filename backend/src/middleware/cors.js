export const corsOptions = {
  origin: (origin, callback) => {
    // No origin = same-origin request (server-to-server or curl) — always allow
    if (!origin) return callback(null, true);

    const allowed = [
      // Local dev
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3000',
      // Production Cloud Run
      'https://electiq-237155988625.us-central1.run.app',
      // Custom FRONTEND_URL env override
      process.env.FRONTEND_URL,
    ].filter(Boolean);

    // Also allow any *.run.app subdomain (Cloud Run preview URLs)
    const isCloudRun = /\.run\.app$/.test(origin);

    if (allowed.includes(origin) || isCloudRun) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
