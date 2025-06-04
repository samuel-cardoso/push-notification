self.addEventListener("push", function (event) {
  const data = event.data?.json() || {
    title: "Notificação",
    body: "Você recebeu uma nova notificação!",
  };

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "/icon.png",
  });
});
