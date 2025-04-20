"use client";
import React, { useState, useEffect } from "react";
// import useRequireAuth from "../../../hooks/useRequireAuth";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { pacientes } from "../../data/seed";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

// Dados para o gráfico de pizza por grupo
const pieData = [
  { name: "Crônicos", value: pacientes.filter(p => p.grupo==="cronico").reduce((sum,p)=>sum+p.custoPorCamaMes,0) },
  { name: "Agudos",   value: pacientes.filter(p => p.grupo==="agudo").reduce((sum,p)=>sum+p.custoPorCamaMes,0) },
  { name: "Emergência", value: pacientes.filter(p => p.grupo==="emergencia").reduce((sum,p)=>sum+p.custoPorCamaMes,0) },
];

// Dados para o gráfico de barras por doença
const getDoencasData = () => {
  const doencasMap = new Map();
  
  pacientes.forEach(p => {
    if (doencasMap.has(p.siglaDoenca)) {
      doencasMap.set(p.siglaDoenca, doencasMap.get(p.siglaDoenca) + p.custoPorCamaMes);
    } else {
      doencasMap.set(p.siglaDoenca, p.custoPorCamaMes);
    }
  });
  
  return Array.from(doencasMap).map(([name, value]) => ({ name, value }));
};

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function FinanceiroPage() {
  // const status = useRequireAuth();
  const [activeTab, setActiveTab] = useState('visaoGeral');
  const [doencasData, setDoencasData] = useState<Array<{name: string, value: number}>>([]);
  
  useEffect(() => {
    setDoencasData(getDoencasData());
  }, []);
  
  // Loading state simples
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) return (
    <div className="flex h-screen bg-gray-50 justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-700">Carregando dados financeiros...</p>
      </div>
    </div>
  );
  
  const total = pieData.reduce((sum,d)=>sum+d.value,0);
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Financeiro</h1>
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveTab('visaoGeral')} 
                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'visaoGeral' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                Visão Geral
              </button>
              <button 
                onClick={() => setActiveTab('porDoenca')} 
                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'porDoenca' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                Por Doença
              </button>
              <button 
                onClick={() => setActiveTab('detalhes')} 
                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'detalhes' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                Detalhes
              </button>
            </div>
          </div>
          {activeTab === 'visaoGeral' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white shadow-md rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-medium text-gray-500 uppercase">Custo Total Mensal</h2>
                      <p className="text-3xl font-bold mt-2 text-gray-800">R$ {total.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-white shadow-md rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-medium text-gray-500 uppercase">Pacientes Ativos</h2>
                      <p className="text-3xl font-bold mt-2 text-gray-800">{pacientes.length}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-white shadow-md rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-medium text-gray-500 uppercase">Custo Médio por Paciente</h2>
                      <p className="text-3xl font-bold mt-2 text-gray-800">R$ {Math.round(total / pacientes.length).toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-md rounded-xl p-6">
                <h2 className="text-lg font-medium mb-4 text-gray-800">Distribuição por Grupo</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={pieData} 
                          dataKey="value" 
                          nameKey="name" 
                          cx="50%" 
                          cy="50%" 
                          outerRadius={80} 
                          fill="#8884d8"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieData.map((entry, idx) => (
                            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(val:number) => `R$ ${val.toLocaleString()}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="flex flex-col justify-center space-y-4">
                    {pieData.map((entry, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="font-medium">{entry.name}</span>
                            <span>R$ {entry.value.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                            <div className="h-2.5 rounded-full" style={{ width: `${(entry.value / total * 100)}%`, backgroundColor: COLORS[idx % COLORS.length] }}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'porDoenca' && (
            <div className="bg-white shadow-md rounded-xl p-6">
              <h2 className="text-lg font-medium mb-6 text-gray-800">Custos por Doença</h2>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={doencasData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(val:number) => `R$ ${val.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="value" name="Custo Mensal" fill="#4F46E5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
          {activeTab === 'detalhes' && (
            <div className="bg-white shadow-md rounded-xl overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Detalhes por Paciente</h2>
                <div className="relative overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doença</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grupo</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Custo/mês</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pacientes.map(p => (
                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.nomeFicticio}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.siglaDoenca}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${p.grupo === 'cronico' ? 'bg-blue-100 text-blue-800' : p.grupo === 'agudo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {p.grupo.charAt(0).toUpperCase() + p.grupo.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">R$ {p.custoPorCamaMes.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
