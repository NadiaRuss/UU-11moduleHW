const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Зашел новый пользователь");

  ws.send(
    JSON.stringify({
      type: "system",
      content: "Добро пожаловать в чат!",
    })
  );

  ws.on("message", (message) => {
    let parseMessage;
    try {
      parseMessage = JSON.parse(message);
      console.log(`Получено сообщение: ${parseMessage}`);
    } catch (error) {
      console.log(`Произошла ошибка при обработке сообщения: ${error}`);
      return;
    }

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parseMessage));
      }
    });
  });

  ws.on("close", function close() {
    console.log("Пользователь отключился");
  });
});

console.log("Сервер запущен, порт: 8080");
