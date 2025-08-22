import React, { useState } from 'react'

export default function SearchBar({ onResults }) {
  const [q, setQ] = useState('')

  const search = async () => {
    if (!q.trim()) return
    try {
      const url = `/api/spotify/search?query=${encodeURIComponent(q)}`
      const res = await fetch(url)
      const data = await res.json()
      onResults?.(data.results || [])
    } catch (e) {
      console.error(e)
      onResults?.([])
    }
  }

  return (
    <div className="toolbar">
      <input className="input" value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar track..." />
      <button className="btn" onClick={search}>Buscar</button>
    </div>
  )
}
