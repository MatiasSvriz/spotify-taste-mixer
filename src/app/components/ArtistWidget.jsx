"use client";

import { useState, useEffect } from "react";
import { getAccessToken } from "../../lib/auth";

export default function ArtistWidget({ selectedItems = [], onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const MAX_ARTISTS = 5;

  // BÚSQUEDA CON DEBOUNCE
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => searchArtists(query), 400);
    return () => clearTimeout(timer);

  }, [query]);

  // BUSCAR ARTISTAS
  async function searchArtists(q) {
    const token = getAccessToken();
    if (!token) return;

    const res = await fetch(
      `https://api.spotify.com/v1/search?type=artist&q=${encodeURIComponent(q)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
    
    setResults(
      (data.artists?.items || [])
        .slice(0, 5)
        .map(a => ({
          id: a.id,
          name: a.name,
          image: a.images?.[0]?.url
        }))
    );
  }

   function toggleArtist(artist) {
    const exists = selectedItems.some(a => a.id === artist.id);

    if (exists) {
      onSelect(selectedItems.filter(a => a.id !== artist.id));
      return;
    }

    onSelect([...selectedItems, artist]);
  }

  return (
    <div className="bg-zinc-900 p-4 rounded border border-zinc-800 space-y-4">
      
      <h2 className="text-lg font-semibold">Artistas favoritos</h2>

      <input
        type="text"
        placeholder="Buscar artista..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 outline-none"
      />

      {/* Seleccionados */}
      <div className="flex flex-wrap gap-2">
        {selectedItems.map((artist) => (
          <div
            key={artist.id}
            onClick={() => toggleArtist(artist)}
            className="flex items-center gap-2 px-3 py-1 bg-green-600 rounded cursor-pointer text-sm"
          >
            {artist.image && (
              <img
                src={artist.image}
                alt={artist.name}
                className="w-6 h-6 rounded-full object-cover"
              />
            )}
            {artist.name} ✕
          </div>
        ))}
      </div>

      {/* Resultados de búsqueda */}
      <div className="space-y-2">
        {results.map((artist) => (
          <div
            key={artist.id}
            onClick={() => toggleArtist(artist)}
            className="flex items-center gap-3 p-2 rounded bg-zinc-800 hover:bg-zinc-700 cursor-pointer transition"
          >
            {artist.image ? (
              <img
                src={artist.image}
                alt={artist.name}
                className="w-10 h-10 object-cover rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-zinc-700" />
            )}
            <span>{artist.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
