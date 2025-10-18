<!-- assets/app.js (module) -->
<script type="module">
  import { firebaseConfig } from "./assets/firebase-config.js";
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import {
    getAuth, onAuthStateChanged, signOut
  } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

  // Init Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // Don’t inject greeting on the Contact page
  const isContact = /(^|\/)contact\.html$/i.test(location.pathname);

  // Ensure a #greeting span exists inside .brand (except on Contact)
  function ensureGreetingEl() {
    if (isContact) return null;
    let el = document.getElementById("greeting");
    if (!el) {
      const brand = document.querySelector(".brand");
      if (brand) {
        el = document.createElement("span");
        el.id = "greeting";
        el.textContent = "Hi!";
        brand.appendChild(el);
      }
    }
    return el;
  }

  // Login / Logout controls (if present on current page)
  const loginLink = document.getElementById("loginLink");
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try { await signOut(auth); } finally {
        // After sign out, come back to home
        location.href = "index.html";
      }
    });
  }

  // Optional helpers on index
  const authStateEl = document.getElementById("authState");
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Update UI on auth change
  onAuthStateChanged(auth, (user) => {
    const greetingEl = ensureGreetingEl();

    // Figure out a friendly first name
    let first = "there";
    if (user?.displayName) first = user.displayName.split(" ")[0];
    else if (user?.email) first = user.email.split("@")[0];

    if (greetingEl) greetingEl.textContent = `Hi ${first}!`;

    // Toggle login/logout if those elements exist on the page
    if (loginLink)  loginLink.style.display  = user ? "none"  : "";
    if (logoutBtn)  logoutBtn.style.display  = user ? ""      : "none";

    // Index-only status (if present)
    if (authStateEl) {
      authStateEl.textContent = user ? `Signed in as ${first}` : "Signed out";
    }
  });
</script>
