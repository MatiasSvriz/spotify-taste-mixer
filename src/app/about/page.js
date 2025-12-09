"use client";

import Header from "../components/Header";

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* HEADER */}
      <Header />

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex items-center justify-center p-8"  >
        <div className="max-w-xl text-center space-y-6">

          <h1 className="text-4xl font-bold">
            Sobre <span className="text-green-500">TasteMixer</span>
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed">
            TasteMixer es una aplicación creada para mezclar tu gusto musical  
            y generar playlists personalizadas utilizando la Spotify Web API.
          </p>

        </div>
      </div>

    </div>
  );
}
