import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import spotifyRouter from './routes/spotify.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/spotify', spotifyRouter)
app.get('/api/health', (_req, res) => res.json({ ok: true }))

// Handler para Vercel
export default function handler(req, res) {
  return app(req, res)
}

// Solo en local
if (!process.env.VERCEL) {
  const port = process.env.PORT || 3000
  app.listen(port, () => console.log(`API on http://localhost:${port}`))
}
