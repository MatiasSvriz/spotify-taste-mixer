"use client";

import { useState, useEffect } from "react";
import { getAccessToken } from "../../lib/auth";

export default function TrackWidget({ selectedItems = [], onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const MAX_TRACKS = 5;

  // BÚSQUEDA CON DEBOUNCE
  useEffect(() => {
    if (!query) return setResults([]);

    const t = setTimeout(() => searchTracks(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  // BUSCAR CANCIONES
  async function searchTracks(q) {
    const token = getAccessToken();
    if (!token) return;

    const res = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(q)}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await res.json();

    setResults(
      (data.tracks?.items || [])
        .slice(0, 5)
        .map(t => ({
          id: t.id,
          name: t.name,
          artist: t.artists?.[0]?.name,
          image: t.album?.images?.[0]?.url
        }))
    );
  }

  function toggle(track) {
    const exists = selectedItems.some(t => t.id === track.id);

    if (exists) {
      onSelect(selectedItems.filter(t => t.id !== track.id));
      return;
    }

    onSelect([...selectedItems, track]);
  }

  return (
    <div className="bg-zinc-900 p-4 rounded border border-zinc-800 space-y-3">
      <h2 className="text-lg font-semibold">Canciones</h2>

      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Buscar canción..."
        className="w-full p-2 bg-zinc-800 rounded border border-zinc-700 outline-none"
      />

      {/* Seleccionados */}
      <div className="flex flex-wrap gap-2">
        {selectedItems.map(t => (
          <div
            key={t.id}
            onClick={() => toggle(t)}
            className="flex items-center gap-2 px-3 py-1 bg-green-600 rounded cursor-pointer text-sm"
          >
            {t.image && <img src={t.image} className="w-6 h-6 rounded" />}
            {t.name} ✕
          </div>
        ))}
      </div>

      {/* Resultados */}
      <div className="space-y-1">
        {results.map(t => (
          <div
            key={t.id}
            onClick={() => toggle(t)}
            className="flex items-center gap-3 p-2 bg-zinc-800 rounded cursor-pointer hover:bg-zinc-700 transition"
          >
            {t.image ? (
              <img src={t.image} className="w-10 h-10 rounded object-cover" />
            ) : (
              <div className="w-10 h-10 bg-zinc-700 rounded" />
            )}
            <div>
              <p>{t.name}</p>
              <p className="text-xs text-zinc-400">{t.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
