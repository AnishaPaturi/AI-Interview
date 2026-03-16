import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1HeN-n-65oF6qp5EgLkZWwMsSt797sMA",
  authDomain: "ai-interview-de47d.firebaseapp.com",
  projectId: "ai-interview-de47d",
  storageBucket: "ai-interview-de47d.firebasestorage.app",
  messagingSenderId: "981990173965",
  appId: "1:981990173965:web:784af262277082fbafd444",
  measurementId: "G-ZQ7JCMCE4C"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);