"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "../../components/Modal";
import FormRegistro from "../../components/FormRegistro";
import useRequireAuth from "../../hooks/useRequireAuth";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import type { RegistroMedico } from "../../models/models";

export default function RegistrosPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selected, setSelected] = useState<RegistroMedico | null>(null);
  const status = useRequireAuth();
  if (status === "loading") return <div>Validando sessão...</div>;
  const [items, setItems] = useState<RegistroMedico[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/registros?page=${page}&limit=5&search=${encodeURIComponent(search)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Falha ao carregar registros');
        return res.json();
      })
      .then(({ data, lastPage: lp }) => {
        setItems(data);
        setLastPage(lp);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [page, search]);

  const handleCreate = async (data: RegistroMedico) => {
    try {
      const res = await fetch('/api/registros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) throw new Error('Falha ao criar registro');
      
      const newItem = await res.json();
      setItems(prev => [...prev, newItem]);
      setShowCreate(false);
    } catch (error) {
      console.error(error);
      alert('Erro ao criar registro. Tente novamente.');
    }
  };

  const handleEdit = async (data: RegistroMedico) => {
    try {
      // Assumindo que temos um ID único para cada registro
      // Se você usa o índice como ID, ajuste conforme necessário
      const index = items.findIndex(r => r.internoId === data.internoId && r.dataHora === data.dataHora);
      
      if (index === -1) throw new Error('Registro não encontrado');
      
      const res = await fetch(`/api/registros/${index}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) throw new Error('Falha ao atualizar registro');
      
      const updatedItem = await res.json();
      setItems(prev => {
        const newItems = [...prev];
        newItems[index] = updatedItem;
        return newItems;
      });
      setShowEdit(false);
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar registro. Tente novamente.');
    }
  };

  if (loading) return (
    <div className="flex h-screen bg-gray-50 justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-700">Carregando registros...</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Registros Médicos</h1>
            <button
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center shadow-md"
              onClick={() => setShowCreate(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Novo Registro
            </button>
          </div>
          <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar por tipo ou autor..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full bg-white border border-gray-300 pl-10 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-sm overflow-hidden mt-4">
            <thead>
              <tr>
                <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data/Hora</th>
                <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Autor</th>
                <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conteúdo</th>
                <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="border-b border-gray-200 px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(r.dataHora).toLocaleString()}</td>
                  <td className="border-b border-gray-200 px-6 py-4 whitespace-nowrap text-sm text-gray-700">{r.tipoRegistro}</td>
                  <td className="border-b border-gray-200 px-6 py-4 whitespace-nowrap text-sm text-gray-700">{r.autor}</td>
                  <td className="border-b border-gray-200 px-6 py-4 whitespace-nowrap text-sm text-gray-700 truncate max-w-xs">{JSON.stringify(r.conteudo)}</td>
                  <td className="border-b border-gray-200 px-6 py-4 whitespace-nowrap text-sm space-x-3">
                    <Link href={`/registros/${idx}`} className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150 inline-flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      Ver
                    </Link>
                    <button
                      className="text-green-600 hover:text-green-800 font-medium transition-colors duration-150 inline-flex items-center"
                      onClick={() => {
                        setSelected(r);
                        setShowEdit(true);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Editar
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 font-medium transition-colors duration-150 inline-flex items-center"
                      onClick={async () => {
                        if (confirm("Tem certeza que deseja excluir este registro?")) {
                          try {
                            const res = await fetch(`/api/registros/${idx}`, { method: "DELETE" });
                            if (!res.ok) throw new Error("Erro ao excluir registro");
                            setItems(curr => curr.filter((_, i) => i !== idx));
                          } catch (error) {
                            console.error(error);
                            alert("Erro ao excluir registro. Tente novamente.");
                          }
                        }
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-8">
            <button
              className="px-5 py-2 bg-white border border-gray-300 rounded-lg shadow-sm disabled:opacity-50 hover:bg-gray-100 transition-colors duration-200 flex items-center"
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Anterior
            </button>
            <span className="text-gray-600 font-medium">Página {page} de {lastPage}</span>
            <button
              className="px-5 py-2 bg-white border border-gray-300 rounded-lg shadow-sm disabled:opacity-50 hover:bg-gray-100 transition-colors duration-200 flex items-center"
              onClick={() => setPage(p => Math.min(p + 1, lastPage))}
              disabled={page === lastPage}
            >
              Próximo
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </main>
      </div>
    </div>
  );

  return (
    <>
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)}>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Novo Registro</h2>
        <FormRegistro onSubmit={handleCreate} />
      </Modal>
      
      <Modal isOpen={showEdit} onClose={() => setShowEdit(false)}>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Editar Registro</h2>
        {selected && <FormRegistro initialData={selected} onSubmit={handleEdit} />}
      </Modal>
    </>
  );
}
