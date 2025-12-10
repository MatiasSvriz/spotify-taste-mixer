"use client";

import { useState } from "react";

const GENRES = [
  "acoustic","afrobeat","alt-rock","alternative","ambient","anime","black-metal","bluegrass","blues",
  "bossanova","brazil","breakbeat","british","cantopop","chicago-house","children","chill","classical",
  "club","comedy","country","dance","dancehall","death-metal","deep-house","detroit-techno","disco",
  "disney","drum-and-bass","dub","dubstep","edm","electro","electronic","emo","folk","forro","french",
  "funk","garage","german","gospel","goth","grindcore","groove","grunge","guitar","happy","hard-rock",
  "hardcore","hardstyle","heavy-metal","hip-hop","house","idm","indian","indie","indie-pop","industrial",
  "iranian","j-dance","j-idol","j-pop","j-rock","jazz","k-pop","kids","latin","latino","malay","mandopop",
  "metal","metal-misc","metalcore","minimal-techno","movies","mpb","new-age","new-release","opera",
  "pagode","party","philippines-opm","piano","pop","pop-film","post-dubstep","power-pop","progressive-house",
  "psych-rock","punk","punk-rock","r-n-b","rainy-day","reggae","reggaeton","road-trip","rock","rock-n-roll",
  "rockabilly","romance","sad","salsa","samba","sertanejo","show-tunes","singer-songwriter","ska","sleep",
  "songwriter","soul","soundtracks","spanish","study","summer","swedish","synth-pop","tango","techno",
  "trance","trip-hop","turkish","work-out","world-music"
];

export default function GenreWidget({ selectedItems = [], onSelect, limit = 5 }) {
  const [query, setQuery] = useState("");

  const filtered = GENRES.filter(g =>
    g.toLowerCase().includes(query.toLowerCase())
  );

  const toggle = (genre) => {
    const exists = selectedItems.includes(genre);

    if (exists) {
      onSelect(selectedItems.filter(g => g !== genre));
    } else {
      if (selectedItems.length >= limit) return;
      onSelect([...selectedItems, genre]);
    }
  };

  return (
    <div className="bg-zinc-900 p-4 rounded-lg space-y-4">

      <h2 className="text-lg font-semibold">Géneros</h2>

      <input
        className="w-full p-2 rounded bg-zinc-800"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="max-h-48 overflow-y-auto space-y-1">
        {filtered.map((genre) => {
          const active = selectedItems.includes(genre);
          return (
            <button
              key={genre}
              onClick={() => toggle(genre)}
              className={`w-full px-3 py-1 rounded text-left text-sm
                ${active ? "bg-green-600" : "bg-zinc-800 hover:bg-zinc-700"}
              `}
            >
              {genre}
            </button>
          );
        })}
      </div>

      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {selectedItems.map((g) => (
            <span
              key={g}
              onClick={() => toggle(g)}
              className="px-3 py-1 bg-green-600 rounded cursor-pointer text-sm"
            >
              {g} ✕
            </span>
          ))}
        </div>
      )}
    </div>
  );
}