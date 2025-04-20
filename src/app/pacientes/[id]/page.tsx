"use client";
import { pacientes } from "../../../data/seed";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { useParams } from "next/navigation";

export default function PacienteDetalhe() {
  const { id } = useParams();
  const paciente = pacientes.find(p => p.id === id);
  if (!paciente) return <div>Paciente não encontrado</div>;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">{paciente.nomeFicticio}</h1>
          <ul className="list-disc ml-6">
            <li>Doença: {paciente.siglaDoenca}</li>
            <li>Idade: {paciente.idade}</li>
            <li>Sexo: {paciente.sexo}</li>
            <li>Comorbidades: {paciente.comorbidades.join(", ")}</li>
            <li>Custo/mês: R$ {paciente.custoPorCamaMes.toLocaleString()}</li>
          </ul>
        </main>
      </div>
    </div>
  );
}
