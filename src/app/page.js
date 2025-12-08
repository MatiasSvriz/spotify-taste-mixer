"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getSpotifyAuthUrl } from "../lib/auth";

export default function Home() {
  const router = useRouter();

  // Redirect si ya está logueado
  useEffect(() => {
    if (isAuthenticated()) router.push("/dashboard");
  }, [router]);

  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6">
      
      {/* Título */}
      <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-4">
        🎵 Spotify <span className="text-green-500">Taste Mixer</span>
      </h1>

      {/* Subtítulo */}
      <p className="text-gray-400 text-lg max-w-xl mb-10">
        Genera playlists personalizadas combinando tus artistas, géneros, moods y épocas favoritas.
      </p>

      {/* Botón login estilo Spotify */}
      <button
        onClick={handleLogin}
        className="bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-3 rounded-full text-lg shadow-md transition"
      >
        Iniciar sesión con Spotify
      </button>

      {/* Footer */}
      <p className="text-gray-600 text-xs mt-12">
        Proyecto académico desarrollado por Matías 🎧
      </p>
    </div>
  );
}
