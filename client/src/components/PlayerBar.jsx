import React from 'react'
import { usePlayer } from '../PlayerContext.jsx'

export default function PlayerBar() {
  const { current, isPlaying, toggle, pause } = usePlayer()
  if (!current) return null

  const by = (current.artists || []).join(', ')
  const canPlay = !!current.preview_url

  return (
    <div className="playerbar">
      <div className="info">
        <img src={current.image || ''} alt="" />
        <div className="txt">
          <div className="name" title={current.name}>{current.name}</div>
          <div className="by" title={by}>{by}</div>
        </div>
      </div>
      <div className="controls">
        <button className="btn" onClick={() => toggle(current)} disabled={!canPlay}>
          {isPlaying ? 'Pausa' : 'Reproducir'}
        </button>
        <button className="btn" onClick={pause} disabled={!isPlaying}>Detener</button>
      </div>
    </div>
  )
}
