"use client";
"use client";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import type { RegistroMedico } from "../../models/models";

export default function RegistrosPage() {
  const [registros, setRegistros] = useState<RegistroMedico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/registros")
      .then((res) => res.json())
      .then((data) => {
        setRegistros(data);
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
          <h1 className="text-xl font-bold mb-4">Registros Médicos</h1>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Paciente</th>
                <th className="border p-2">Data/Hora</th>
                <th className="border p-2">Tipo</th>
                <th className="border p-2">Autor</th>
                <th className="border p-2">Conteúdo</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((r, idx) => (
                <Link key={idx} href={`/registros/${idx}`} legacyBehavior>
                  <tr className="hover:bg-gray-100 cursor-pointer">
                    <td className="border p-2">{r.internoId}</td>
                    <td className="border p-2">{r.dataHora}</td>
                    <td className="border p-2">{r.tipoRegistro}</td>
                    <td className="border p-2">{r.autor}</td>
                    <td className="border p-2 text-xs whitespace-pre-wrap">{JSON.stringify(r.conteudo)}</td>
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
