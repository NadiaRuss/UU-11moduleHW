const chat = document.getElementById("chat");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const socket = new WebSocket("ws://localhost:8080");

let popupClose = document.querySelector(".popup-close");
let popupOwerflow = document.querySelector(".popup-overflow");
let loginInput = document.getElementById("loginInput");
let loginForm = document.getElementById("loginForm");

socket.onopen = (e) => {
  console.log("Соединение прошло успешно!");
};
//Проверяем есть ли в хранилище userName и если есть сразу закрываем попап
let userName = localStorage.getItem("userName");
if (userName) {
  popupOwerflow.style.display = "none";
}
//При закрытии на крестик UserName не вводится, будет "Незнакомец"
popupClose.addEventListener("click", (e) => {
    e.preventDefault();
    popupOwerflow.style.display = "none";
  });
  // При вводе имени пользователя userName сохраняется в localStorage
  loginForm.onsubmit = (e) => {
    // e.preventDefault(); нужна перезагрузка страницы
    if (loginInput.value) {
      let userName = loginInput.value;
      localStorage.setItem("userName", userName);
      popupOwerflow.style.display = "none";
    }
  };

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  const messageElm = document.createElement("div");
  if (message.type === "system") {
    messageElm.classList.add("system-message");
  }
  if (userName) {
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
