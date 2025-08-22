import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import serverless from 'serverless-http';   // 👈 nuevo
import spotifyRouter from './routes/spotify.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// API bajo /api/spotify/*
app.use('/api/spotify', spotifyRouter);

// Health
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// 👉 Exporta handler para Vercel
export default serverless(app);

// 👉 Solo escucha puerto en local (vercel dev / npm run dev)
if (!process.env.VERCEL) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`API on http://localhost:${port}`));
}
