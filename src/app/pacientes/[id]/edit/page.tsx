"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import type { PacienteVirtual } from "../../../models/models";

export default function EditPaciente() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState<Partial<PacienteVirtual>>({});
  useEffect(() => {
    fetch(`/api/pacientes?id=${id}`)
      .then(r => r.json())
      .then(setForm);
  }, [id]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`/api/pacientes?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/pacientes");
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Editar {form.nomeFicticio}</h1>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label>ID</label>
              <input
                value={form.id || ""}
                readOnly
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label>Nome</label>
              <input
                value={form.nomeFicticio || ""}
                onChange={e => setForm(f => ({ ...f, nomeFicticio: e.target.value }))}
                className="border p-2 w-full"
              />
            </div>
            {/* Adicione os outros campos do modelo conforme necessário */}
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
              Salvar
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
