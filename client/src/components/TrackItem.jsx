import React from 'react'
import { usePlayer } from '../PlayerContext.jsx'

export default function TrackItem({ track = {} }) {
  const { current, isPlaying, toggle } = usePlayer()
  const active = current?.id === track.id && isPlaying
  const by = (track.artists || []).join(', ')

  return (
    <div className={`card ${active ? 'playing' : ''}`}>
      {track.image ? <img className="cover" src={track.image} alt="" /> : <div className="cover" />}
      <button
        className="playbtn"
        onClick={() => toggle(track)}
        disabled={!track.preview_url}
        title={track.preview_url ? (active ? 'Pausar' : 'Reproducir') : 'Sin preview'}
      >
        {active ? '❚❚' : '▶'}
      </button>
      <div className="meta">
        <div className="title" title={track.name}>{track.name || 'Track'}</div>
        <div className="artists" title={by}>{by}</div>
        <div className="album" title={track.album}>Álbum: {track.album || '-'}</div>
      </div>
    </div>
  )
}
