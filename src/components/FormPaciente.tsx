"use client";
import React, { useState } from "react";
import type { PacienteVirtual } from "../models/models";

interface Props {
  initialData?: PacienteVirtual;
  onSubmit: (data: PacienteVirtual) => void;
}

export default function FormPaciente({ initialData, onSubmit }: Props) {
  const [form, setForm] = useState<PacienteVirtual>(
    initialData || {
      id: "",
      nomeFicticio: "",
      siglaDoenca: "",
      custoPorCamaMes: 0,
    }
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "custoPorCamaMes" ? Number(value) : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="id"
        placeholder="ID"
        value={form.id}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
        disabled={!!initialData}
      />
      <input
        name="nomeFicticio"
        placeholder="Nome"
        value={form.nomeFicticio}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
      />
      <input
        name="siglaDoenca"
        placeholder="Sigla da Doença"
        value={form.siglaDoenca}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
      />
      <input
        name="custoPorCamaMes"
        placeholder="Custo por cama/mês"
        type="number"
        value={form.custoPorCamaMes}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
        min={0}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Salvar
      </button>
    </form>
  );
}
