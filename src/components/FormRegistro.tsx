"use client";
import React, { useState } from "react";
import type { RegistroMedico } from "../models/models";

interface Props {
  initialData?: RegistroMedico;
  onSubmit: (data: RegistroMedico) => void;
}

export default function FormRegistro({ initialData, onSubmit }: Props) {
  const [form, setForm] = useState<RegistroMedico>(
    initialData || {
      internoId: "",
      tipoRegistro: "",
      autor: "",
      dataHora: new Date().toISOString(),
      descricao: "",
    }
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="internoId"
        placeholder="ID do Interno"
        value={form.internoId}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
        disabled={!!initialData}
      />
      <input
        name="tipoRegistro"
        placeholder="Tipo de Registro"
        value={form.tipoRegistro}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
      />
      <input
        name="autor"
        placeholder="Autor"
        value={form.autor}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
      />
      <input
        name="dataHora"
        type="datetime-local"
        value={form.dataHora.slice(0, 16)}
        onChange={(e) =>
          setForm((f) => ({ ...f, dataHora: new Date(e.target.value).toISOString() }))
        }
        className="border p-2 rounded w-full"
        required
      />
      <textarea
        name="descricao"
        placeholder="Descrição"
        value={form.descricao}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Salvar
      </button>
    </form>
  );
}
