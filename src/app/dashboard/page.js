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
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <FavoritesPanel />

      <div className="p-6 space-y-8">
        <h1 className="text-3xl font-bold">Spotify Taste Mixer</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ArtistWidget />
          <TrackWidget />
          <GenreWidget />
          <DecadeWidget />
          <MoodWidget />
          <PopularityWidget />
        </div>

        <PlaylistDisplay />
      </div>
    </div>
  );
}
