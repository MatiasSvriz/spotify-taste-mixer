"use client";

export default function TrackCard({ track, onRemove }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded">
      <img
        src={track.album.images?.[0]?.url}
        alt="cover"
        className="w-12 h-12 rounded"
      />

      <div className="flex flex-col flex-1">
        <p className="font-semibold">{track.name}</p>
        <p className="text-gray-400 text-sm">{track.artists[0].name}</p>
      </div>

      <button
        onClick={() => onRemove(track.id)}
        className="text-red-500 hover:text-red-400 text-lg"
      >
        ✕
      </button>
    </div>
  );
}
