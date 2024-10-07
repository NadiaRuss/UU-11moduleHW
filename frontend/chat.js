const chat = document.getElementById("chat");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const socket = new WebSocket("ws://localhost:8080");

socket.onopen = (e) => {
  console.log("Соединение прошло успешно!");
};
let userName = localStorage.getItem("userName");

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  const messageElm = document.createElement("div");
  if (message.type === "system") {
    messageElm.classList.add("system-message");
  }

  if (userName) {
    popupOwerflow.style.display = "none";
    messageElm.textContent = `${userName} : ${message.content}`;
  } else {
    messageElm.textContent = `Незнакомец : ${message.content}`;
  }
  chat.appendChild(messageElm);
  chat.scrollTop = chat.scrollHeight;
};

socket.onclose = (event) => {
  if (event.wasClean) {
    console.log(
      `Соединение закрыто чисто, код=${event.code} причина:${event.reason} `
    );
  } else {
    console.log("Соединение прервано");
  }
};
socket.onerror = (error) => {
  console.log(`Ошибка ${error.message}`);
};

messageForm.onsubmit = (e) => {
  e.preventDefault();
  if (messageInput.value) {
    const message = {
      type: "user",
      content: messageInput.value,
    };
    socket.send(JSON.stringify(message));
    messageInput.value = "";
  }
};
