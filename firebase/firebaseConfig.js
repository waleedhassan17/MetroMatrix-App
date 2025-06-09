// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // <-- import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAlvtn_26fjNCo4wnZnpEVENy15l0dmKsk",
  authDomain: "metromatrix-b4a6b.firebaseapp.com",
  projectId: "metromatrix-b4a6b",
  storageBucket: "metromatrix-b4a6b.firebasestorage.app",
  messagingSenderId: "585235834485",
  appId: "1:585235834485:web:0a9c2b1508fcba232bba3c",
  measurementId: "G-Z9LZQR05ZL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);  // <-- initialize Firestore

export { auth, db };
