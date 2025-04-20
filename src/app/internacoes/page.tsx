"use client";
"use client";
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import useRequireAuth from "../../../hooks/useRequireAuth";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import type { Internacao } from "../../models/models";

export default function InternacoesPage() {
  const status = useRequireAuth();
  if (status === "loading") return <div>Validando sessão...</div>;
  const [items, setItems] = useState<Internacao[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/internacoes?page=${page}&limit=5&search=${encodeURIComponent(search)}`)
      .then((res) => res.json())
      .then(({ data, lastPage: lp }) => {
        setItems(data);
        setLastPage(lp);
        setLoading(false);
      });
  }, [page, search]);

  if (loading) return <div className="p-4">Carregando internações...</div>;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 overflow-auto">
          <h1 className="text-xl font-bold mb-4">Internações</h1>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar por setor ou ID..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full border p-2 rounded"
            />
          </div>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Data Admissão</th>
                <th className="border p-2">Previsão Alta</th>
                <th className="border p-2">Setor</th>
                <th className="border p-2">Cama</th>
                <th className="border p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={`${i.internoId}-${i.cama}`} className="hover:bg-gray-100">
                  <td className="border p-2">{i.internoId}</td>
                  <td className="border p-2">{i.dataAdmissao}</td>
                  <td className="border p-2">{i.dataPrevisaoAlta}</td>
                  <td className="border p-2">{i.setor}</td>
                  <td className="border p-2">{i.cama}</td>
                  <td className="border p-2 space-x-2">
                    <Link href={`/internacoes/${i.internoId}`} className="text-blue-600 hover:underline">
                      Ver
                    </Link>
                    <Link href={`/internacoes/${i.internoId}/edit`} className="text-green-600 hover:underline">
                      Editar
                    </Link>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={async () => {
                        if (confirm("Excluir internação?")) {
                          await fetch(`/api/internacoes/${i.internoId}`, { method: "DELETE" });
                          setItems(curr => curr.filter(x => x.internoId !== i.internoId));
                        }
                      }}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Anterior
            </button>
            <span>Página {page} de {lastPage}</span>
            <button
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setPage(p => Math.min(p + 1, lastPage))}
              disabled={page === lastPage}
            >
              Próximo
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
