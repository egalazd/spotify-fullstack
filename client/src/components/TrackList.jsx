import React from 'react'
import TrackItem from './TrackItem.jsx'

export default function TrackList({ tracks = [] }) {
  if (!tracks.length) return <p className="muted">No hay resultados aún.</p>
  return (
    <div className="grid">
      {tracks.map((t, i) => <TrackItem key={t.id || i} track={t} />)}
    </div>
  )
}
