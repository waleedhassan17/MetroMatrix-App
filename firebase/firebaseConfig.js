// firebase/firebaseConfig.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAlvtn_26fjNCo4wnZnpEVENy15l0dmKsk",
  authDomain: "metromatrix-b4a6b.firebaseapp.com",
  projectId: "metromatrix-b4a6b",
  storageBucket: "metromatrix-b4a6b.appspot.com",
  messagingSenderId: "585235834485",
  appId: "1:585235834485:web:0a9c2b1508fcba232bba3c",
  measurementId: "G-Z9LZQR05ZL"
};

// Initialize Firebase only once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

export { firebase, auth, db };
