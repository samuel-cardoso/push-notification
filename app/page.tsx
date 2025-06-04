"use client";

export default function Home() {
  // Essa função lida com a ativação do Service Worker e o envio da notificação.
  const handleAllInOne = async () => {
    if (Notification.permission === "denied") {
      alert(
        "Você bloqueou as notificações. Ative manualmente nas configurações do navegador."
      );
      return;
    }

    const registration = await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    });

    await fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
    });

    const res = await fetch("/api/notify");
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <button
        onClick={handleAllInOne}
        className="bg-purple-600 text-white font-semibold px-4 py-2 rounded hover:bg-purple-700 transition"
      >
        Ativar e Enviar Notificação
      </button>
    </div>
  );
}
