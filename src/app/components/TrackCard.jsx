"use client";

export default function TrackCard({
  track,
  onRemove,
  onToggleFavorite,
  isFavorite = false
}) {
  return (
    <div className="flex items-center gap-4 p-3 bg-zinc-800 rounded-lg">

      <img
        src={track.album?.images?.[0]?.url}
        alt={track.name}
        className="w-12 h-12 rounded"
      />

      <div className="flex flex-col flex-1">
        <p className="font-semibold">{track.name}</p>
        <p className="text-gray-400 text-sm">{track.artists?.[0]?.name}</p>
      </div>

      <button
        onClick={() => onToggleFavorite(track)}
        className="text-yellow-400 text-xl"
      >
        {isFavorite ? "★" : "☆"}
      </button>

      <button
        onClick={() => onRemove(track.id)}
        className="text-red-500 text-xl"
      >
        ✕
      </button>

    </div>
  );
}
