"use client";

import TrackCard from "./TrackCard";

export default function PlaylistDisplay({
  playlist,
  setPlaylist,
  onRegenerate,
  onAddMore,
  favorites = [],
  toggleFavorite
}) {
  const removeTrack = (id) =>
    setPlaylist(prev => prev.filter(t => t.id !== id));

  return (
    <div className="bg-zinc-900 p-6 rounded space-y-4">

      <div className="flex gap-3">
        <button
          onClick={onRegenerate}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded"
        >
          Regenerar
        </button>

        <button
          onClick={onAddMore}
          className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded"
        >
          Añadir Más
        </button>
      </div>

      {/* Lista de tracks */}
      <div className="space-y-2">
        {playlist.map(track => (
          <TrackCard
            key={track.id}
            track={track}
            onRemove={removeTrack}
            onToggleFavorite={toggleFavorite}
            isFavorite={favorites.some(f => f.id === track.id)}
          />
        ))}

        {playlist.length === 0 && (
          <p className="text-gray-400 text-sm">No hay canciones aún.</p>
        )}
      </div>
    </div>
  );
}
