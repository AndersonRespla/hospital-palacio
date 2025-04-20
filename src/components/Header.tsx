"use client";
import React from "react";

const Header: React.FC = () => (
  <header className="fixed top-0 left-0 w-full bg-white shadow px-4 py-2 flex justify-between items-center z-50">
    <h1 className="text-xl font-bold">Hospital Virtual</h1>
    <div>{/* Usuário/avatar placeholder */}</div>
  </header>
);

export default Header;
