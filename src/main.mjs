import { registerUser } from "./js/register.mjs";
import { loginUser } from "./js/login.mjs";
import { logoutUser } from "./js/logout.mjs";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./js/firebaseConfig.mjs";

// DOM Elements
const registerEmail = document.getElementById("register-email");
const registerPassword = document.getElementById("register-password");
const registerButton = document.getElementById("register-button");

const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginButton = document.getElementById("login-button");

const logoutButton = document.getElementById("logout-button");
const homepage = document.getElementById("homepage");

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user);
    homepage.classList.remove("hidden");
  } else {
    homepage.classList.add("hidden");
    console.log("No user is logged in.");
  }
});

// Register Event (only if elements exist)
if (registerButton && registerEmail && registerPassword) {
  registerButton.addEventListener("click", () => {
    registerUser(registerEmail.value, registerPassword.value);
  });
}

// Login Event (only if elements exist)
if (loginButton && loginEmail && loginPassword) {
  loginButton.addEventListener("click", async () => {
    const user = await loginUser(loginEmail.value, loginPassword.value);
    if (user) {
      window.location.href = "/";
    }
  });
}

// Logout Event (only if elements exist)
if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    await logoutUser();
    if (homepage) {
      homepage.style.display = "none";
    }
  });
}

const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
if (signUpButton && container) {
  signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });
}

if (signInButton && container) {
  signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });
}
