"use client";

import { useEffect, useState } from "react";

export default function FavoritesPanel() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favorite_tracks") || "[]"));
  }, []);

  const removeFavorite = (track) => {
    const updated = favorites.filter(f => f.id !== track.id);
    setFavorites(updated);
    localStorage.setItem("favorite_tracks", JSON.stringify(updated));
  };

  return (
    <div className="bg-zinc-900 p-4 rounded space-y-3">
      <h2 className="text-lg font-semibold">Favoritos</h2>

      {favorites.length === 0 && (
        <p className="text-gray-400 text-sm">No tienes favoritos aún.</p>
      )}

      {favorites.map(f => (
        <div key={f.id} className="flex items-center gap-3 bg-zinc-800 p-2 rounded">
          <img src={f.album?.images?.[0]?.url} className="w-10 h-10 rounded" alt="" />
          <span className="flex-1 truncate">{f.name}</span>

          <button
            onClick={() => removeFavorite(f)}
            className="text-red-500 hover:text-red-400 text-xl"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
