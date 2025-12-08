"use client";

import { useState } from "react";

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

  // ================================
  // ESTADOS NECESARIOS
  // ================================
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedDecades, setSelectedDecades] = useState([]);
  const [selectedMood, setSelectedMood] = useState({});
  const [popularity, setPopularity] = useState([0, 100]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <FavoritesPanel />

      <div className="p-6 space-y-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <ArtistWidget 
            selectedItems={selectedArtists}
            onSelect={setSelectedArtists}
          />
          <TrackWidget
            selectedItems={selectedTracks}
            onSelect={setSelectedTracks}
          />
          <GenreWidget />
          <DecadeWidget
            selectedItems={selectedDecades}
            onSelect={setSelectedDecades}
          />
          <MoodWidget />
          <PopularityWidget />
        </div>

        <PlaylistDisplay />
      </div>
    </div>
  );
}
