import type { NextApiRequest, NextApiResponse } from "next";
import { subscriptions } from "@/lib/subscribe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // método não permitido
  }

  try {
    const subscription: PushSubscription = JSON.parse(req.body);

    // Evitar duplicatas (simples verificação por endpoint)
    if (!subscriptions.find((sub) => sub.endpoint === subscription.endpoint)) {
      subscriptions.push(subscription);

      console.log("Nova inscrição adicionada:", subscription.endpoint);
    }

    return res.status(201).json({ message: "Inscrição salva com sucesso!" });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return res.status(400).json({ error: "Assinatura inválida" });
  }
}
