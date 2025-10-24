import fs from 'node:fs';
import path from 'node:path';

const required = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID'
];

const missing = required.filter(k => !process.env[k]);
if (missing.length) {
  console.warn('[make-firebase-config] Missing env vars:', missing.join(', '));
  console.warn('A placeholder firebase-config.js will still be created.');
}

const cfg = {
  apiKey: process.env.FIREBASE_API_KEY || "REPLACE_ME",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "REPLACE_ME",
  projectId: process.env.FIREBASE_PROJECT_ID || "REPLACE_ME",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "REPLACE_ME",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "REPLACE_ME",
  appId: process.env.FIREBASE_APP_ID || "REPLACE_ME",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || undefined
};

const out = `export const firebaseConfig = ${JSON.stringify(cfg, null, 2)};\n`;
const outPath = path.join('assets', 'firebase-config.js');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out, 'utf8');
console.log('[make-firebase-config] Wrote', outPath);
