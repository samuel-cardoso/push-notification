"use client";

import { useState, useEffect } from "react";

// Converte a chave pública VAPID (base64) para Uint8Array
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function Home() {
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!("serviceWorker" in navigator)) return;

      const registration = await navigator.serviceWorker.ready;
      const existingSubscription =
        await registration.pushManager.getSubscription();

      if (existingSubscription) {
        setSubscribed(true);
        console.log("📌 Subscription já existente encontrada.");
      } else {
        setSubscribed(false);
      }
    };

    checkSubscription();
  }, []);

  const handleSubscribe = async () => {
    const registration = await navigator.serviceWorker.ready;

    // Não precisa mais por causa da lógica de disable nos botões.
    // const existingSubscription =
    //   await registration.pushManager.getSubscription();

    // if (existingSubscription) {
    //   await existingSubscription.unsubscribe();
    //   console.log("Subscription antiga removida");
    // }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });

    await fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
    });

    setSubscribed(true);
  };

  const handleUnsubscribe = async () => {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      const success = await subscription.unsubscribe();
      if (success) {
        setSubscribed(false);
      }
    }
  };

  const handleSendNotification = async () => {
    const res = await fetch("/api/notify");
    await res.json();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <button
        onClick={handleSubscribe}
        disabled={subscribed}
        className={`cursor-pointer text-white font-semibold px-4 py-2 rounded  transition ${
          subscribed
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Ativar Notificações
      </button>

      <button
        onClick={handleSendNotification}
        disabled={!subscribed}
        className={`cursor-pointer px-4 py-2 rounded font-semibold transition ${
          subscribed
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-gray-400 text-white cursor-not-allowed"
        }`}
      >
        Enviar Notificação
      </button>
      <button
        onClick={handleUnsubscribe}
        className="bg-red-600 text-white font-semibold px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Cancelar Notificações
      </button>
    </div>
  );
}
