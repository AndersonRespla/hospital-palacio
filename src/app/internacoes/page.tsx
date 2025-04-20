"use client";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { internacoes } from "../../data/seed";

export default function InternacoesPage() {
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
                <tr key={i.internoId}>
                  <td className="border p-2">{i.internoId}</td>
                  <td className="border p-2">{i.setor}</td>
                  <td className="border p-2">{i.cama}</td>
                  <td className="border p-2">{i.dataAdmissao}</td>
                  <td className="border p-2">{i.dataPrevisaoAlta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
