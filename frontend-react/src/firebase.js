import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8Qay7c2OnUcxvve6dO9O6j08n4XZDVaU",
  authDomain: "lootbox-site-88fd4.firebaseapp.com",
  projectId: "lootbox-site-88fd4",
  storageBucket: "lootbox-site-88fd4.firebasestorage.app",
  messagingSenderId: "16266298284",
  appId: "1:16266298284:web:0f3a17131f66f42f1cf009",
  measurementId: "G-5Q1D107Z4T"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);