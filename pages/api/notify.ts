import type { NextApiRequest, NextApiResponse } from "next";
import webpush from "web-push";
import { subscriptions } from "@/lib/subscribe";

const vapidKeys = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  privateKey: process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY!,
};

webpush.setVapidDetails(
  "mailto:exemplo@email.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const payload = JSON.stringify({
    title: "🚀 Notificação enviada!",
    body: "DALEEEE!",
  });

  try {
    await Promise.all(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      subscriptions.map((sub: any) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        webpush.sendNotification(sub, payload).catch((err: any) => {
          console.error(
            "Erro ao enviar notificação para uma subscription:",
            err
          );
        })
      )
    );

    res.status(200).json({ message: "Notificações enviadas!" });
  } catch (err) {
    console.error("Erro geral:", err);
    res.status(500).json({ error: "Erro ao enviar notificações" });
  }
}
