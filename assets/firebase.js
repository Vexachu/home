// assets/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth, onAuthStateChanged, signInWithPopup,
  GoogleAuthProvider, signOut
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  getFirestore, doc, setDoc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// 🔒 Paste your config here (apiKey, authDomain, etc.) with normal quotes:
const firebaseConfig = {
  apiKey: "AIzaSyBG0O5Shzzq7CbLRwy2wwtgh9tw8MW-ZTs",
  authDomain: "coding-website-680b3.firebaseapp.com",
  projectId: "coding-website-680b3",
  storageBucket: "coding-website-680b3.firebasestorage.app",
  messagingSenderId: "511596267555",
  appId: "1:511596267555:web:f39160d2455a2379658996",
  measurementId: "G-YBBJ31HQSR"
};

export const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);

// Helpers you'll likely use right away:
const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  const res = await signInWithPopup(auth, provider);
  // Create/update a basic user profile doc on first sign-in:
  await setDoc(doc(db, "users", res.user.uid), {
    uid: res.user.uid,
    displayName: res.user.displayName || "",
    email: res.user.email || "",
    photoURL: res.user.photoURL || "",
    lastLogin: Date.now()
  }, { merge: true });
  return res.user;
}

export async function signOutUser() {
  await signOut(auth);
}

export function watchAuth(callback) {
  // callback(user|null)
  return onAuthStateChanged(auth, callback);
}
