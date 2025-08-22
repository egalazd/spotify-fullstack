import React, { useState } from 'react'
import SearchBar from './components/SearchBar.jsx'
import TrackList from './components/TrackList.jsx'
import { PlayerProvider } from './PlayerContext.jsx'
import PlayerBar from './components/PlayerBar.jsx'

export default function App() {
  const [results, setResults] = useState([])

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
