import { internacoes } from "../../data/seed";
import type { NextApiRequest, NextApiResponse } from "next";

let db = [...internacoes];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  if (method === "GET" && !query.id) {
    return res.status(200).json(db);
  }
  if (method === "GET" && query.id) {
    const item = db.find(i => i.internoId === query.id);
    return item ? res.status(200).json(item) : res.status(404).end();
  }
  if (method === "POST") {
    const novo = body;
    db.push(novo);
    return res.status(201).json(novo);
  }
  res.status(405).end();
}
