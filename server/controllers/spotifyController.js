const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_SEARCH_URL = 'https://api.spotify.com/v1/search';

let cachedToken = null;
let tokenExpiresAt = 0;

async function getAccessToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpiresAt - 30000) return cachedToken;

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error('Faltan SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET en .env');
  }

  const body = new URLSearchParams({ grant_type: 'client_credentials' });
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const resp = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  });
  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`Error token Spotify: ${resp.status} ${txt}`);
  }
  const data = await resp.json();
  cachedToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in * 1000);
  return cachedToken;
}

export const health = (_req, res) => res.json({ status: 'ok' });

export const searchTracks = async (req, res) => {
  try {
    const q = String(req.query.query || '').trim();
    if (!q) return res.status(400).json({ error: 'Falta query' });

    const token = await getAccessToken();
    const url = new URL(SPOTIFY_SEARCH_URL);
    url.searchParams.set('q', q);
    url.searchParams.set('type', 'track');
    url.searchParams.set('limit', '20');

    const resp = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!resp.ok) {
      const txt = await resp.text();
      return res.status(500).json({ error: `Spotify search error: ${resp.status}`, detail: txt });
    }

    const json = await resp.json();
    const tracks = (json.tracks?.items || []).map(t => ({
      id: t.id,
      name: t.name,
      artists: t.artists?.map(a => a.name) || [],
      album: t.album?.name || '',
      preview_url: t.preview_url || '',
      image: t.album?.images?.[1]?.url || t.album?.images?.[0]?.url || ''
    }));

    res.json({ query: q, results: tracks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error', detail: String(err?.message || err) });
  }
};