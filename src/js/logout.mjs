import { auth } from "./firebaseConfig.mjs";
import { signOut } from "firebase/auth";

export async function logoutUser() {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Logout error:", error.message);
  }
}
