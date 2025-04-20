"use client";
"use client";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import type { Internacao } from "../../models/models";

export default function InternacoesPage() {
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
                <Link key={i.internoId} href={`/internacoes/${i.internoId}`} legacyBehavior>
                  <tr className="hover:bg-gray-100 cursor-pointer">
                    <td className="border p-2">{i.internoId}</td>
                    <td className="border p-2">{i.setor}</td>
                    <td className="border p-2">{i.cama}</td>
                    <td className="border p-2">{i.dataAdmissao}</td>
                    <td className="border p-2">{i.dataPrevisaoAlta}</td>
                  </tr>
                </Link>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
