"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import type { RegistroMedico } from "../../../models/models";

export default function EditRegistro() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState<Partial<RegistroMedico>>({});
  useEffect(() => {
    fetch(`/api/registros?id=${id}`)
      .then(r => r.json())
      .then(setForm);
  }, [id]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`/api/registros?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/registros");
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Editar Registro {form.internoId}</h1>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label>ID</label>
              <input
                value={form.internoId || ""}
                readOnly
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label>Tipo</label>
              <input
                value={form.tipoRegistro || ""}
                onChange={e => setForm(f => ({ ...f, tipoRegistro: e.target.value }))}
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
