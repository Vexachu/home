// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMKV6ytNvVXsW7gzgi0BJ6H1JZgOHm4_Y",
  authDomain: "coding-website-680b3.firebaseapp.com",
  projectId: "coding-website-680b3",
  storageBucket: "coding-website-680b3.firebasestorage.app",
  messagingSenderId: "511596267555",
  appId: "1:511596267555:web:f39160d2455a2379658996",
  measurementId: "G-YBBJ31HQSR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
