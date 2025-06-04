import { subscriptions } from "@/lib/subscribe";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { endpoint, removeAll } = JSON.parse(req.body);

    // 👉 Limpar tudo (modo dev)
    if (removeAll === true) {
      subscriptions.length = 0;
      return res.status(200).json({ message: "Todas as inscrições removidas" });
    }

    // 👉 Remover apenas a subscription do endpoint informado
    const index = subscriptions.findIndex((sub) => sub.endpoint === endpoint);

    if (index !== -1) {
      subscriptions.splice(index, 1);
      return res
        .status(200)
        .json({ message: "Subscription removida com sucesso" });
    }

    return res.status(404).json({ error: "Subscription não encontrada" });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.status(400).json({ error: "Erro ao remover subscription" });
  }
}
