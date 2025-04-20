import { pacientes } from "../../data/seed";
import type { NextApiRequest, NextApiResponse } from "next";

let db = [...pacientes];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  const id = typeof query.id === "string" ? query.id : "";
  if (method === "GET" && !id) {
    return res.status(200).json(db);
  }
  if (method === "GET" && id) {
    const item = db.find(p => p.id === id);
    return item ? res.status(200).json(item) : res.status(404).end();
  }
  if (method === "POST") {
    const novo = body;
    db.push(novo);
    return res.status(201).json(novo);
  }
  if (method === "PUT" && id) {
    const index = db.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).end();
    db[index] = { ...db[index], ...body };
    return res.status(200).json(db[index]);
  }
  if (method === "DELETE" && id) {
    db = db.filter(p => p.id !== id);
    return res.status(204).end();
  }
  res.status(405).end();
}
