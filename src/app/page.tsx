"use client";

import useRequireAuth from "../hooks/useRequireAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";

export default function Home() {
  // 1. Valida sessão e já redireciona se não autenticado
  const status = useRequireAuth();
  if (status === "loading") return <div>Validando sessão...</div>;

  // 2. Só chega aqui se estiver logado
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-4 bg-gray-50">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}
