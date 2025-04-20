"use client";
"use client";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import type { PacienteVirtual } from "../../models/models";

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState<PacienteVirtual[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pacientes")
      .then((res) => res.json())
      .then((data) => {
        setPacientes(data);
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
          <h1 className="text-xl font-bold mb-4">Pacientes</h1>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Nome</th>
                <th className="border p-2">Doença</th>
                <th className="border p-2">Custo/mês</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map(p => (
                <Link key={p.id} href={`/pacientes/${p.id}`} legacyBehavior>
                  <tr className="hover:bg-gray-100 cursor-pointer">
                    <td className="border p-2">{p.id}</td>
                    <td className="border p-2">{p.nomeFicticio}</td>
                    <td className="border p-2">{p.siglaDoenca}</td>
                    <td className="border p-2">R$ {p.custoPorCamaMes.toLocaleString()}</td>
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
