"use client";
import React from "react";
import { pacientes } from "../data/seed";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const totalPacientes = pacientes.length;
const custoTotal = pacientes.reduce((acc, p) => acc + p.custoPorCamaMes, 0);

// Dados para o gráfico: cada paciente e seu custo
const chartData = pacientes.map((p) => ({
  nome: p.nomeFicticio,
  custo: p.custoPorCamaMes,
}));

const Dashboard: React.FC = () => (
  <div className="grid gap-4 p-4 grid-cols-1 md:grid-cols-2">
    <div className="bg-white shadow rounded p-6 flex flex-col gap-2">
      <h1 className="text-2xl font-bold mb-2">Visão Geral</h1>
      <div className="flex flex-col gap-1">
        <span>Total de pacientes: <strong>{totalPacientes}</strong></span>
        <span>Soma de custo mensal: <strong>R$ {custoTotal.toLocaleString("pt-BR")}</strong></span>
      </div>
    </div>
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-lg font-semibold mb-2">Ocupação por Paciente</h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" tick={{ fontSize: 12 }} interval={0} angle={-10} dy={10} />
          <YAxis />
          <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString("pt-BR")}`} />
          <Bar dataKey="custo" fill="#2563eb" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default Dashboard;
