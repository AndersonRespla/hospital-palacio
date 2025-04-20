"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center z-50 sticky top-0 left-0 right-0">
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
        </svg>
        <h1 className="text-xl font-bold text-gray-800 hidden md:block">Hospital Palácio</h1>
      </div>
      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (query.trim()) {
            router.push(`/search?query=${encodeURIComponent(query)}`);
          }
        }}
        className="flex-1 max-w-md mx-4"
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar em todo o app..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
      </form>
      
      <div className="flex items-center">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
        </button>
        
        <div className="ml-4 flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">AP</div>
          <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
