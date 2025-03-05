import { auth } from "./firebaseConfig.mjs";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered:", userCredential.user);
    alert("Registration successful!");
  } catch (error) {
    console.error("Registration error:", error.message);
    alert(error.message);
  }
}
