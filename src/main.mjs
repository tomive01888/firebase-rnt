import { logoutUser } from "./js/firebaseAuthHandler.mjs";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./js/firebaseInit.mjs";

const logoutButton = document.getElementById("logout-button");
const homepage = document.getElementById("homepage");

// Logout Event (only if elements exist)
if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    await logoutUser();
    if (homepage) {
      homepage.style.display = "none";
    }
  });
}

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
