import { internacoes } from "../../data/seed";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

let db = [...internacoes];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Não autenticado" });
  }

  const { method, query, body } = req;
  const id = typeof query.id === "string" ? query.id : "";
  if (method === "GET" && !id) {
    const { page = "1", limit = "10", search = "" } = req.query;
    const pg = parseInt(page as string, 10);
    const lim = parseInt(limit as string, 10);
    let items = db.filter(item => {
      const term = (item.setor || item.internoId).toLowerCase();
      return term.includes((search as string).toLowerCase());
    });
    const total = items.length;
    const lastPage = Math.ceil(total / lim);
    const start = (pg - 1) * lim;
    items = items.slice(start, start + lim);
    return res.status(200).json({ data: items, total, page: pg, lastPage });
  }
  if (method === "GET" && id) {
    const item = db.find(i => i.internoId === id);
    return item ? res.status(200).json(item) : res.status(404).end();
  }
  if (method === "POST") {
    const novo = body;
    db.push(novo);
    return res.status(201).json(novo);
  }
  if (method === "PUT" && id) {
    const index = db.findIndex(i => i.internoId === id);
    if (index === -1) return res.status(404).end();
    db[index] = { ...db[index], ...body };
    return res.status(200).json(db[index]);
  }
  if (method === "DELETE" && id) {
    db = db.filter(i => i.internoId !== id);
    return res.status(204).end();
  }
  res.status(405).end();
}
