"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("✅ Service Worker registrado"));
    }
  }, []);

  const subscribeUser = async () => {
    console.log("🔔 Tentando ativar notificações...");
    const registration = await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    });

    await fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
    });

    alert("✅ Notificações ativadas!");
  };

  const sendNotification = async () => {
    const res = await fetch("/api/notify");
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <button
        onClick={subscribeUser}
        className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Ativar Notificações
      </button>

      <button
        onClick={sendNotification}
        className="mt-4 bg-green-600 text-white font-semibold px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Enviar Notificação
      </button>
    </div>
  );
}
