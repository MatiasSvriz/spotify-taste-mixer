"use client";

import { useState } from "react";

export default function MoodWidget({ selectedItems = {}, onSelect }) {
  const [energy, setEnergy] = useState(selectedItems.energy ?? 50);
  const [valence, setValence] = useState(selectedItems.valence ?? 50);
  const [danceability, setDanceability] = useState(selectedItems.danceability ?? 50);
  const [acousticness, setAcousticness] = useState(selectedItems.acousticness ?? 50);

  // Moods predefinidos
  const presets = {
    Happy:        { energy: 70, valence: 80, danceability: 70, acousticness: 20 },
    Sad:          { energy: 30, valence: 20, danceability: 30, acousticness: 60 },
    Energetic:    { energy: 90, valence: 60, danceability: 85, acousticness: 10 },
    Calm:         { energy: 20, valence: 60, danceability: 25, acousticness: 70 }
  };

  function applyPreset(preset) {
    const values = presets[preset];

    setEnergy(values.energy);
    setValence(values.valence);
    setDanceability(values.danceability);
    setAcousticness(values.acousticness);

    onSelect(values);
  }

  function update(key, value) {
    const num = Number(value);

    const updated = {
      energy,
      valence,
      danceability,
      acousticness,
      [key]: num
    };

    setEnergy(updated.energy);
    setValence(updated.valence);
    setDanceability(updated.danceability);
    setAcousticness(updated.acousticness);

    onSelect(updated);
  }

  function Slider({ label, value, onChange }) {
    return (
      <div>
        <label className="text-sm opacity-70">{label}: {value}</label>
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full"
        />
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 p-4 rounded border border-zinc-800 space-y-4">
      
      <h2 className="text-lg font-semibold">Mood</h2>

      {/* MOODS PREDEFINIDOS */}
      <div className="flex gap-2 flex-wrap">
        {Object.keys(presets).map((mood) => (
          <button
            key={mood}
            onClick={() => applyPreset(mood)}
            className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded hover:bg-zinc-700 text-sm"
          >
            {mood}
          </button>
        ))}
      </div>

      {/* SLIDERS */}
      <Slider 
        label="Energy" 
        value={energy} 
        onChange={v => update("energy", v)} 
      />

      <Slider 
        label="Valence" 
        value={valence} 
        onChange={v => update("valence", v)} 
      />

      <Slider 
        label="Danceability" 
        value={danceability} 
        onChange={v => update("danceability", v)} 
      />

      <Slider 
        label="Acousticness" 
        value={acousticness} 
        onChange={v => update("acousticness", v)} 
      />

    </div>
  );
}
