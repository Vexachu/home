import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginLink = document.getElementById('loginLink');
const logoutBtn = document.getElementById('logoutBtn');
const authState = document.getElementById('authState');
const greetingElem = document.getElementById('greeting'); // optional element for friendly welcome

function firstNameOf(user) {
  const dn = (user.displayName || "").trim();
  if (dn) return dn.split(/\s+/)[0];
  const email = user.email || "";
  return email.includes("@") ? email.split("@")[0] : "KidCoder";
}

function setAuthUI(user){
  if (user) {
    if (loginLink) loginLink.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = '';
    const firstName = firstNameOf(user);
    if (authState) authState.textContent = `Logged in as ${user.email || 'user'}`;
    if (greetingElem) greetingElem.textContent = `Hi, ${firstName}!`;
  } else {
    if (loginLink) loginLink.style.display = '';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (authState) authState.textContent = 'You are logged out.';
    if (greetingElem) greetingElem.textContent = '';
  }
}

onAuthStateChanged(auth, (user) => setAuthUI(user));

if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    logoutBtn.disabled = true;
    try {
      await signOut(auth);
    } catch (e) {
      alert(e.message);
      console.error(e);
    } finally {
      logoutBtn.disabled = false;
    }
  });
}

console.log('KidCoder app loaded');
