let popupClose = document.querySelector(".popup-close");
let popupOwerflow = document.querySelector(".popup-overflow");
let loginInput = document.getElementById("loginInput");
let loginBtn = document.getElementById("login-button");


popupClose.addEventListener("click", (e) => {
  e.preventDefault();
  popupOwerflow.style.display = "none";
});



loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (loginInput.value) {
    let userName = loginInput.value;
    localStorage.setItem("userName", userName);
    popupOwerflow.style.display = "none";
  }
});
