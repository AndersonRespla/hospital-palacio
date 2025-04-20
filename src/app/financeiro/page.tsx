"use client";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { pacientes } from "../../data/seed";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Crônicos", value: pacientes.filter(p => p.grupo==="cronico").reduce((sum,p)=>sum+p.custoPorCamaMes,0) },
  { name: "Agudos",   value: pacientes.filter(p => p.grupo==="agudo").reduce((sum,p)=>sum+p.custoPorCamaMes,0) },
  { name: "Emergência", value: pacientes.filter(p => p.grupo==="emergencia").reduce((sum,p)=>sum+p.custoPorCamaMes,0) },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export default function FinanceiroPage() {
  const total = data.reduce((sum,d)=>sum+d.value,0);
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 overflow-auto bg-gray-50">
          <h1 className="text-2xl font-bold mb-6">Financeiro</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-white shadow rounded">
              <h2 className="text-lg mb-2">Custo Total Mensal</h2>
              <p className="text-3xl font-bold">R$ {total.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <h2 className="text-lg mb-2">Distribuição por Grupo</h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} label>
                    {data.map((entry, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val:number) => `R$ ${val.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-lg mb-2">Detalhes por Paciente</h2>
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Nome</th>
                  <th className="border p-2">Grupo</th>
                  <th className="border p-2">Custo/mês</th>
                </tr>
              </thead>
              <tbody>
                {pacientes.map(p => (
                  <tr key={p.id}>
                    <td className="border p-2">{p.id}</td>
                    <td className="border p-2">{p.nomeFicticio}</td>
                    <td className="border p-2">{p.grupo}</td>
                    <td className="border p-2">R$ {p.custoPorCamaMes.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
