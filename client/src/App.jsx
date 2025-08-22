import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar.jsx'
import TrackList from './components/TrackList.jsx'
import { PlayerProvider } from './PlayerContext.jsx'
import PlayerBar from './components/PlayerBar.jsx'

export default function App() {
  const [results, setResults] = useState([])

  // Búsqueda inicial por defecto: "a"
  useEffect(() => {
    const loadDefault = async () => {
      try {
        const res = await fetch('/api/spotify/search?query=a')
        const data = await res.json()
        setResults(data.results || [])
      } catch (e) {
        console.error('Default search failed', e)
      }
    }
    loadDefault()
  }, [])

  return (
    <PlayerProvider>
      <div className="container">
        <h1 className="h1">Spotify UI</h1>
        <SearchBar onResults={setResults} />
        <TrackList tracks={results} />
      </div>
      <PlayerBar />
    </PlayerProvider>
  )
}
