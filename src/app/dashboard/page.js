"use client";

import { useState, useEffect } from "react";
import { generatePlaylist } from "../../lib/spotify";

import Header from "../components/Header";
import ArtistWidget from "../components/ArtistWidget";
import TrackWidget from "../components/TrackWidget";
import GenreWidget from "../components/GenreWidget";
import DecadeWidget from "../components/DecadeWidget";
import MoodWidget from "../components/MoodWidget";
import PopularityWidget from "../components/PopularityWidget";
import PlaylistDisplay from "../components/PlaylistDisplay";
import FavoritesPanel from "../components/FavoritesPanel";

export default function Dashboard() {
  
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedDecades, setSelectedDecades] = useState([]);
  const [selectedMood, setSelectedMood] = useState({});
  const [popularity, setPopularity] = useState([0, 100]);

  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);

  const [favorites, setFavorites] = useState(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("favorite_tracks") || "[]");
  });

  const toggleFavorite = (track) => {
    const alreadyFavorite = favorites.some(f => f.id === track.id);
    let updatedFavorites;

    if (alreadyFavorite) {
      updatedFavorites = favorites.filter(f => f.id !== track.id);
    } else {
      updatedFavorites = [...favorites, track];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorite_tracks", JSON.stringify(updatedFavorites));
  };

  const generate = async () => {
    setLoading(true);

    const tracks = await generatePlaylist({
      artists: selectedArtists,
      genres: selectedGenres,
      decades: selectedDecades,
      tracks: selectedTracks,
      mood: selectedMood,
      popularity
    });

    setPlaylist(tracks);
    setLoading(false);
    return tracks;
  };

  const addMore = async () => {
    const extra = await generate();
    const merged = [...playlist, ...extra];

    const unique = Array.from(new Map(merged.map(t => [t.id, t])).values());
    setPlaylist(unique);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      <Header />

      <div className="flex flex-col lg:flex-row p-6 gap-6">

        <div className="flex-1 space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <ArtistWidget selectedItems={selectedArtists} onSelect={setSelectedArtists} />
            <TrackWidget selectedItems={selectedTracks} onSelect={setSelectedTracks} />

            <GenreWidget selectedItems={selectedGenres} onSelect={setSelectedGenres} limit={5} />
            <DecadeWidget selectedItems={selectedDecades} onSelect={setSelectedDecades} />

            <MoodWidget selectedItems={selectedMood} onSelect={setSelectedMood} />
            <PopularityWidget selectedItems={popularity} onSelect={setPopularity} />

          </div>

          <div className="flex justify-center">
            <button
              onClick={generate}
              className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded text-lg"
            >
              {loading ? "Generando..." : "Generar Playlist"}
            </button>
          </div>

          <PlaylistDisplay playlist={playlist} setPlaylist={setPlaylist} 
              onRegenerate={generate} onAddMore={addMore} favorites={favorites} toggleFavorite={toggleFavorite} />

        </div>

        <div className="lg:w-80 w-full">
          <FavoritesPanel />
        </div>

      </div>
    </div>
  );
}
