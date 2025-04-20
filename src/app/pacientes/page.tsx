"use client";
"use client";
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "../../components/Modal";
import FormPaciente from "../../components/FormPaciente";
import useRequireAuth from "../../hooks/useRequireAuth";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import type { PacienteVirtual } from "../../models/models";

export default function PacientesPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selected, setSelected] = useState<PacienteVirtual | null>(null);
  const status = useRequireAuth();
  if (status === "loading") return <div>Validando sessão...</div>;
  const [items, setItems] = useState<PacienteVirtual[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/pacientes?page=${page}&limit=5&search=${encodeURIComponent(search)}`)
      .then((res) => res.json())
      .then(({ data, lastPage: lp }) => {
        setItems(data);
        setLastPage(lp);
        setLoading(false);
      });
  }, [page, search]);

  if (loading) return <div className="p-4">Carregando pacientes...</div>;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 overflow-auto">
          <div className="flex justify-between items-center mb-4">
  <h1 className="text-xl font-bold">Pacientes</h1>
  <button
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    onClick={() => setShowCreate(true)}
  >
    Novo Paciente
  </button>
</div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar por nome ou ID..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full border p-2 rounded"
            />
          </div>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Nome</th>
                <th className="border p-2">Doença</th>
                <th className="border p-2">Custo/mês</th>
                <th className="border p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="hover:bg-gray-100">
                  <td className="border p-2">{p.id}</td>
                  <td className="border p-2">{p.nomeFicticio}</td>
                  <td className="border p-2">{p.siglaDoenca}</td>
                  <td className="border p-2">R$ {p.custoPorCamaMes.toLocaleString()}</td>
                  <td className="border p-2 space-x-2">
                    <Link href={`/pacientes/${p.id}`} className="text-blue-600 hover:underline">
                      Ver
                    </Link>
                    <button
  className="text-green-600 hover:underline"
  onClick={() => {
    setSelected(p);
    setShowEdit(true);
  }}
>
  Editar
</button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={async () => {
                        if (confirm("Excluir paciente?")) {
                          await fetch(`/api/pacientes/${p.id}`, { method: "DELETE" });
                          setItems(curr => curr.filter(x => x.id !== p.id));
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
