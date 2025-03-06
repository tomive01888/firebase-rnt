import { registerUser, loginUser, logoutUser } from "./js/firebaseAuthHandler.mjs";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./js/firebaseInit.mjs";

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
    if (homepage) {
      homepage.classList.remove("hidden");
      logoutButton.classList.remove("hidden");
      console.log("User is logged in:", user);
    }
  } else {
    if (homepage) {
      homepage.classList.add("hidden");
      logoutButton.classList.add("hidden");
      console.log("No user is logged in.");
    }
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

export function copyToClipboard(event) {
  const container = event.target.closest(".relative");
  const codeBlock = container.querySelector("pre code");
  const textToCopy = codeBlock.textContent;

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      alert("Copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}

// Add event listeners to all copy buttons
document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", copyToClipboard);
});

document.getElementById("toggleButton").addEventListener("click", () => {
  const codeBlock = document.getElementById("codeBlock");
  if (codeBlock.classList.contains("h-0")) {
    codeBlock.classList.remove("h-0");
    codeBlock.classList.add("h-fit");
  } else {
    codeBlock.classList.remove("h-fit");
    codeBlock.classList.add("h-0");
  }
});
