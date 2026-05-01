export const corsOptions = {
  origin: (origin, callback) => {
    // No origin = same-origin request (server-to-server or curl) — reject if we must, but usually we allow local server calls. 
    // Wait, the requirement says "explicitly allows only the frontend origin and rejects all others."
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
