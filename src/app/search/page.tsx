"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import type { PacienteVirtual, Internacao, RegistroMedico } from "../../models/models";

export default function SearchPage() {
  const params = useSearchParams();
  const q = params.get("query") || "";
  const [loading, setLoading] = useState(true);
  const [pacientes, setPacientes] = useState<PacienteVirtual[]>([]);
  const [internacoes, setInternacoes] = useState<Internacao[]>([]);
  const [registros, setRegistros] = useState<RegistroMedico[]>([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`/api/pacientes?search=${encodeURIComponent(q)}`).then(r => r.json()),
      fetch(`/api/internacoes?search=${encodeURIComponent(q)}`).then(r => r.json()),
      fetch(`/api/registros?search=${encodeURIComponent(q)}`).then(r => r.json()),
    ]).then(([pRes, iRes, rRes]) => {
      setPacientes(pRes.data);
      setInternacoes(iRes.data);
      setRegistros(rRes.data);
      setLoading(false);
    });
  }, [q]);

  if (loading) return <div className="p-4">Buscando por "{q}"...</div>;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Resultados da busca: "{q}"</h1>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Pacientes</h2>
            {pacientes.length === 0 ? (
              <p>Nenhum paciente encontrado.</p>
            ) : (
              <ul className="list-disc list-inside">
                {pacientes.map(p => (
                  <li key={p.id}>
                    <Link href={`/pacientes/${p.id}`} className="text-blue-600 hover:underline">
                      [{p.id}] {p.nomeFicticio}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Internações</h2>
            {internacoes.length === 0 ? (
              <p>Nenhuma internação encontrada.</p>
            ) : (
              <ul className="list-disc list-inside">
                {internacoes.map(i => (
                  <li key={`${i.internoId}-${i.cama}`}>
                    <Link href={`/internacoes/${i.internoId}`} className="text-blue-600 hover:underline">
                      [{i.internoId}] {i.setor} – {i.cama}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Registros</h2>
            {registros.length === 0 ? (
              <p>Nenhum registro encontrado.</p>
            ) : (
              <ul className="list-disc list-inside">
                {registros.map((r, idx) => (
                  <li key={idx}>
                    <Link href={`/registros/${idx}`} className="text-blue-600 hover:underline">
                      [{new Date(r.dataHora).toLocaleString()}] {r.tipoRegistro}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
