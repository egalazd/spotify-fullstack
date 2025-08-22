# Spotify Fullstack (Vite + Express + Vercel)

## Dev local
1) `cp .env.example .env` y completa tus credenciales de Spotify.
2) `npm install` en la **raíz**.
3) `cd client && npm install`.
4) En la **raíz**: `npm run dev`.

Vite corre en 5173 con proxy `/api` hacia `http://localhost:3000`. Express corre en 3000.

## Producción (Vercel)
Sube el ZIP. Frontend: `client/dist` y API: `/api/*`.