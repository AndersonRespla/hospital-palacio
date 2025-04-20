"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useRequireAuth from "../../../../hooks/useRequireAuth";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

export default function RegistroDetailPage() {
  const status = useRequireAuth();
  if (status === "loading") return <div>Validando sessão...</div>;
  const { id } = useParams();
  // ... restante da lógica da página de detalhe de registro
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Detalhe do Registro {id}</h1>
          {/* Conteúdo do registro */}
        </main>
      </div>
    </div>
  );
}
