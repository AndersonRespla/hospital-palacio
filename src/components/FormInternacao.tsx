"use client";
import React, { useState } from "react";
import type { Internacao } from "../models/models";

interface Props {
  initialData?: Internacao;
  onSubmit: (data: Internacao) => void;
}

export default function FormInternacao({ initialData, onSubmit }: Props) {
  const [form, setForm] = useState<Internacao>(
    initialData || {
      internoId: "",
      setor: "",
      cama: "",
      dataEntrada: "",
      dataSaida: "",
    }
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
        name="setor"
        placeholder="Setor"
        value={form.setor}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
      />
      <input
        name="cama"
        placeholder="Cama"
        value={form.cama}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
      />
      <input
        name="dataEntrada"
        placeholder="Data de Entrada"
        type="date"
        value={form.dataEntrada}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
      />
      <input
        name="dataSaida"
        placeholder="Data de Saída"
        type="date"
        value={form.dataSaida}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Salvar
      </button>
    </form>
  );
}
