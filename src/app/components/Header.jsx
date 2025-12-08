"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "../../lib/auth";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="bg-zinc-950 px-8 py-4 flex justify-between items-center border-b border-zinc-800shadow-sm">

      <h1 className="text-2xl font-semibold tracking-wide text-white">
        Taste<span className="text-green-500 ml-1">Mixer</span>
      </h1>

      {/* NAVIGATION */}
      <nav className="flex items-center gap-8 text-zinc-400 text-sm">
        <Link 
          href="/dashboard" 
          className="hover:text-white transition-colors"
        >
          Dashboard
        </Link>

        <Link 
          href="/about" 
          className="hover:text-white transition-colors"
        >
          About
        </Link>

        <button onClick={handleLogout} className="text-red-400 hover:text-red-300 transition-colors">
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
}
