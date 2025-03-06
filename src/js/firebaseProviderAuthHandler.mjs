import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebaseInit.mjs";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const signInWithProvider = (provider) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user);
      window.location.href = "/";
    })
    .catch((error) => {
      console.error(error.code, error.message);
    });
};

const addAuthListener = (id, provider) => {
  const button = document.getElementById(id);
  if (button) {
    button.addEventListener("click", () => signInWithProvider(provider));
  }
};

addAuthListener("google-auth", googleProvider);
addAuthListener("github-auth", githubProvider);
addAuthListener("facebook-auth", facebookProvider);

export { auth, signInWithProvider };
