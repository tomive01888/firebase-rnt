import { loginUser, registerUser } from "./js/firebaseAuthHandler.mjs";

const registerEmail = document.getElementById("register-email");
const registerPassword = document.getElementById("register-password");
const registerButton = document.getElementById("register-button");

const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginButton = document.getElementById("login-button");

// Register Event (only if elements exist)
if (registerButton && registerEmail && registerPassword) {
  registerButton.addEventListener("click", () => {
    registerUser(registerEmail.value, registerPassword.value);
  });
}

// Login Event (only if elements exist)
if (loginEmail && loginPassword) {
  loginButton.addEventListener("click", async () => {
    const user = await loginUser(loginEmail.value, loginPassword.value);
    if (user) {
      window.location.href = "/";
    }
  });
}
