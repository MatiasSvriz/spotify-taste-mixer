"use client";

import { useState, useEffect } from "react";
import { getAccessToken } from "../../lib/auth";

export default function ArtistWidget({ selectedItems = [], onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Debounce
  useEffect(() => {
    if (!query) return setResults([]);

    const t = setTimeout(() => searchArtists(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Buscar artistas
  async function searchArtists(q) {
    const token = getAccessToken();
    if (!token) return;

    const res = await fetch(
      `https://api.spotify.com/v1/search?type=artist&q=${encodeURIComponent(q)}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await res.json();

    setResults(
      (data.artists?.items || []).slice(0, 5).map(a => ({
        id: a.id,
        name: a.name,
        image: a.images?.[0]?.url
      }))
    );
  }

  function toggle(item) {
    const isSelected = selectedItems.some(
      (selected) => selected.id === item.id
    );

    let updatedList;

    if (isSelected) {
      updatedList = selectedItems.filter(
        (selected) => selected.id !== item.id
      );
    } else {
      updatedList = [...selectedItems, item];
    }

    onSelect(updatedList);
  }

  return (
    <div className="bg-zinc-900 p-4 rounded border border-zinc-800 space-y-3">
      <h2 className="text-lg font-semibold">Artistas</h2>

      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Buscar artista..."
        className="w-full p-2 bg-zinc-800 rounded border border-zinc-700 outline-none"
      />

      {/* Seleccionados */}
      <div className="flex flex-wrap gap-2">
        {selectedItems.map(a => (
          <div
            key={a.id}
            onClick={() => toggle(a)}
            className="flex items-center gap-2 px-3 py-1 bg-green-600 rounded cursor-pointer text-sm"
          >
            {a.image && <img src={a.image} className="w-6 h-6 rounded-full" />}
            {a.name} ✕
          </div>
        ))}
      </div>

      {/* Resultados */}
      <div className="space-y-1">
        {results.map(a => (
          <div
            key={a.id}
            onClick={() => toggle(a)}
            className="flex items-center gap-3 p-2 bg-zinc-800 rounded cursor-pointer hover:bg-zinc-700 transition"
          >
            {a.image ? (
              <img src={a.image} className="w-10 h-10 rounded-full" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-zinc-700" />
            )}
            <p>{a.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
