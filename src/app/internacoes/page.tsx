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
  const [internacoes, setInternacoes] = useState<Internacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/internacoes")
      .then((res) => res.json())
      .then((data) => {
        setInternacoes(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 overflow-auto">
          <h1 className="text-xl font-bold mb-4">Internações</h1>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Paciente</th>
                <th className="border p-2">Setor</th>
                <th className="border p-2">Cama</th>
                <th className="border p-2">Admissão</th>
                <th className="border p-2">Previsão Alta</th>
              </tr>
            </thead>
            <tbody>
              {internacoes.map(i => (
                <tr key={i.internoId} className="hover:bg-gray-100 cursor-pointer">
                  <td className="border p-2">
                    <Link href={`/internacoes/${i.internoId}`}>{i.internoId}</Link>
                  </td>
                  <td className="border p-2">{i.setor}</td>
                  <td className="border p-2">{i.cama}</td>
                  <td className="border p-2">{i.dataAdmissao}</td>
                  <td className="border p-2">{i.dataPrevisaoAlta}</td>
                  <td className="border p-2 space-x-2">
                    <Link href={`/internacoes/${i.internoId}/edit`} className="text-blue-600 hover:underline">
                      Editar
                    </Link>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={async () => {
                        if (confirm("Excluir internação?")) {
                          await fetch(`/api/internacoes?id=${i.internoId}`, { method: "DELETE" });
                          setInternacoes(curr => curr.filter(x => x.internoId !== i.internoId));
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
        </main>
      </div>
    </div>
  );
}
