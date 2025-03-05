import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Define providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Function to sign in with a selected provider
const signInWithProvider = (provider) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
      window.location.href = "/";
    })
    .catch((error) => {
      console.error(error.code, error.message);
    });
};

// Event listeners for different auth buttons
const addAuthListener = (id, provider) => {
  const button = document.getElementById(id);
  if (button) {
    button.addEventListener("click", () => signInWithProvider(provider));
  }
};

// Add event listeners only if the elements exist
addAuthListener("google-auth", googleProvider);
addAuthListener("github-auth", githubProvider);
addAuthListener("facebook-auth", facebookProvider);

export { auth };
