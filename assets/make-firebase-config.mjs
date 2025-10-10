// scripts/make-firebase-config.mjs
import { writeFileSync, mkdirSync } from "node:fs";

mkdirSync("assets", { recursive: true });

const cfg = `export const firebaseConfig = {
  apiKey: "${process.env.FIREBASE_API_KEY}",
  authDomain: "${process.env.FIREBASE_AUTH_DOMAIN}",
  projectId: "${process.env.FIREBASE_PROJECT_ID}",
  storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET}",
  messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID}",
  appId: "${process.env.FIREBASE_APP_ID}",
  measurementId: "${process.env.FIREBASE_MEASUREMENT_ID}"
};
`;

writeFileSync("assets/firebase-config.js", cfg);
console.log("✓ Wrote assets/firebase-config.js");
