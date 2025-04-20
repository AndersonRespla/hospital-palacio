"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow px-4 py-2 flex justify-between items-center z-50">
      <h1 className="text-2xl font-bold">Hospital Palacio</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/search?query=${encodeURIComponent(query)}`);
        }}
        className="ml-4 flex"
      >
        <input
          type="text"
          placeholder="Buscar em todo o app..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-1 rounded-l text-black"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 rounded-r hover:bg-blue-700"
        >
          Ir
        </button>
      </form>
      <div>{/* Usuário/avatar placeholder */}</div>
    </header>
  );
};

export default Header;
