import React, { createContext, useContext, useMemo, useRef, useState, useEffect } from 'react'

const PlayerCtx = createContext(null)

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio())
  const [current, setCurrent] = useState(null) // { id, name, artists[], album, image, preview_url }
  const [isPlaying, setIsPlaying] = useState(false)

  // limpiar al desmontar
  useEffect(() => () => { audioRef.current.pause(); audioRef.current.src = '' }, [])

  const play = (track) => {
    if (!track?.preview_url) return
    const same = current?.id === track.id
    const audio = audioRef.current
    if (!same) {
      audio.pause()
      audio.src = track.preview_url
      setCurrent(track)
    }
    audio.play().then(() => setIsPlaying(true)).catch(console.error)
  }

  const pause = () => { audioRef.current.pause(); setIsPlaying(false) }
  const toggle = (track) => {
    if (!track?.preview_url) return
    if (current?.id === track.id && isPlaying) pause()
    else play(track)
  }

  // listeners de audio
  useEffect(() => {
    const a = audioRef.current
    const onEnd = () => setIsPlaying(false)
    a.addEventListener('ended', onEnd)
    a.addEventListener('pause', () => setIsPlaying(false))
    a.addEventListener('play', () => setIsPlaying(true))
    return () => {
      a.removeEventListener('ended', onEnd)
      a.removeEventListener('pause', () => setIsPlaying(false))
      a.removeEventListener('play', () => setIsPlaying(true))
    }
  }, [])

  const value = useMemo(() => ({ current, isPlaying, play, pause, toggle }), [current, isPlaying])
  return <PlayerCtx.Provider value={value}>{children}</PlayerCtx.Provider>
}
export const usePlayer = () => useContext(PlayerCtx)
