"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

interface Registro {
  internoId: string;
  dataHora: string;
  tipoRegistro: string;
  conteudo: any;
  autor: string;
}

export default function PacienteDetalhe() {
  const { id } = useParams();
  const [paciente, setPaciente] = useState<any>(null);
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    Promise.all([
      fetch(`/api/pacientes?id=${id}`).then((r) => r.json()),
      fetch("/api/registros").then((r) => r.json()),
    ]).then(([p, allRegs]) => {
      setPaciente(p);
      setRegistros(allRegs.filter((r: Registro) => r.internoId === id));
      setLoading(false);
    });
  }, [id]);

  async function submit() {
    const novo: Registro = {
      internoId: id! as string,
      dataHora: new Date().toISOString(),
      tipoRegistro: "evolucao",
      conteudo: { texto },
      autor: "Usuário",
    };
    await fetch("/api/registros", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novo),
    });
    setRegistros((prev) => [...prev, novo]);
    setTexto("");
  }

  if (loading) return <div>Carregando detalhes...</div>;
  if (!paciente) return <div>Paciente não encontrado</div>;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">{paciente.nomeFicticio}</h1>
          <ul className="list-disc ml-6 mb-6">
            <li>Doença: {paciente.siglaDoenca}</li>
            <li>Idade: {paciente.idade}</li>
            <li>Sexo: {paciente.sexo}</li>
            <li>Comorbidades: {paciente.comorbidades.join(", ")}</li>
            <li>Custo/mês: R$ {paciente.custoPorCamaMes.toLocaleString()}</li>
          </ul>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Nova Evolução</h2>
            <textarea
              className="w-full border p-2 rounded mb-2"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={submit}
            >
              Salvar evolução
            </button>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Registros</h2>
            {registros.map((r, i) => (
              <div key={i} className="border-b py-2">
                <div className="text-sm text-gray-500">{r.dataHora}</div>
                <div>{JSON.stringify(r.conteudo)}</div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
