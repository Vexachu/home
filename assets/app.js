import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginLink = document.getElementById('loginLink');
const logoutBtn = document.getElementById('logoutBtn');
const authState = document.getElementById('authState');

function setAuthUI(user){
  if (user) {
    if (loginLink) loginLink.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = '';
    if (authState) authState.textContent = `Logged in as ${user.email || 'user'}`;
  } else {
    if (loginLink) loginLink.style.display = '';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (authState) authState.textContent = 'You are logged out.';
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
