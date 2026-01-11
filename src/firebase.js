import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBbp7nGo070rwHatQhCgZx-29eGzb0WfMg",
  authDomain: "flavour-fusion-df68d.firebaseapp.com",
  projectId: "flavour-fusion-df68d",
  storageBucket: "flavour-fusion-df68d.firebasestorage.app",
  messagingSenderId: "3425427726",
  appId: "1:3425427726:web:68b73d5962edca031c375f",
  measurementId: "G-1F8X3W32PC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
